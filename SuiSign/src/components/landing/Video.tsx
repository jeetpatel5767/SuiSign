import { Upload, Users, PenTool, CheckCircle, Sparkles, ArrowUpRight } from "lucide-react";
import VideoImage from "@/assets/Video.png";

const Video = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 h-9 rounded-full border mb-6" style={{ borderColor: '#bfdbfe', backgroundColor: '#2684ff', boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)' }}>
            <Sparkles className="w-4 h-4 text-white fill-white" />
            <span className="text-sm font-regular text-white gap-3 flex items-center">
              <span>Video</span>
              <span>|</span>
              <span>See more</span>
            </span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
          <h2 className="font-semibold mb-4" style={{ fontSize: '54px', color: '#1a1615' }}>
            See SuiSign in Action
          </h2>
          <p className="font-normal mb-8" style={{ fontSize: '20px', color: '#6d6d6d' }}>
            Watch how SuiSign transforms Document collaboration and project <br />management in just 2 minutes
          </p>
        </div>

        {/* Video Image */}
        <div className="max-w-6xl mx-auto">
          <img src={VideoImage} alt="SuiSign in Action" className="w-full h-auto" />
        </div>

      </div>
    </section>
  );
};

export default Video;
