/**
 * Script tạo toàn bộ Strapi Content Type schemas
 * Chạy: node create-schemas.mjs
 */
import fs from 'fs';
import path from 'path';

const srcApi = './src/api';

const boilerplate = (uid) => ({
  controller: `import {factories} from '@strapi/strapi';\nexport default factories.createCoreController('${uid}');\n`,
  route: `import {factories} from '@strapi/strapi';\nexport default factories.createCoreRouter('${uid}');\n`,
  service: `import {factories} from '@strapi/strapi';\nexport default factories.createCoreService('${uid}');\n`,
});

function createApi(name, schema) {
  const uid = `api::${name}.${name}`;
  const dir = path.join(srcApi, name);
  const bp = boilerplate(uid);

  fs.mkdirSync(path.join(dir, 'content-types', name), {recursive: true});
  fs.mkdirSync(path.join(dir, 'controllers'), {recursive: true});
  fs.mkdirSync(path.join(dir, 'routes'), {recursive: true});
  fs.mkdirSync(path.join(dir, 'services'), {recursive: true});

  fs.writeFileSync(path.join(dir, 'content-types', name, 'schema.json'), JSON.stringify(schema, null, 2));
  fs.writeFileSync(path.join(dir, 'controllers', `${name}.ts`), bp.controller);
  fs.writeFileSync(path.join(dir, 'routes', `${name}.ts`), bp.route);
  fs.writeFileSync(path.join(dir, 'services', `${name}.ts`), bp.service);

  console.log(`✅ Created: api::${name}`);
}

// ─── Schemas ──────────────────────────────────────────────────────────────────

