# Transparent Header Setup Guide

This guide explains how to implement and use the transparent header feature with video banners in your Shopify theme.

## What's Included

### Files Added/Modified:
1. **`assets/transparent-header.css`** - Transparent header styles
2. **`assets/transparent-header.js`** - JavaScript functionality for scroll detection
3. **`assets/section-video-banner.css`** - Video banner specific styles
4. **`sections/claude-video-banner.liquid`** - Video banner section
5. **`sections/transparent-banner.liquid`** - Image banner with transparent header support
6. **`sections/header.liquid`** - Updated with transparent header settings
7. **`layout/theme.liquid`** - Already includes CSS and JS files

## How It Works

### Transparent Header Functionality:
- Header becomes transparent and overlays the first section
- Smooth transition to solid background when scrolling
- Supports both video banners and image banners
- Text and icons change color for better contrast
- Dropdown menus have proper background when transparent

### Auto-Detection:
The JavaScript automatically detects when to enable transparent mode by checking:
- Header settings (enable_transparent_header_home/pages)
- First section contains a banner or video banner
- Adds appropriate CSS classes automatically

## Setup Instructions

### 1. Enable Transparent Header in Theme Settings

1. Go to **Online Store → Themes → Customize**
2. Navigate to **Header** section
3. Scroll down to **"Transparent Header"** settings
4. Enable:
   - ☑️ "Enable transparent header on homepage" 
   - ☑️ "Enable transparent header on pages" (optional)

### 2. Add a Video Banner Section

1. In the theme customizer, click **"Add section"**
2. Select **"Bannière Vidéo"** (Video Banner)
3. Configure your video:
   - **Video URL**: YouTube or Vimeo URL
   - **OR Video File**: Upload MP4 file
   - **Fallback Image**: Backup image if video fails

4. Set content:
   - **Heading**: Your main title
   - **Subheading**: Supporting text
   - **Button**: Call-to-action button

5. Customize appearance:
   - **Full Height**: Enable for 100vh banner
   - **Overlay Opacity**: 0-80% dark overlay
   - **Text Alignment**: Left, center, or right
   - **Colors**: Text and button colors

### 3. Alternative: Use Image Banner

If you prefer an image banner:
1. Add **"Image banner with transparent header"** section
2. Upload your background image
3. Configure content blocks (heading, text, buttons)

## Video Banner Settings Explained

### Video Options:
- **YouTube/Vimeo URL**: Full URL (e.g., `https://www.youtube.com/watch?v=VIDEO_ID`)
- **Video File**: Direct MP4 upload via Files section
- **Fallback Image**: Shown if video fails to load

### Layout Options:
- **Full Height**: Makes banner fill entire viewport
- **Text Alignment**: Controls content positioning
- **Overlay**: Adds dark overlay for text readability

### SEO & Accessibility:
- **Video Title**: Important for SEO
- **Video Description**: Screen reader support
- **Heading Tag**: Choose H1 for main page title

## Customization Options

### CSS Variables Available:
```css
--transparent-header-height: Auto-calculated header height
--color-background: Theme background color
--color-foreground: Theme text color
```

### JavaScript API:
```javascript
// Manual control
window.transparentHeader.forceTransparent(true);
window.transparentHeader.update();
```

## Browser Support

### Modern Features Used:
- `backdrop-filter: blur()` - For glassmorphism effect
- CSS Grid and Flexbox - For layout
- CSS Custom Properties - For dynamic theming
- IntersectionObserver - For scroll detection

### Fallbacks:
- Graceful degradation for older browsers
- Solid backgrounds when backdrop-filter unavailable
- Reduced motion support for accessibility

## Performance Considerations

### Optimizations Included:
- Throttled scroll events (16ms intervals)
- `will-change` properties for smooth animations
- Lazy loading for videos and images
- Efficient CSS selectors

### Video Performance:
- Auto-optimized embeds for YouTube/Vimeo
- Poster images for faster loading
- `playsinline` attribute for mobile

## Troubleshooting

### Common Issues:

1. **Header not transparent**:
   - Check header settings are enabled
   - Ensure video/banner section is first after header
   - Verify CSS files are loading

2. **Video not playing**:
   - Check video URL format
   - Ensure autoplay is supported (muted videos only)
   - Verify file format (MP4 recommended)

3. **Text not visible**:
   - Increase overlay opacity
   - Adjust text colors in section settings
   - Check text shadow is applied

4. **Scroll behavior issues**:
   - Clear browser cache
   - Check for JavaScript errors in console
   - Verify scroll threshold (100px default)

### Debug Mode:
Add `?debug=1` to URL to see console logs from transparent header script.

## Advanced Customization

### Custom CSS:
Add to `assets/transparent-header.css`:
```css
/* Custom transparent header styles */
.header-wrapper--transparent .custom-element {
  /* Your styles */
}
```

### Custom JavaScript:
```javascript
// Listen for header state changes
document.addEventListener('transparent-header:scrolled', function(e) {
  console.log('Header scrolled state:', e.detail.isScrolled);
});
```

## Best Practices

### Video Guidelines:
- Use short, looping videos (10-30 seconds)
- Keep file sizes under 5MB for MP4 uploads
- Always include fallback images
- Test on mobile devices

### Content Guidelines:
- Keep text concise and readable
- Use high contrast colors
- Test with different overlay opacities
- Ensure CTA buttons are prominent

### Performance Guidelines:
- Optimize images and videos
- Use appropriate video compression
- Test loading times on slower connections
- Monitor Core Web Vitals

## Support

For additional support or customization requests, refer to:
- Theme documentation
- Shopify Developer Documentation
- Browser developer tools for debugging

---

*Last updated: May 29, 2025*
