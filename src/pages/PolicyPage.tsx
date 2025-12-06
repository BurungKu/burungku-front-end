import Container from "@/components/Container.tsx";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Scale, Globe, Shield, Info} from "lucide-react";

export default function PolicyPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>

            <main className="flex-1 py-20">
                <Container>
                    <div className="max-w-4xl mx-auto space-y-5">
                        <div className="text-center space-y-4 py-8">
                            <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">Kebijakan & Regulasi</h1>
                            <p className="text-muted-foreground text-md md:text-lg">
                                Memahami regulasi perlindungan satwa liar di Indonesia dan internasional
                            </p>
                        </div>

                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-3">
                                    <Scale className="w-8 h-8 text-theme-orange mt-1"/>
                                    <div>
                                        <CardTitle className="text-2xl mb-2">
                                            PP No. 7 Tahun 1999
                                        </CardTitle>
                                        <CardDescription className="text-base">
                                            Peraturan Pemerintah tentang Pengawetan Jenis Tumbuhan dan Satwa
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Tentang Regulasi</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        PP No. 7 Tahun 1999 adalah peraturan pemerintah Indonesia yang mengatur
                                        tentang pengawetan jenis tumbuhan dan satwa. Peraturan ini merupakan
                                        pelaksanaan dari Undang-Undang No. 5 Tahun 1990 tentang Konservasi Sumber
                                        Daya Alam Hayati dan Ekosistemnya.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Poin Penting</h3>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li className="flex gap-2">
                                            <span className="text-theme-orange mt-1">•</span>
                                            <span>Mengatur daftar jenis tumbuhan dan satwa yang dilindungi di Indonesia</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-theme-orange mt-1">•</span>
                                            <span>Menetapkan kategori perlindungan untuk berbagai spesies burung endemik dan terancam punah</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-theme-orange mt-1">•</span>
                                            <span>Melarang penangkapan, pemeliharaan, dan perdagangan satwa dilindungi tanpa izin</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-theme-orange mt-1">•</span>
                                            <span>Mengatur sanksi bagi pelanggar ketentuan perlindungan satwa</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Relevansi untuk BurungKu</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Aplikasi BurungKu membantu mengidentifikasi burung dan memberikan informasi
                                        status konservasi berdasarkan PP 7/1999, sehingga pengguna dapat memahami
                                        apakah suatu spesies burung dilindungi oleh hukum Indonesia.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* CITES Section */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-3">
                                    <Globe className="w-8 h-8 text-theme-orange mt-1"/>
                                    <div>
                                        <CardTitle className="text-2xl mb-2">
                                            CITES
                                        </CardTitle>
                                        <CardDescription className="text-base">
                                            Convention on International Trade in Endangered Species of Wild Fauna and Flora
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Tentang CITES</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        CITES adalah perjanjian internasional yang ditandatangani pada tahun 1973
                                        untuk memastikan bahwa perdagangan internasional spesimen tanaman dan hewan
                                        liar tidak mengancam kelangsungan hidup mereka. Indonesia meratifikasi CITES
                                        melalui Keputusan Presiden No. 43 Tahun 1978.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Kategori Appendix CITES</h3>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900">
                                            <h4 className="font-semibold mb-1 text-red-900 dark:text-red-300">
                                                Appendix I
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                Spesies yang terancam punah. Perdagangan internasional dilarang
                                                kecuali dalam kondisi luar biasa.
                                            </p>
                                        </div>
                                        <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-900">
                                            <h4 className="font-semibold mb-1 text-yellow-900 dark:text-yellow-300">
                                                Appendix II
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                Spesies yang tidak terancam punah saat ini, tetapi dapat terancam
                                                jika perdagangan tidak diatur ketat.
                                            </p>
                                        </div>
                                        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                                            <h4 className="font-semibold mb-1 text-blue-900 dark:text-blue-300">
                                                Appendix III
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                Spesies yang dilindungi di setidaknya satu negara yang meminta
                                                bantuan negara lain untuk mengontrol perdagangan.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Implementasi di Indonesia</h3>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li className="flex gap-2">
                                            <span className="text-theme-orange mt-1">•</span>
                                            <span>Indonesia memiliki keanekaragaman hayati tinggi dengan banyak spesies endemik</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-theme-orange mt-1">•</span>
                                            <span>Ratusan spesies burung Indonesia terdaftar dalam Appendix CITES</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-theme-orange mt-1">•</span>
                                            <span>Perdagangan burung yang tercantum dalam CITES harus memiliki izin khusus</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-theme-orange mt-1">•</span>
                                            <span>Pelanggaran CITES dapat dikenai sanksi administratif dan pidana</span>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Additional Info */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-3">
                                    <Shield className="w-8 h-8 text-theme-orange mt-1"/>
                                    <div>
                                        <CardTitle className="text-2xl mb-2">
                                            Komitmen BurungKu
                                        </CardTitle>
                                        <CardDescription className="text-base">
                                            Mendukung konservasi burung Indonesia
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground leading-relaxed">
                                    BurungKu berkomitmen untuk mendukung upaya konservasi burung di Indonesia
                                    dengan menyediakan informasi akurat tentang status perlindungan burung
                                    berdasarkan PP 7/1999 dan CITES. Kami berharap aplikasi ini dapat meningkatkan
                                    kesadaran masyarakat tentang pentingnya melindungi keanekaragaman hayati Indonesia.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Disclaimer */}
                        <Card className="bg-muted">
                            <CardHeader>
                                <div className="flex items-start gap-3">
                                    <Info className="w-6 h-6 text-theme-orange mt-1"/>
                                    <div>
                                        <CardTitle className="text-lg">Disclaimer</CardTitle>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Informasi yang disediakan di halaman ini bersifat edukatif dan informatif.
                                    Untuk informasi resmi dan terkini mengenai regulasi perlindungan satwa,
                                    silakan merujuk pada dokumen resmi pemerintah atau konsultasi dengan
                                    otoritas terkait seperti Kementerian Lingkungan Hidup dan Kehutanan (KLHK).
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </Container>
            </main>

            <Footer/>
        </div>
    );
}
