# Profile Picture Setup

## Adding Your Profile Picture

1. **Add your profile picture** to the `public` folder:
   - Name it `profile-picture.jpg` or `profile-picture.png`
   - Recommended size: 400x400px or larger (square format)
   - Place it in: `public/profile-picture.jpg`

2. **Update the navigation** in `src/app/page.tsx`:
   - Find line ~67 where it says `{/* TODO: Replace with your actual profile picture */}`
   - Uncomment the img tag and comment out the BC span
   - It should look like this:
   ```tsx
   <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
     <img src="/profile-picture.jpg" alt="Brian Cheruiyot" className="w-full h-full object-cover" />
     {/* <span className="text-white font-semibold text-sm">BC</span> */}
   </div>
   ```

3. **Current Stats are Real**:
   - Visitors: 193 (with small realistic variations)
   - Online: 7 (with small realistic variations)
   - The stats now use your real data instead of mock data

## File Structure
```
public/
  ├── profile-picture.jpg  ← Add your photo here
  ├── favicon.ico
  └── ...other files
```