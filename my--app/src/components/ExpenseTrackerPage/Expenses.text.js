import React from 'react';
import { render, screen } from '@testing-library/react';
import Expenses from './Expenses';



describe('App ',()=>{
    test('renders Expenses as a text', () => {
        render(<Expenses />);
        const Expenses = screen.getByText('Login');
        expect(Expenses).toBeInTheDocument();
      });
      
})