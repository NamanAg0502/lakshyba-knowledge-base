// src/app/page.tsx
import Link from "next/link";
import {
  BookOpenIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  ScaleIcon,
  ClockIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function HomePage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
              Your Legal Knowledge at Your Fingertips
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Access, analyze, and navigate legal documents with powerful search
              capabilities and comprehensive organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/documents">
                  <DocumentTextIcon className="h-5 w-5 mr-2" />
                  Browse Documents
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/upload">
                  <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                  Upload Document
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary-100 rounded-full blur-3xl opacity-30"></div>
            <div className="relative bg-white border rounded-xl shadow-lg overflow-hidden p-6 transition-all duration-300 hover:shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600"></div>
              <div className="flex items-center mb-4">
                <ScaleIcon className="h-8 w-8 text-primary-600 mr-3" />
                <h3 className="text-xl font-semibold text-neutral-900">
                  Legal Knowledge Base
                </h3>
              </div>
              <div className="space-y-4">
                <div className="h-8 bg-neutral-100 rounded-md w-full"></div>
                <div className="h-8 bg-neutral-100 rounded-md w-3/4"></div>
                <div className="h-8 bg-neutral-100 rounded-md w-5/6"></div>
                <div className="h-8 bg-neutral-100 rounded-md w-2/3"></div>
                <div className="h-8 bg-neutral-100 rounded-md w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Powerful Features for Legal Professionals
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Our platform provides the tools you need to efficiently manage and
            navigate legal documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white border-neutral-200 transition-all duration-300 hover:shadow-md hover:border-primary-200">
            <CardContent className="p-6">
              <div className="rounded-full bg-primary-100 w-12 h-12 flex items-center justify-center mb-4">
                <DocumentTextIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Document Management
              </h3>
              <p className="text-neutral-600">
                Upload, organize, and manage legal documents with comprehensive
                metadata support.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-neutral-200 transition-all duration-300 hover:shadow-md hover:border-primary-200">
            <CardContent className="p-6">
              <div className="rounded-full bg-primary-100 w-12 h-12 flex items-center justify-center mb-4">
                <MagnifyingGlassIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Advanced Search
              </h3>
              <p className="text-neutral-600">
                Find exactly what you need with powerful search capabilities,
                including semantic search.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-neutral-200 transition-all duration-300 hover:shadow-md hover:border-primary-200">
            <CardContent className="p-6">
              <div className="rounded-full bg-primary-100 w-12 h-12 flex items-center justify-center mb-4">
                <BookOpenIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Citation Analysis
              </h3>
              <p className="text-neutral-600">
                Track and analyze citations between documents to understand
                legal precedents and relationships.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="bg-gradient-to-br from-primary to-primary rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to get started?
              </h2>
              <p className="text-lg text-primary-100 mb-6 lg:mb-0">
                Begin exploring our comprehensive legal knowledge base today.
                Upload your documents and discover the power of organized legal
                information.
              </p>
            </div>
            <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-neutral-100"
                asChild
              >
                <Link href="/documents">
                  <DocumentTextIcon className="h-5 w-5 mr-2" />
                  Browse Documents
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white text-primary border-white"
                asChild
              >
                <Link href="/upload">
                  <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                  Upload
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-12 md:py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Streamlined Workflow
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Our platform is designed to simplify your legal research and
            document management workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6">
            <div className="rounded-full bg-primary-100 w-16 h-16 flex items-center justify-center mb-4">
              <ArrowUpTrayIcon className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              1. Upload Documents
            </h3>
            <p className="text-neutral-600">
              Upload your legal documents in various formats including PDF,
              DOCX, and TXT.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <div className="rounded-full bg-primary-100 w-16 h-16 flex items-center justify-center mb-4">
              <DocumentTextIcon className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              2. Organize & Enrich
            </h3>
            <p className="text-neutral-600">
              Add metadata, categorize documents, and create relationships
              between legal texts.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <div className="rounded-full bg-primary-100 w-16 h-16 flex items-center justify-center mb-4">
              <MagnifyingGlassIcon className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              3. Search & Analyze
            </h3>
            <p className="text-neutral-600">
              Find relevant information quickly using powerful search and
              analysis tools.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="py-12 md:py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-neutral-900">
            Recent Activity
          </h2>
          <Button variant="link" asChild>
            <Link href="/documents">View All Documents</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* This would be populated dynamically with real data */}
          {Array.from({ length: 3 }).map((_, index) => (
            <Card
              key={index}
              className="transition-all duration-300 hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 text-primary-700 p-2.5 rounded-lg">
                    <DocumentTextIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-neutral-900 mb-1">
                      Document {index + 1}
                    </h3>
                    <p className="text-sm text-neutral-500 mb-2 flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" /> Recently added
                    </p>
                    <p className="text-neutral-600 line-clamp-2">
                      This is a placeholder for document description.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
