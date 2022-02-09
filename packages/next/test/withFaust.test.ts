import {
  createRedirects,
  withFaust,
  previewSourceRedirectRegex,
  DEFAULT_PREVIEW_DESTINATION,
} from '../src/config/withFaust';

describe('withFaust', () => {
  test('withFaust merges default config with user specified config', async () => {
    const config = withFaust({ eslint: { ignoreDuringBuilds: true } });
    const expectedRedirects = await createRedirects();

    expect(config.eslint).toEqual({ ignoreDuringBuilds: true });
    expect((config as any).redirects()).resolves.toEqual(expectedRedirects);
  });

  test('user specified redirects merges with withFaust redirects', async () => {
    const config = withFaust({
      async redirects() {
        return [
          {
            source: '/about',
            destination: '/',
            permanent: true,
          },
        ];
      },
    });

    const configRedirects = await (config as any).redirects();

    const expectedRedirects = [
      {
        source: '/((?!preview$).*)',
        has: [
          {
            type: 'query',
            key: 'preview',
            value: 'true',
          },
        ],
        destination: '/preview',
        permanent: false,
      },
      { source: '/about', destination: '/', permanent: true },
    ];

    expect(configRedirects).toStrictEqual(expectedRedirects);
  });

  test('user can specify previewDestination', async () => {
    const config = withFaust(
      {
        async redirects() {
          return [
            {
              source: '/about',
              destination: '/',
              permanent: true,
            },
          ];
        },
      },
      { previewDestination: '/preview-new' },
    );

    const configRedirects = await (config as any).redirects();

    const expectedRedirects = [
      {
        source: '/((?!preview-new$).*)',
        has: [
          {
            type: 'query',
            key: 'preview',
            value: 'true',
          },
        ],
        destination: '/preview-new',
        permanent: false,
      },
      { source: '/about', destination: '/', permanent: true },
    ];

    expect(configRedirects).toStrictEqual(expectedRedirects);
  });

  test('preview redirect regex', async () => {
    const defaultPreviewRegex = new RegExp(
      previewSourceRedirectRegex(DEFAULT_PREVIEW_DESTINATION),
    );

    expect(defaultPreviewRegex.test('/about')).toBe(true);

    expect(defaultPreviewRegex.test('/sample-page')).toBe(true);

    // WordPress post preview URL that we redirect to the preview page
    expect(
      defaultPreviewRegex.test(
        '/hello-world/?preview=true&p=322&typeName=Post',
      ),
    ).toBe(true);

    // Preview page URL that has already been redirected
    expect(
      defaultPreviewRegex.test('/preview?preview=true&p=322&typeName=Post'),
    ).toBe(false);

    // Preview page URL that has already been redirected with trailing slash
    expect(
      defaultPreviewRegex.test('/preview/?preview=true&p=322&typeName=Post'),
    ).toBe(false);

    expect(
      defaultPreviewRegex.test('/posts/how-to-preview-posts-in-wordpress'),
    ).toBe(true);

    expect(defaultPreviewRegex.test('/my-preview')).toBe(true);
  });
});
