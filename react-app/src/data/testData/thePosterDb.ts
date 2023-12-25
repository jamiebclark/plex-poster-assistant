import { Poster } from "../../lib/loadPostersFromPage"

const initPosters = [
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/collections/153/NPb8tGIcxnjujAwEIwx4F3LGynLmG2ulV3FRFbBl.webp",
    title: "Star Wars Collection.png",
    url: "https://theposterdb.com/api/assets/1409/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/movies/159/qlD4RbSqE2blgMxF0RPrvNJW9CUeYGAioL8TZ4mb.webp",
    title: "Star Wars",
    url: "https://theposterdb.com/api/assets/1410/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/movies/178/vuCfuVXaFVFfINq9JBcy46vPCLaHxfJrAAc36jbn.webp",
    title: "The Empire Strikes Back",
    url: "https://theposterdb.com/api/assets/1411/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/movies/197/U1mRqJsNGH1YlJS8wmNYwk8PBe54kSf5dkPk4BoJ.webp",
    title: "Return of the Jedi",
    url: "https://theposterdb.com/api/assets/1412/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/movies/167/YCJzACV0U5HY5PyDzc4d1d2goKHoaIySnBFmz0F7.webp",
    title: "Star Wars: Episode I - The Phantom Menace",
    url: "https://theposterdb.com/api/assets/1413/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/movies/168/3aVdrIkV9U0hj3AhMMY4eiGGschlpu7oUNbIKmyw.webp",
    title: "Star Wars: Episode II - Attack of the Clones",
    url: "https://theposterdb.com/api/assets/1414/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/movies/169/Mf9p4MITL4im6lCjwTP7mrULjFVfrTWVuZ03KZsy.webp",
    title: "Star Wars: Episode III - Revenge of the Sith",
    url: "https://theposterdb.com/api/assets/1415/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/movies/162/YtO2kL0rSismlnX4UdHZe6S1Rwl0fR4VOaKtZGe8.webp",
    title: "Star Wars: The Force Awakens",
    url: "https://theposterdb.com/api/assets/1416/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/movies/161/8v3B1683xdUF95PshoVWWH8RCiM9tnZ1B945YmAX.webp",
    title: "Star Wars: The Last Jedi",
    url: "https://theposterdb.com/api/assets/1417/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/movies/166/EBan2H7NpAz8vs2i8Gr8MujYaRzRHxh4qUfr3lOX.webp",
    title: "Star Wars: The Rise of Skywalker",
    url: "https://theposterdb.com/api/assets/48286/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/movies/160/y6lGNw0c0fOcVeHjeRHhw9aOI46h9r3iQVYaP6dE.webp",
    title: "Solo: A Star Wars Story",
    url: "https://theposterdb.com/api/assets/5582/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/movies/164/jzYL14fCn4Kl9z9ukZqsoFr7gk9m8zeTkpxigDfJ.webp",
    title: "Rogue One: A Star Wars Story",
    url: "https://theposterdb.com/api/assets/5583/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/shows/1573/season_c/BoemeFFvDk9WITFvtPhciyr24RO60Y1Uh7jIDXjE.webp",
    title: "The Mandalorian",
    url: "https://theposterdb.com/api/assets/150511/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/movies/162/aqQuDaSYjcuIu1k9hR32cEIggAWQuKybJ4q0hKiI.webp",
    title: "Star Wars: The Force Awakens",
    url: "https://theposterdb.com/api/assets/7789/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/movies/159/ZuoCoSEO8aFBHeqhF7kAzfhIrzqzPzaY92Bxy8qc.webp",
    title: "Star Wars",
    url: "https://theposterdb.com/api/assets/12516/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/movies/159/gt9DdtAHZn6oXuyccVnDSOPaOzCeyuZO5vgCitWN.webp",
    title: "Star Wars",
    url: "https://theposterdb.com/api/assets/5578/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/movies/159/qfH9bYGGuUAgOAIxMlkOw3op8BfIs5P6Rjc7XvLN.webp",
    title: "Star Wars",
    url: "https://theposterdb.com/api/assets/1036/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/shows/154795/season_c/ZaKidZgmADkrpOhHxKoajUIX7EcfQEN3VYkcZlYk.webp",
    title: "Obi-Wan Kenobi",
    url: "https://theposterdb.com/api/assets/237715/download?performed_by=killcast",
  },
  {
    thumb:
      "https://images.theposterdb.com/prod/public/images/posters/optimized/shows/936797/season_c/8R9geWLnjtldKiGnn9x3kb3UWi8jqVleK8jRh9AN.webp",
    title: "The Book of Boba Fett",
    url: "https://theposterdb.com/api/assets/237731/download?performed_by=killcast",
  },
] as Poster[]

export default initPosters