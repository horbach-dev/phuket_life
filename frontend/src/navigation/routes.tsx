import type { ComponentType, JSX } from 'react';
import IndexPage from '@/pages/IndexPage';
import ArticlePage from "@/pages/ArticlePage";
import ArticlesPage from "@/pages/ArticlesPage";
import ApartmentsPage from "@/pages/ApartmentsPage";
import ApartmentPage from "@/pages/ApartmentPage";
import ApartmentsLayout from "@/pages/ApartmentsLayout";

interface Route {
  path: string
  Component: ComponentType
  title?: string
  icon?: JSX.Element
  children?: Route[]
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage, title: 'Phuket for life' },
  { path: '/articles/:id', Component: ArticlePage, title: 'Article page' },
  { path: '/articles', Component: ArticlesPage, title: 'Articles page' },
  {
    path: '/apartments',
    Component: ApartmentsLayout,
    children: [
      { path: '', Component: ApartmentsPage, title: 'Apartments page' },
      { path: ':id', Component: ApartmentPage as ComponentType, title: 'Apartment page' }
    ]
  }
];
