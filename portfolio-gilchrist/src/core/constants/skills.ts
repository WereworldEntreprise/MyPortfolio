// ============================================================
// FICHIER : src/core/constants/skills.ts
// RÔLE    : Couche MODEL — Données des compétences de Gilchrist.
//           Plus de barres/pourcentages : logo officiel + lien doc.
//           Logos via cdn.simpleicons.org.
// ============================================================

import type { SkillGroup } from '../types/Skill'

/**
 * Liste exhaustive des compétences, regroupées par sous-catégorie.
 * Chaque sous-catégorie est rattachée à une super-catégorie.
 */
export const SKILLS: readonly SkillGroup[] = [
  // ========================================================
  // SUPER-CATÉGORIE 1 : LANGAGES
  // ========================================================

  // Sous-section WEB
  {
    id: 'web',
    superCategory: 'languages',
    skills: [
      {
        name: 'HTML',
        logo: 'https://cdn.simpleicons.org/html5',
        docUrl: 'https://developer.mozilla.org/fr/docs/Web/HTML',
        category: 'web',
      },
      {
        name: 'CSS',
        logo: 'https://cdn.simpleicons.org/css',
        docUrl: 'https://developer.mozilla.org/fr/docs/Web/CSS',
        category: 'web',
      },
      {
        name: 'TypeScript',
        logo: 'https://cdn.simpleicons.org/typescript',
        docUrl: 'https://www.typescriptlang.org/docs/',
        category: 'web',
      },
      {
        name: 'JavaScript',
        logo: 'https://cdn.simpleicons.org/javascript',
        docUrl: 'https://developer.mozilla.org/fr/docs/Web/JavaScript',
        category: 'web',
      },
      {
        name: 'PHP',
        logo: 'https://cdn.simpleicons.org/php',
        docUrl: 'https://www.php.net/docs.php',
        category: 'web',
      },
    ],
  },

  // Sous-section DATA/IT
  {
    id: 'data-it',
    superCategory: 'languages',
    skills: [
      {
        name: 'Python',
        logo: 'https://cdn.simpleicons.org/python',
        docUrl: 'https://docs.python.org/fr/3/',
        category: 'data-it',
      },
      {
        name: 'Java',
        logo: 'https://cdn.simpleicons.org/openjdk',
        docUrl: 'https://docs.oracle.com/en/java/',
        category: 'data-it',
      },
      {
        name: 'C',
        logo: 'https://cdn.simpleicons.org/c',
        docUrl: 'https://en.cppreference.com/w/c',
        category: 'data-it',
      },
      {
        name: 'C++',
        logo: 'https://cdn.simpleicons.org/cplusplus',
        docUrl: 'https://en.cppreference.com/w/cpp',
        category: 'data-it',
      },
      {
        name: 'SQL/MySQL',
        logo: 'https://cdn.simpleicons.org/mysql',
        docUrl: 'https://dev.mysql.com/doc/',
        category: 'data-it',
      },
    ],
  },

  // ========================================================
  // SUPER-CATÉGORIE 2 : FRAMEWORKS & OUTILS
  // ========================================================

  // Sous-section FRONTEND
  {
    id: 'framework',
    superCategory: 'frameworks-tools',
    skills: [
      {
        name: 'React',
        logo: 'https://cdn.simpleicons.org/react',
        docUrl: 'https://react.dev',
        category: 'framework',
      },
      {
        name: 'Angular',
        logo: 'https://cdn.simpleicons.org/angular',
        docUrl: 'https://angular.dev/docs',
        category: 'framework',
      },
      {
        name: 'Bootstrap',
        logo: 'https://cdn.simpleicons.org/bootstrap',
        docUrl: 'https://getbootstrap.com/docs/',
        category: 'framework',
      },
      {
        name: 'Laravel',
        logo: 'https://cdn.simpleicons.org/laravel',
        docUrl: 'https://laravel.com/docs',
        category: 'framework',
      },
    ],
  },

  // Sous-section DATA & BI
  {
    id: 'data-bi',
    superCategory: 'frameworks-tools',
    skills: [
      {
        name: 'Power BI',
        logo: 'https://raw.githubusercontent.com/microsoft/PowerBI-Icons/main/SVG/Power-BI.svg',
        docUrl: 'https://learn.microsoft.com/fr-fr/power-bi/',
        category: 'data-bi',
      },
      {
        name: 'Airflow',
        logo: 'https://cdn.simpleicons.org/apacheairflow',
        docUrl: 'https://airflow.apache.org/docs/',
        category: 'data-bi',
      },
      {
        name: 'dbt',
        logo: 'https://avatars.githubusercontent.com/u/59892227?s=200&v=4',
        docUrl: 'https://docs.getdbt.com',
        category: 'data-bi',
      },
    ],
  },

  // Sous-section DEVOPS & OUTILS
  {
    id: 'devops',
    superCategory: 'frameworks-tools',
    skills: [
      {
        name: 'Git',
        logo: 'https://cdn.simpleicons.org/git',
        docUrl: 'https://git-scm.com/doc',
        category: 'devops',
      },
      {
        name: 'GitHub',
        logo: 'https://cdn.simpleicons.org/github',
        docUrl: 'https://docs.github.com',
        category: 'devops',
      },
      {
        name: 'Docker',
        logo: 'https://cdn.simpleicons.org/docker',
        docUrl: 'https://docs.docker.com',
        category: 'devops',
      },
      {
        name: 'Arduino',
        logo: 'https://cdn.simpleicons.org/arduino',
        docUrl: 'https://docs.arduino.cc',
        category: 'devops',
      },
      {
        name: 'MATLAB',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg',
        docUrl: 'https://fr.mathworks.com/help/matlab/',
        category: 'devops',
      },
      {
        name: 'VS Code',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
        docUrl: 'https://code.visualstudio.com/docs',
        category: 'devops',
      },
    ],
  },
] as const
