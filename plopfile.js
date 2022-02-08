module.exports = function (plop) {
  plop.setGenerator('package', {
    description: 'Add a library/component',
    prompts: [
      {
        type: 'list',
        name: 'scope',
        message: 'What type of library are you adding?',
        choices: [
          '@wprdc-components',
          '@wprdc-connections',
          '@wprdc-types',
          '@wprdc-viz',
          '@wprdc-widgets',
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: "What is your component's name?",
        default: 'button',
      },
      {
        type: 'input',
        name: 'briefDescription',
        message: 'Describe it in 1 or 2 sentences:',
      },
      {
        type: 'confirm',
        name: 'alsoMakeTypes',
        default: true,
        message:
          'Make @wprdc-types package along with your package?\n (Pick yes unless in rare case of fixing broken build)?',
      },
    ],
    actions: function (data) {
      data.typesScope = '@wprdc-types';
      let actions = [];

      // Shared by all
      actions = actions.concat([
        {
          type: 'add',
          path: './packages/{{scope}}/{{kebabCase name}}/src/index.ts',
          templateFile: './templates/{{scope}}/src/index.ts.hbs',
          force: true,
        },
        //
        {
          type: 'add',
          path: './packages/{{scope}}/{{kebabCase name}}/.gitignore',
          templateFile: './templates/{{scope}}/.gitignore',
          force: true,
        },
        {
          type: 'add',
          path: './packages/{{scope}}/{{kebabCase name}}/.travis.yml',
          templateFile: './templates/{{scope}}/.travis.yml',
          force: true,
        },
        {
          type: 'add',
          path: './packages/{{scope}}/{{kebabCase name}}/LICENSE',
          templateFile: './templates/{{scope}}/LICENSE',
          force: true,
        },
        {
          type: 'add',
          path: './packages/{{scope}}/{{kebabCase name}}/package.json',
          templateFile: './templates/{{scope}}/package.json.hbs',
          force: true,
        },
        {
          type: 'add',
          path: './packages/{{scope}}/{{kebabCase name}}/README.md',
          templateFile: './templates/{{scope}}/README.md.hbs',
          force: true,
        },
        {
          type: 'add',
          path: './packages/{{scope}}/{{kebabCase name}}/tsconfig.json',
          templateFile: './templates/{{scope}}/tsconfig.json',
          force: true,
        },
        {
          type: 'add',
          path: './packages/{{scope}}/{{kebabCase name}}/tslint.json',
          templateFile: './templates/{{scope}}/tslint.json',
          force: true,
        },
      ]);

      // using postcss and tailwind
      if (
        ['@wprdc-components', '@wprdc-viz', '@wprdc-widgets'].includes(
          data.scope,
        )
      ) {
        actions = actions.concat([
          {
            type: 'add',
            path: './packages/{{scope}}/{{kebabCase name}}/src/{{properCase name}}.tsx',
            templateFile: './templates/{{scope}}/src/Component.tsx.hbs',
            force: true,
          },
          {
            type: 'add',
            path: './packages/{{scope}}/{{kebabCase name}}/src/{{properCase name}}.module.css',
            templateFile: './templates/{{scope}}/src/Component.module.css.hbs',
            force: true,
          },
          {
            type: 'add',
            path: './packages/{{scope}}/{{kebabCase name}}/src/main.css',
            templateFile: './templates/{{scope}}/src/main.css',
            force: true,
          },
          {
            type: 'add',
            path: './packages/{{scope}}/{{kebabCase name}}/src/typings.d.ts',
            templateFile: './templates/{{scope}}/src/typings.d.ts',
            force: true,
          },
          //
          {
            type: 'add',
            path: './packages/{{scope}}/{{kebabCase name}}/postcss.config.js',
            templateFile: './templates/{{scope}}/postcss.config.js',
            force: true,
          },
          {
            type: 'add',
            path: './packages/{{scope}}/{{kebabCase name}}/tailwind.config.js',
            templateFile: './templates/{{scope}}/tailwind.config.js',
            force: true,
          },
          {
            type: 'add',
            path: './packages/{{scope}}/{{kebabCase name}}/tsdx.config.js',
            templateFile: './templates/{{scope}}/tsdx.config.js',
            force: true,
          },
        ]);
      }

      // just for components
      if (data.scope === '@wprdc-components') {
        actions = actions.concat([
          {
            type: 'add',
            path: './stories/{{properCase name}}.stories.tsx',
            templateFile: './templates/{{scope}}/src/Component.stories.tsx.hbs',
            force: true,
          },
        ]);
      }

      // if making types too add thsoe actions
      if (!!data.alsoMakeTypes) {
        actions = actions.concat([
          {
            type: 'add',
            path: './packages/{{typesScope}}/{{kebabCase name}}/src/index.ts',
            templateFile: './templates/{{typesScope}}/src/index.ts.hbs',
            force: true,
          },
          //
          {
            type: 'add',
            path: './packages/{{typesScope}}/{{kebabCase name}}/.gitignore',
            templateFile: './templates/{{typesScope}}/.gitignore',
            force: true,
          },
          {
            type: 'add',
            path: './packages/{{typesScope}}/{{kebabCase name}}/.travis.yml',
            templateFile: './templates/{{typesScope}}/.travis.yml',
            force: true,
          },
          {
            type: 'add',
            path: './packages/{{typesScope}}/{{kebabCase name}}/LICENSE',
            templateFile: './templates/{{typesScope}}/LICENSE',
            force: true,
          },
          {
            type: 'add',
            path: './packages/{{typesScope}}/{{kebabCase name}}/package.json',
            templateFile: './templates/{{typesScope}}/package.json.hbs',
            force: true,
          },
          {
            type: 'add',
            path: './packages/{{typesScope}}/{{kebabCase name}}/README.md',
            templateFile: './templates/{{typesScope}}/README.md.hbs',
            force: true,
          },
          {
            type: 'add',
            path: './packages/{{typesScope}}/{{kebabCase name}}/tsconfig.json',
            templateFile: './templates/{{typesScope}}/tsconfig.json',
            force: true,
          },
          {
            type: 'add',
            path: './packages/{{typesScope}}/{{kebabCase name}}/tslint.json',
            templateFile: './templates/{{typesScope}}/tslint.json',
            force: true,
          },
        ]);
      }

      return actions;
    },
  });
};
