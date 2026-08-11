import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TbUpload, TbX, TbLoader2, TbPhoto, TbVideo,
  TbDeviceFloppy, TbArrowLeft, TbPlus, TbTrash,
} from 'react-icons/tb';
import toast from 'react-hot-toast';
import {
  createProject,
  updateProject,
  fetchAllProjectsAdmin,
  deleteProjectImage,
} from '../../api/services';
import { fadeUp, stagger } from '../../utils/motion';

const CATEGORIES = [
  'fullstack', 'frontend', 'backend',
  'ecommerce', 'management', 'mobile', 'other',
];
const STATUSES = ['published', 'draft', 'archived'];

const INITIAL = {
  title: '',
  tagline: '',
  category: 'fullstack',
  status: 'published',
  description: '',
  shortDescription: '',
  features: [],
  tech: [],
  challenges: '',
  outcome: '',
  liveUrl: '',
  githubUrl: '',
  featured: false,
  live: false,
  year: new Date().getFullYear().toString(),
  accentFrom: '#6c63ff',
  accentTo: '#ff6584',
  sortOrder: 0,
};

export default function AdminProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [values, setValues] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [errors, setErrors] = useState({});

  /* Media state */
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [demoVideo, setDemoVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');

  /* Existing media (for edit mode) */
  const [existingImages, setExistingImages] = useState([]);
  const [deletingImage, setDeletingImage] = useState({});

  /* Input refs */
  const thumbRef = useRef(null);
  const imagesRef = useRef(null);
  const videoRef = useRef(null);

  /* Tech and features as strings for input */
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  /* Fetch project for edit */
  useEffect(() => {
    if (!isEdit) return;
    fetchAllProjectsAdmin({ limit: 100 })
      .then((res) => {
        const project = (res.data || []).find((p) => p._id === id);
        if (project) {
          setValues({
            title: project.title || '',
            tagline: project.tagline || '',
            category: project.category || 'fullstack',
            status: project.status || 'published',
            description: project.description || '',
            shortDescription: project.shortDescription || '',
            features: project.features || [],
            tech: project.tech || [],
            challenges: project.challenges || '',
            outcome: project.outcome || '',
            liveUrl: project.liveUrl || '',
            githubUrl: project.githubUrl || '',
            featured: project.featured || false,
            live: project.live || false,
            year: project.year || new Date().getFullYear().toString(),
            accentFrom: project.accentFrom || '#6c63ff',
            accentTo: project.accentTo || '#ff6584',
            sortOrder: project.sortOrder || 0,
          });
          if (project.thumbnail?.url) setThumbnailPreview(project.thumbnail.url);
          if (project.demoVideo?.url) setVideoPreview(project.demoVideo.url);
          setExistingImages(project.images || []);
        }
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setFetching(false));
  }, [id, isEdit]);

  const set = (key, val) => {
    setValues((v) => ({ ...v, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  /* Add tech tag */
  const addTech = () => {
    const tag = techInput.trim();
    if (!tag || values.tech.includes(tag)) return;
    set('tech', [...values.tech, tag]);
    setTechInput('');
  };
  const removeTech = (tag) =>
    set('tech', values.tech.filter((t) => t !== tag));

  /* Add feature */
  const addFeature = () => {
    const f = featureInput.trim();
    if (!f) return;
    set('features', [...values.features, f]);
    setFeatureInput('');
  };
  const removeFeature = (i) =>
    set('features', values.features.filter((_, idx) => idx !== i));

  /* Thumbnail change */
  const onThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  /* Images change */
  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  /* Remove new image preview */
  const removeNewImage = (i) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
    setImagePreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  /* Delete existing image */
  const handleDeleteExistingImage = async (imageId) => {
    setDeletingImage((prev) => ({ ...prev, [imageId]: true }));
    try {
      await deleteProjectImage(id, imageId);
      setExistingImages((prev) => prev.filter((img) => img._id !== imageId));
      toast.success('Image removed.');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeletingImage((prev) => ({ ...prev, [imageId]: false }));
    }
  };

  /* Video change */
  const onVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setDemoVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

const validate = () => {
  const e = {};
  
  if (!values.title || !values.title.trim()) {
    e.title = 'Title is required.';
  }
  
  if (!values.description || values.description.trim().length < 20) {
    e.description = 'Description must be at least 20 characters.';
  }
  
  if (!values.category) {
    e.category = 'Category is required.';
  }
  
  if (!values.tech || values.tech.length === 0) {
    e.tech = 'Add at least one technology.';
  }
  
  return e;
};

 const onSubmit = async (e) => {
  e.preventDefault();
  const errs = validate();
  
  if (Object.keys(errs).length) {
    setErrors(errs);
    
    /* Show specific error messages */
    const firstError = Object.values(errs)[0];
    toast.error(firstError || 'Please fix the errors below.');
    
    /* Scroll to first error */
    const firstErrorField = Object.keys(errs)[0];
    const el = document.querySelector(
      `[name="${firstErrorField}"], #${firstErrorField}`
    );
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
    }
    return;
  }

    setLoading(true);
    const toastId = toast.loading(isEdit ? 'Updating project...' : 'Creating project...');

    try {
      const formData = new FormData();

      /* Text fields */
      Object.entries(values).forEach(([key, val]) => {
        if (key === 'tech' || key === 'features') {
          formData.append(key, JSON.stringify(val));
        } else {
          formData.append(key, String(val));
        }
      });

      /* Media */
      if (thumbnail) formData.append('thumbnail', thumbnail);
      images.forEach((file) => formData.append('images', file));
      if (demoVideo) formData.append('demoVideo', demoVideo);

      if (isEdit) {
        await updateProject(id, formData);
        toast.success('Project updated!', { id: toastId });
      } else {
        await createProject(formData);
        toast.success('Project created!', { id: toastId });
      }

      navigate('/admin/projects');
    } catch (err) {
      toast.error(err.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center py-16">
        <TbLoader2 size={28} className="animate-spin" style={{ color: 'var(--primary)' }} />
      </div>
    );
  }

  return (
    <motion.div
      variants={stagger(0.06)}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/admin/projects')}
          className="grid size-9 place-items-center rounded-lg border"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          <TbArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text)' }}>
            {isEdit ? 'Edit Project' : 'Add New Project'}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {isEdit ? 'Update project details and media' : 'Create a new portfolio project'}
          </p>
        </div>
      </motion.div>

      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">

          {/* ── Left Column ── */}
          <div className="space-y-6">

            {/* Basic Info */}
            <motion.div variants={fadeUp} className="card p-6">
              <h2
                className="text-base font-bold mb-4"
                style={{ color: 'var(--text)' }}
              >
                Basic Information
              </h2>
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="field-label">
                    Project Title <span style={{ color: 'var(--secondary)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={values.title}
                    onChange={(e) => set('title', e.target.value)}
                    placeholder="e.g. RB Jewellers E-Commerce Platform"
                    maxLength={120}
                    className={`field ${errors.title ? 'field-error' : ''}`}
                  />
                  {errors.title && (
                    <p className="error-text">{errors.title}</p>
                  )}
                </div>

                {/* Tagline */}
                <div>
                  <label className="field-label">Tagline</label>
                  <input
                    type="text"
                    value={values.tagline}
                    onChange={(e) => set('tagline', e.target.value)}
                    placeholder="Short one-liner about the project"
                    maxLength={200}
                    className="field"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="field-label">
                    Description <span style={{ color: 'var(--secondary)' }}>*</span>
                  </label>
                  <textarea
                    value={values.description}
                    onChange={(e) => set('description', e.target.value)}
                    placeholder="Detailed description of the project, what it does, who it's for..."
                    rows={6}
                    maxLength={5000}
                    className={`field ${errors.description ? 'field-error' : ''}`}
                  />
                  <div className="flex justify-between mt-1">
                    {errors.description ? (
                      <p className="error-text">{errors.description}</p>
                    ) : <span />}
                    <span
                      className="text-[0.6875rem] tabular-nums"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {values.description.length}/5000
                    </span>
                  </div>
                </div>

                {/* Challenges */}
                <div>
                  <label className="field-label">
                    Challenges & Solutions
                    <span
                      className="ml-1.5 text-[0.6875rem] font-normal"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      (optional)
                    </span>
                  </label>
                  <textarea
                    value={values.challenges}
                    onChange={(e) => set('challenges', e.target.value)}
                    placeholder="What technical challenges did you face and how did you solve them?"
                    rows={4}
                    className="field"
                  />
                </div>

                {/* Outcome */}
                <div>
                  <label className="field-label">
                    Outcome & Results
                    <span
                      className="ml-1.5 text-[0.6875rem] font-normal"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      (optional)
                    </span>
                  </label>
                  <textarea
                    value={values.outcome}
                    onChange={(e) => set('outcome', e.target.value)}
                    placeholder="What was the result? Metrics, user feedback, business impact?"
                    rows={3}
                    className="field"
                  />
                </div>
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div variants={fadeUp} className="card p-6">
              <h2 className="text-base font-bold mb-4" style={{ color: 'var(--text)' }}>
                Tech Stack <span style={{ color: 'var(--secondary)' }}>*</span>
              </h2>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') { e.preventDefault(); addTech(); }
                  }}
                  placeholder="e.g. React.js"
                  className="field flex-1"
                />
                <button
                  type="button"
                  onClick={addTech}
                  className="btn btn-ghost !px-4"
                >
                  <TbPlus size={16} />
                </button>
              </div>
              {errors.tech && <p className="error-text mb-2">{errors.tech}</p>}
              <div className="flex flex-wrap gap-2">
                {values.tech.map((tag) => (
                  <span
                    key={tag}
                    className="chip flex items-center gap-1.5"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTech(tag)}
                      className="rounded-full hover:text-red-400 transition-colors"
                    >
                      <TbX size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div variants={fadeUp} className="card p-6">
              <h2 className="text-base font-bold mb-4" style={{ color: 'var(--text)' }}>
                Key Features
              </h2>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') { e.preventDefault(); addFeature(); }
                  }}
                  placeholder="e.g. JWT Authentication"
                  className="field flex-1"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="btn btn-ghost !px-4"
                >
                  <TbPlus size={16} />
                </button>
              </div>
              <ul className="space-y-2">
                {values.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 rounded-lg px-3 py-2"
                    style={{ background: 'var(--surface-2)' }}
                  >
                    <span
                      className="size-1.5 rounded-full shrink-0"
                      style={{ background: 'var(--primary)' }}
                    />
                    <span
                      className="flex-1 text-sm"
                      style={{ color: 'var(--text)' }}
                    >
                      {f}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      style={{ color: '#ef4444' }}
                    >
                      <TbX size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Media Upload */}
            <motion.div variants={fadeUp} className="card p-6">
              <h2 className="text-base font-bold mb-4" style={{ color: 'var(--text)' }}>
                Media
              </h2>

              {/* Thumbnail */}
              <div className="mb-6">
                <label className="field-label">Thumbnail Image</label>
                <div
                  className="relative overflow-hidden rounded-xl border-2 border-dashed p-4 text-center cursor-pointer transition-colors"
                  style={{ borderColor: 'var(--border)' }}
                  onClick={() => thumbRef.current?.click()}
                >
                  {thumbnailPreview ? (
                    <div className="relative">
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        className="mx-auto max-h-48 rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setThumbnail(null);
                          setThumbnailPreview('');
                        }}
                        className="absolute right-2 top-2 grid size-7 place-items-center rounded-full"
                        style={{ background: 'rgba(239,68,68,0.9)', color: 'white' }}
                      >
                        <TbX size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="py-6">
                      <TbPhoto
                        size={32}
                        className="mx-auto mb-2"
                        style={{ color: 'var(--text-muted)' }}
                      />
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        Click to upload thumbnail
                      </p>
                      <p
                        className="text-xs mt-1"
                        style={{ color: 'var(--text-muted)', opacity: 0.6 }}
                      >
                        JPG, PNG, WebP • Max 10MB
                      </p>
                    </div>
                  )}
                  <input
                    ref={thumbRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onThumbnailChange}
                  />
                </div>
              </div>

              {/* Multiple Images */}
              <div className="mb-6">
                <label className="field-label">
                  Screenshots / Gallery
                  <span
                    className="ml-1.5 text-[0.6875rem] font-normal"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    (max 10)
                  </span>
                </label>

                {/* Existing images (edit mode) */}
                {existingImages.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                      Existing images:
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {existingImages.map((img) => (
                        <div key={img._id} className="relative group">
                          <img
                            src={img.url}
                            alt="Existing"
                            className="h-20 w-full rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteExistingImage(img._id)}
                            disabled={deletingImage[img._id]}
                            className="absolute inset-0 hidden group-hover:flex items-center justify-center rounded-lg"
                            style={{ background: 'rgba(239,68,68,0.8)' }}
                          >
                            {deletingImage[img._id] ? (
                              <TbLoader2 size={16} className="animate-spin text-white" />
                            ) : (
                              <TbTrash size={16} color="white" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New image previews */}
                {imagePreviews.length > 0 && (
                  <div className="mb-3 grid grid-cols-3 gap-2">
                    {imagePreviews.map((src, i) => (
                      <div key={i} className="relative">
                        <img
                          src={src}
                          alt={`Preview ${i + 1}`}
                          className="h-20 w-full rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(i)}
                          className="absolute right-1 top-1 grid size-5 place-items-center rounded-full"
                          style={{ background: 'rgba(239,68,68,0.9)', color: 'white' }}
                        >
                          <TbX size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => imagesRef.current?.click()}
                  className="btn btn-ghost w-full"
                >
                  <TbUpload size={16} />
                  Add Images
                </button>
                <input
                  ref={imagesRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={onImagesChange}
                />
              </div>

              {/* Demo Video */}
              <div>
                <label className="field-label">Demo Video</label>
                <div
                  className="relative overflow-hidden rounded-xl border-2 border-dashed p-4 text-center cursor-pointer"
                  style={{ borderColor: 'var(--border)' }}
                  onClick={() => videoRef.current?.click()}
                >
                  {videoPreview ? (
                    <div className="relative">
                      <video
                        src={videoPreview}
                        className="mx-auto max-h-40 rounded-lg"
                        controls
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDemoVideo(null);
                          setVideoPreview('');
                        }}
                        className="absolute right-2 top-2 grid size-7 place-items-center rounded-full"
                        style={{ background: 'rgba(239,68,68,0.9)', color: 'white' }}
                      >
                        <TbX size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="py-6">
                      <TbVideo
                        size={32}
                        className="mx-auto mb-2"
                        style={{ color: 'var(--text-muted)' }}
                      />
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        Click to upload demo video
                      </p>
                      <p
                        className="text-xs mt-1"
                        style={{ color: 'var(--text-muted)', opacity: 0.6 }}
                      >
                        MP4, WebM, MOV • Max 100MB
                      </p>
                    </div>
                  )}
                  <input
                    ref={videoRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={onVideoChange}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right Column ── */}
          <div className="space-y-6">

            {/* Settings */}
            <motion.div variants={fadeUp} className="card p-6">
              <h2 className="text-base font-bold mb-4" style={{ color: 'var(--text)' }}>
                Settings
              </h2>
              <div className="space-y-4">
                {/* Category */}
                <div>
                  <label className="field-label">
                    Category <span style={{ color: 'var(--secondary)' }}>*</span>
                  </label>
                  <select
                    value={values.category}
                    onChange={(e) => set('category', e.target.value)}
                    className="field"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="field-label">Status</label>
                  <select
                    value={values.status}
                    onChange={(e) => set('status', e.target.value)}
                    className="field"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year */}
                <div>
                  <label className="field-label">Year</label>
                  <input
                    type="text"
                    value={values.year}
                    onChange={(e) => set('year', e.target.value)}
                    placeholder="2025"
                    maxLength={4}
                    className="field"
                  />
                </div>

                {/* Sort Order */}
                <div>
                  <label className="field-label">Sort Order</label>
                  <input
                    type="number"
                    value={values.sortOrder}
                    onChange={(e) => set('sortOrder', Number(e.target.value))}
                    placeholder="0"
                    className="field"
                  />
                  <p
                    className="text-xs mt-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Lower number = higher priority
                  </p>
                </div>

                {/* Featured toggle */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    className="relative"
                    onClick={() => set('featured', !values.featured)}
                  >
                    <div
                      className="w-11 h-6 rounded-full transition-colors"
                      style={{
                        background: values.featured
                          ? 'var(--primary)'
                          : 'var(--border)',
                      }}
                    />
                    <div
                      className="absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform"
                      style={{
                        transform: values.featured
                          ? 'translateX(20px)'
                          : 'translateX(0)',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                      }}
                    />
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--text)' }}
                  >
                    Featured Project
                  </span>
                </label>

                {/* Live toggle */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    className="relative"
                    onClick={() => set('live', !values.live)}
                  >
                    <div
                      className="w-11 h-6 rounded-full transition-colors"
                      style={{
                        background: values.live ? 'var(--accent)' : 'var(--border)',
                      }}
                    />
                    <div
                      className="absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform"
                      style={{
                        transform: values.live ? 'translateX(20px)' : 'translateX(0)',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                      }}
                    />
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--text)' }}
                  >
                    Currently Live
                  </span>
                </label>
              </div>
            </motion.div>

            {/* Links */}
            <motion.div variants={fadeUp} className="card p-6">
              <h2 className="text-base font-bold mb-4" style={{ color: 'var(--text)' }}>
                Links
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="field-label">Live URL</label>
                  <input
                    type="url"
                    value={values.liveUrl}
                    onChange={(e) => set('liveUrl', e.target.value)}
                    placeholder="https://example.com"
                    className="field"
                  />
                </div>
                <div>
                  <label className="field-label">GitHub URL</label>
                  <input
                    type="url"
                    value={values.githubUrl}
                    onChange={(e) => set('githubUrl', e.target.value)}
                    placeholder="https://github.com/..."
                    className="field"
                  />
                </div>
              </div>
            </motion.div>

            {/* Accent Colors */}
            <motion.div variants={fadeUp} className="card p-6">
              <h2 className="text-base font-bold mb-4" style={{ color: 'var(--text)' }}>
                Accent Colors
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="field-label">From</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={values.accentFrom}
                      onChange={(e) => set('accentFrom', e.target.value)}
                      className="size-10 rounded-lg cursor-pointer border"
                      style={{ borderColor: 'var(--border)', padding: '2px' }}
                    />
                    <input
                      type="text"
                      value={values.accentFrom}
                      onChange={(e) => set('accentFrom', e.target.value)}
                      className="field flex-1 !text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="field-label">To</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={values.accentTo}
                      onChange={(e) => set('accentTo', e.target.value)}
                      className="size-10 rounded-lg cursor-pointer border"
                      style={{ borderColor: 'var(--border)', padding: '2px' }}
                    />
                    <input
                      type="text"
                      value={values.accentTo}
                      onChange={(e) => set('accentTo', e.target.value)}
                      className="field flex-1 !text-xs"
                    />
                  </div>
                </div>
              </div>
              {/* Preview */}
              <div
                className="mt-3 h-8 rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${values.accentFrom}, ${values.accentTo})`,
                  boxShadow: `0 0 15px ${values.accentFrom}60`,
                }}
              />
            </motion.div>

            {/* Submit */}
            <motion.div variants={fadeUp}>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full !py-4 text-base"
              >
                {loading ? (
                  <>
                    <TbLoader2 size={20} className="animate-spin" />
                    {isEdit ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <TbDeviceFloppy size={20} />
                    {isEdit ? 'Update Project' : 'Create Project'}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/projects')}
                className="btn btn-ghost w-full mt-2"
                disabled={loading}
              >
                Cancel
              </button>
            </motion.div>
          </div>
        </div>
      </form>
    </motion.div>
  );
}