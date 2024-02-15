function appendToBody() {
  const el = document.createElement('div')
  el.appendChild(document.createTextNode('Hello everyone!'))
  document.body.appendChild(el)
}

function renderer(vnode, container) {
  if (typeof vnode.tag === 'string') {
    mountElement(vnode, container)
  } else if (typeof vnode.tag === 'object') {
    mountComponent(vnode, container)
  }
}

function mountElement(vnode, container) {
  const el = document.createElement(vnode.tag)

  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      el.addEventListener(key.substring(2).toLowerCase(), vnode.props[key])
    }
  }

  if (typeof vnode.children === 'string') {
    const text = document.createTextNode(vnode.children)
    el.appendChild(text)
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => renderer(child, el))
  }

  container.appendChild(el)
}

function mountComponent(vnode, container) {
  const subtree = vnode.tag.render()
  renderer(subtree, container)
}

const obj2 = {
  tag: 'div',
  children: [{ tag: 'h1', children: 'Hello, buddy!' }]
}

const vnode = {
  tag: 'div',
  props: {
    onClick: () => alert('hello vnode')
  },
  children: 'click me'
}

const MyComponent = {
  render() {
    return {
      tag: 'div',
      props: {
        onClick: () => alert('hello component!')
      },
      children: 'click component'
    }
  }
}