const schemas = {
  project: {
    kind: 'collectionType',
    collectionName: 'projects',
    info: {singularName: 'project', pluralName: 'projects', displayName: 'Project', description: 'Construction & F&B fit-out projects'},
    options: {draftAndPublish: true},
    pluginOptions: {},
    attributes: {
      title: {type: 'string', required: true},
      slug: {type: 'uid', targetField: 'title', required: true},
      description: {type: 'text'},
      meta: {type: 'string'},
      category: {type: 'string'},
      location: {type: 'string'},
      year: {type: 'string'},
      area: {type: 'string'},
      challenge: {type: 'text'},
      solution: {type: 'text'},
      outcome: {type: 'text'},
      cover: {type: 'media', multiple: false, allowedTypes: ['images']},
      gallery: {type: 'media', multiple: true, allowedTypes: ['images']},
      services: {type: 'relation', relation: 'manyToMany', target: 'api::service.service', inversedBy: 'projects'},
    },
  },

  service: {
    kind: 'collectionType',
    collectionName: 'services',
    info: {singularName: 'service', pluralName: 'services', displayName: 'Service', description: 'Services offered'},
    options: {draftAndPublish: true},
    pluginOptions: {},
    attributes: {
      title: {type: 'string', required: true},
      slug: {type: 'uid', targetField: 'title', required: true},
      description: {type: 'text'},
      meta: {type: 'string'},
      index: {type: 'string'},
      deliverables: {type: 'text'},
      process: {type: 'text'},
      projects: {type: 'relation', relation: 'manyToMany', target: 'api::project.project', mappedBy: 'services'},
    },
  },

  post: {
    kind: 'collectionType',
    collectionName: 'posts',
    info: {singularName: 'post', pluralName: 'posts', displayName: 'Post', description: 'Journal / Blog posts'},
    options: {draftAndPublish: true},
    pluginOptions: {},
    attributes: {
      title: {type: 'string', required: true},
      slug: {type: 'uid', targetField: 'title', required: true},
      description: {type: 'text'},
      meta: {type: 'string'},
      intro: {type: 'text'},
      content: {type: 'richtext'},
      cover: {type: 'media', multiple: false, allowedTypes: ['images']},
      category: {type: 'relation', relation: 'manyToOne', target: 'api::post-category.post-category', inversedBy: 'posts'},
    },
  },

  'post-category': {
    kind: 'collectionType',
    collectionName: 'post_categories',
    info: {singularName: 'post-category', pluralName: 'post-categories', displayName: 'Post Category'},
    options: {draftAndPublish: false},
    pluginOptions: {},
    attributes: {
      name: {type: 'string', required: true},
      slug: {type: 'uid', targetField: 'name', required: true},
      posts: {type: 'relation', relation: 'oneToMany', target: 'api::post.post', mappedBy: 'category'},
    },
  },

  department: {
    kind: 'collectionType',
    collectionName: 'departments',
    info: {singularName: 'department', pluralName: 'departments', displayName: 'Department'},
    options: {draftAndPublish: false},
    pluginOptions: {},
    attributes: {
      name: {type: 'string', required: true},
      slug: {type: 'uid', targetField: 'name', required: true},
      jobs: {type: 'relation', relation: 'oneToMany', target: 'api::job.job', mappedBy: 'department'},
    },
  },

  job: {
    kind: 'collectionType',
    collectionName: 'jobs',
    info: {singularName: 'job', pluralName: 'jobs', displayName: 'Job', description: 'Job openings / Careers'},
    options: {draftAndPublish: true},
    pluginOptions: {},
    attributes: {
      title: {type: 'string', required: true},
      slug: {type: 'uid', targetField: 'title', required: true},
      description: {type: 'text'},
      meta: {type: 'string'},
      location: {type: 'string'},
      jobType: {type: 'enumeration', enum: ['full-time', 'part-time', 'contract', 'internship'], default: 'full-time'},
      responsibilities: {type: 'text'},
      requirements: {type: 'text'},
      benefits: {type: 'text'},
      department: {type: 'relation', relation: 'manyToOne', target: 'api::department.department', inversedBy: 'jobs'},
    },
  },

  'hero-slide': {
    kind: 'collectionType',
    collectionName: 'hero_slides',
    info: {singularName: 'hero-slide', pluralName: 'hero-slides', displayName: 'Hero Slide', description: 'Slides for the homepage hero section'},
    options: {draftAndPublish: true},
    pluginOptions: {},
    attributes: {
      title: {type: 'string', required: true},
      eyebrow: {type: 'string'},
      description: {type: 'text'},
      imageLabel: {type: 'string'},
      order: {type: 'integer', default: 0},
      stats: {type: 'json', description: 'JSON array of stats: e.g. [{"value": "12+", "label": "Thương hiệu"}]'},
      cover: {type: 'media', multiple: false, allowedTypes: ['images']},
    },
  },

  homepage: {
    kind: 'singleType',
    collectionName: 'homepage',
    info: {singularName: 'homepage', pluralName: 'homepages', displayName: 'Homepage', description: 'Homepage content configuration'},
    options: {draftAndPublish: true},
    pluginOptions: {},
    attributes: {
      brandSectionTitle: {type: 'string'},
      brandSectionLead: {type: 'text'},
      socialTitle: {type: 'string'},
      socialLead: {type: 'text'},
      socialStories: {type: 'json', description: 'JSON array: [{"title": "...", "description": "..."}]'},
      careersTitle: {type: 'string'},
      careersLead: {type: 'text'},
      careersBlock: {type: 'json', description: 'JSON object: {"title": "...", "description": "...", "highlights": ["..."]}'},
      newsTitle: {type: 'string'},
      newsLead: {type: 'text'},
      ctaLabel: {type: 'string'},
      ctaTitle: {type: 'string'},
      ctaDescription: {type: 'text'},
      ctaPrimary: {type: 'string'},
      ctaSecondary: {type: 'string'},
    },
  },
};

for (const [name, schema] of Object.entries(schemas)) {
  createApi(name, schema);
}

console.log('\n🚀 All schemas created! Restart Strapi with: npm run develop');
