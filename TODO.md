# Turbopack Fix TODO

## Plan Breakdown:

1. ✅ Clear .next cache [attempted; manual if needed: delete asdev-website/.next folder]
2. ✅ Update next.config.ts to disable Turbopack [done]
3. ✅ [Skipped] Update package.json dev script
4. 🔄 `npm install` [no changes needed]
5. 🔄 `npx prisma generate` [if needed]
6. ✅ Test `npm run dev`
7. ✅ CSS/Layout Fix:
   - Tailwind 3.4.17 downgrade
   - Font cleanup
   - Test styles
8. 🔄 Run `npm install` if deps changed
9. 🔄 `npx prisma generate`
10. ✅ Test `npm run dev`
11. 🔄 Full stable downgrade if needed (Next 15.1.x)
12. ✅ Verify all pages/API/admin work

Progress: Starting step 1.
