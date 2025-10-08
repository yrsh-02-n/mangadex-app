import { Button } from "./Button";
import {Meta, StoryObj} from '@storybook/nextjs-vite'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Main button'
      }
    }
  },
  args: {
    variable: 'primary',
    children: 'Button',
  }
}

export const Secondary: Story = {
  name: 'Secondary',
  args: {
    variable: 'secondary',
    children: 'Button',
  }
}