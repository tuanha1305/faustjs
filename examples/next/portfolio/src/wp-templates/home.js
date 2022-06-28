import { gql } from '@apollo/client';
import * as MENUS from 'constants/menus';
import { FaArrowRight } from 'react-icons/fa';
import {
  SEO,
  Main,
  EntryHeader,
  NavigationMenu,
  Header,
  Footer,
  Heading,
  Button,
  CTA,
  Posts
} from 'components';
import { pageTitle } from 'utils';
import styles from 'styles/pages/_Home.module.scss';
import GeneralSettingsFragment from 'client/fragments/GeneralSettings.graphql';
import FeaturedImageFragment from 'client/fragments/FeaturedImage.graphql';

const postsPerPage = 3;

function Component(props) {
  const generalSettings = props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes.filter(n => !Array.isArray(n)) ?? [];
  const footerMenu = props?.data?.footerMenuItems.nodes.filter(n => !Array.isArray(n)) ?? [];
  const posts = props?.data?.posts.nodes.filter(n => !Array.isArray(n)) ?? [];

  const mainBanner = {
    sourceUrl: '/static/banner.jpeg',
    mediaDetails: { width: 1200, height: 600 },
    altText: 'Blog Banner',
  };

  return (
    <>
      <SEO
        title={pageTitle(generalSettings)}
        imageUrl={mainBanner?.sourceUrl}
      />
      <Header menuItems={primaryMenu} />

      <Main className={styles.home}>
        <EntryHeader image={mainBanner} />
        <div className="container">
          <section className="hero text-center">
            <Heading className={styles.heading} level="h1">
              Welcome to your Blueprint
            </Heading>
            <p className={styles.description}>
              Achieve unprecedented performance with modern frameworks and the
              world&apos;s #1 open source CMS in one powerful headless platform.{' '}
            </p>
            <div className={styles.actions}>
              <Button styleType="secondary" href="/contact-us">
                GET STARTED
              </Button>
              <Button styleType="primary" href="/about">
                LEARN MORE
              </Button>
            </div>
          </section>
          <section className="cta">
            <CTA
              Button={() => (
                <Button href="/category/uncategorised">
                  Get Started <FaArrowRight style={{ marginLeft: `1rem` }} />
                </Button>
              )}
            >
              <span>
                Learn about Core Web Vitals and how Atlas can help you reach
                your most demanding speed and user experience requirements.
              </span>
            </CTA>
          </section>
          <section className={styles.posts}>
            <Heading className={styles.heading} level="h2">
              Latest Posts
            </Heading>
            <Posts posts={posts} id="posts-list" />
          </section>
          <section className="cta">
            <CTA
              Button={() => (
                <Button href="/category/uncategorised">
                  Get Started <FaArrowRight style={{ marginLeft: `1rem` }} />
                </Button>
              )}
            >
              <span>
                Learn about Core Web Vitals and how Atlas can help you reach
                your most demanding speed and user experience requirements.
              </span>
            </CTA>
          </section>
        </div>
      </Main>

      <Footer menuItems={footerMenu} />
    </>
  );
}

const variables = ({ uri }) => {
  return { first: postsPerPage, Location: MENUS.PRIMARY_LOCATION, footerLocation: MENUS.FOOTER_LOCATION};
};


const query = gql`
  ${GeneralSettingsFragment}
  ${FeaturedImageFragment}
  ${NavigationMenu.fragments.entry}
  ${Posts.fragments.entry}
  query GetPageData($first: Int, $headerLocation: MenuLocationEnum, $footerLocation: MenuLocationEnum) {
    posts(first: $first) {
      nodes {
        ...PostFragment
      }
    }
    generalSettings {
      ...GeneralSettingsFragment
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

export default { Component, variables, query };
