import "@/components/home/home.css";
import FeaturedGrid from "@/components/home/featured/FeaturedGrid";
import ScrollGrid from "@/components/home/scroll/ScrollGrid";
import TrendingGrid from "@/components/home/trending/TrendingGrid";
import GalleryGrid from "@/components/home/gallery/GalleryGrid";
import MostViewed from "@/components/home/mostviewed/MostViewed";
import ReviewsGrid from "@/components/home/reviews/ReviewsGrid";
import CategoryTopGrid from "@/components/home/categorytop/CategoryTopGrid";
import VideoGallery from "@/components/common/videogallery/VideoGallery";
import MoreStories from "@/components/home/morestories/MoreStories";
import OtherPosts from "@/components/other/OtherPosts";
import MovieCollections from "@/components/common/moviestable/MovieCollections";
import MovieSchedules from "@/components/common/moviestable/MovieSchedules";
import Discover from "@/components/common/discover/Discover";
import BreakingNews from "@/components/common/breakingnews/BreakingNews";
import SmartAdUnit from "@/components/google-ads/SmartAdUnit";
import AdBlock from "@/components/google-ads/AdBlock";

export default function Home() {
  return (
    <div className="home-page">
      <BreakingNews />
      <FeaturedGrid />
      {/* DH AD */}
      <AdBlock>
        <SmartAdUnit slot="3315432893" />
      </AdBlock>
      <div className="duo-content">
        <div className="duo-content-left">
          <TrendingGrid />
          {/* DH AD */}
          <AdBlock>
            <SmartAdUnit slot="3315432893" style={{ height: "150px" }} />
          </AdBlock>
        </div>
        <div className="duo-content-right">
          {/* DS AD */}
          <AdBlock>
            <SmartAdUnit slot="9180743912" />
          </AdBlock>
          <ScrollGrid />
        </div>
      </div>
      <GalleryGrid />
      {/* DH AD */}
      <AdBlock>
        <SmartAdUnit slot="3315432893" />
      </AdBlock>
      <MostViewed />
      <ReviewsGrid />
      {/* DH AD */}
      <AdBlock>
        <SmartAdUnit slot="3315432893" style={{ height: "150px" }} />
      </AdBlock>
      <CategoryTopGrid />
      <VideoGallery
        title="కొత్త ట్రైలర్లు"
        nav="/videos?subcategory=trailers"
        subcategory="trailers"
      />
      {/* DH AD */}
      <AdBlock>
        <SmartAdUnit slot="3315432893" style={{ height: "150px" }} />
      </AdBlock>
      <MoreStories />
      <OtherPosts category="technology" />
      {/* DH AD */}
      <AdBlock>
        <SmartAdUnit slot="3315432893" style={{ height: "150px" }} />
      </AdBlock>
      <OtherPosts category="business" />
      <OtherPosts category="health" />
      <VideoGallery
        title="లిరికల్ సాంగ్స్"
        nav="/videos?subcategory=lyrical_songs"
        subcategory="lyrical_songs"
      />
      <div className="movies-tables-section">
        <MovieSchedules />
        <MovieCollections />
      </div>
      {/* MH AD */}
      <AdBlock>
        <SmartAdUnit slot="9182003090" />
      </AdBlock>
      <Discover />
    </div>
  );
}
