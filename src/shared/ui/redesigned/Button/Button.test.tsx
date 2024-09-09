import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from './Button';

describe('Button', () => {
    test('Test render', () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });
    test('Render with clear theme', () => {
        render(<Button variant="clear">TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('clear');
    });
});
