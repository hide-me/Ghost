import type {Meta, StoryObj} from '@storybook/react';

import DSTest from './DSTest';

const meta = {
    title: 'Meta / Design System Test',
    component: DSTest,
    tags: ['autodocs']
} satisfies Meta<typeof DSTest>;

export default meta;
type Story = StoryObj<typeof DSTest>;

export const Default: Story = {
    args: {
        children: 'This is just a test.'
    }
};
