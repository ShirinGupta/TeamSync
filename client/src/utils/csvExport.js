// Export members data to CSV
export const exportToCSV = (members, filename = 'members.csv') => {
  // Define CSV headers
  const headers = ['Name', 'Role', 'Email', 'Contact'];
  
  // Create CSV rows
  const rows = members.map(member => [
    member.name,
    member.role,
    member.email,
    member.contact
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Generate download filename with current date
export const getDownloadFilename = () => {
  const date = new Date().toISOString().split('T')[0];
  return `team-members-${date}.csv`;
};
