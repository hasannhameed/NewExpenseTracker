import React from 'react';
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react';
import Header from './components/header/header';





describe('App ',()=>{
    test('renders Headeer as a text', () => {
        render(<Header />);
        const HomePresent = screen.getByText('Home');
        expect(HomePresent).toBeInTheDocument();
      });
      test('renders Headeer as a text', () => {
        render(<Header />);
        const StorePresent = screen.getByText('Store');
        expect(StorePresent).toBeInTheDocument();
      });
      test('renders Headeer as a text', () => {
        render(<Header />);
        const AboutPresent = screen.getByText('About');
        expect(AboutPresent).toBeInTheDocument();
      });
    
    
      

      
})