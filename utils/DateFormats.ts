export function formatTimeAgo(ms: number): string {
   const now = Date.now();
   const diff = now - ms;

   const oneDay = 1000 * 60 * 60 * 24;
   const days = Math.floor(diff / oneDay);

   if (days < 1) return 'today';
   if (days <= 7) return `${days}d ago`;

   // Format date as "23 May 2025"
   const date = new Date(ms);
   const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
   };
   return date.toLocaleDateString('en-GB', options);
}