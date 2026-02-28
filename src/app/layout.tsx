export const metadata = { title: "Stacks Crowdfund", description: "Decentralized fundraising on Stacks" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
