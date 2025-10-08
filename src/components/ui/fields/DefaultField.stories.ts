
import {Meta, StoryObj} from '@storybook/nextjs-vite'
import { DefaultField } from './DefaultField'
import { SearchIcon } from 'lucide-react'
import { fn, userEvent, within } from 'storybook/internal/test'

const meta: Meta<typeof DefaultField> = {
  title: 'Components/Fields',
  component: DefaultField,
  tags: ['autodocs'],
  args: { onBlur: fn(), onFocus: fn() }
}

export default meta

type Story = StoryObj<typeof DefaultField>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Main field component'
      }
    }
  },
  args: {
    variant: 'default',
    size: 'sm',
    placeholder: 'placeholder'
  }
}

export const Search: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Search field component'
      }
    }
  },
  args: {
    variant: 'search',
    size: 'sm',
    placeholder: 'placeholder',
    icon: SearchIcon
  }
}

export const Select: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select field component'
      }
    }
  },
  args: {
    variant: 'select',
    size: 'sm',
    placeholder: 'placeholder'
  }
}


export const SimpleFilled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Filled field component'
      }
    }
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByPlaceholderText('Имя'), 'Кирилл')
  },
  args: {
    variant: 'default',
    size: 'sm',
    placeholder: 'Имя'
  }
}