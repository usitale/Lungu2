import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lungu Safari Tours — Unforgettable African Safari Experiences",
  description:
    "Discover Africa with Lungu Safari Tours. Premium safari packages, luxury accommodation, guided wildlife tours, and seamless online booking. Your adventure starts here.",
  keywords:
    "Lungu Safari Tours, African safari, wildlife tours, safari packages, Zambia safari, luxury safari, accommodation booking, guided tours",
  openGraph: {
    title: "Lungu Safari Tours — Unforgettable African Safari Experiences",
    description:
      "Premium safari packages, luxury lodge accommodation, and guided wildlife tours across Southern Africa.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/*
          ── Tawk.to Live Chat Widget ──────────────────────────
          Uncomment and replace with your Tawk.to property/widget IDs.
          Get them from: https://www.tawk.to → Admin → Chat Widget

          <script
            dangerouslySetInnerHTML={{
              __html: `
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                  s1.async=true;
                  s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
                  s1.charset='UTF-8';
                  s1.setAttribute('crossorigin','*');
                  s0.parentNode.insertBefore(s1,s0);
                })();
              `,
            }}
          />

          ── Facebook Messenger Customer Chat Plugin ───────────
          Replace YOUR_PAGE_ID with your Facebook Page ID.

          <div id="fb-root"></div>
          <div
            class="fb-customerchat"
            attribution="setup_tool"
            page_id="YOUR_PAGE_ID"
            theme_color="#6B4226"
          ></div>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.fbAsyncInit = function() {
                  FB.init({ xfbml: true, version: 'v17.0' });
                };
                (function(d,s,id){
                  var js,fjs=d.getElementsByTagName(s)[0];
                  if(d.getElementById(id))return;
                  js=d.createElement(s);js.id=id;
                  js.src="https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
                  fjs.parentNode.insertBefore(js,fjs);
                }(document,'script','facebook-jssdk'));
              `,
            }}
          />
          ─────────────────────────────────────────────────────
        */}
      </head>
      <body>{children}</body>
    </html>
  );
}
