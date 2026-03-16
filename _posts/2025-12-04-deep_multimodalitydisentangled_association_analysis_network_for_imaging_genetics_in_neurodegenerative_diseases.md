---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q3HNRC5F%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T231813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQCXzz%2Bp961FLjzfvUT5Lw%2BO921gyhuzz3cguFYxf%2FYr9wIgQjceLaHh5HzJacCx01EgkcPhCmyM8WXQiqG%2Bl%2FC%2Bfy8qiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOLg%2F6zuuo1goOMilSrcA8URf73mZNsesZuhf8Ou%2FyGgz%2FT2w6u0aWa7PuCUBFh9PwJQRtcN%2BbUWYD4S%2ByWDfP1SI4DFi2Q3woq0CHWzdsxKIsgaMr8cv%2FwFzsttBWkf1WmunYpRti5TVKG2Sh%2F%2Fy2a1bJTHEiiBOa5qvc8ylpOsvPouZBEPIZMMhZhJ5Q7KVrtUvg1o82RvqtMiSODBj2I1LpBESdcOgmNZVGgipvyv4KRpE3tK5rAdYoi%2BwEZnhYVaJQnQdxJ%2Fd4jXi4AvCchB8f%2Bc0QxHs4d0EmOCxVXrjb5N0hS0kelnWiRUkHbXoUqIPN6xNckBsD%2Bqjz0G4XJPVnZUaiXgPcUWsXxhO%2Fw8jnWMC51K%2F0Y9Taj0Zyrp1PlZg7lQMKpQtbLHJmlCOsGYXMpvFlMzvnYfiNBksPFOdVWumsbUxqBXTikvQ6vdgoRlq9Da8fkSUgeiM%2Ber0l6Sr85WLDcP2fdjg452%2FWyKJeXR6Lz07zlSWlVKjWpBnuo2F2%2BesPPp8Er6NK7V7LQKu%2FiKHv6AbnuETCcYQK4l0xtpkKdo%2F4Q469DdpTEIzUnBt8yUPlz7YUFrfP92rNdl1C1v5lz8l456NUdWhT4kpNjJMe1WixsPgoDzpAfKyyfERB2EKH8xSabTMJ%2BY4s0GOqUBiy2L6Sv%2BhtGjJ9lGke%2FTTFq5vnJu5HPqRBRo9zvn8HgjJJXHPINrYjStwbMHm9qRH1wVJKeozX0DNw1HFvR9%2BXTU9vLui6qXc5rP2F0CIzRsXCVmbcpVvkTlqepHBu1l7Ocnlsk89OP7QRSoT3nJgzD6qW9pdXQGPPE%2Fb2ndYAAqpb93MdMSs0vArzWiOTjgyqeNiKNzNpbtJ7VsfoFUkW%2B%2BXzgv&X-Amz-Signature=727966aff9d31d9e9112bde05462f3051db85c9ee2c0a7299791b7766b8ad395&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q3HNRC5F%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T231813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQCXzz%2Bp961FLjzfvUT5Lw%2BO921gyhuzz3cguFYxf%2FYr9wIgQjceLaHh5HzJacCx01EgkcPhCmyM8WXQiqG%2Bl%2FC%2Bfy8qiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOLg%2F6zuuo1goOMilSrcA8URf73mZNsesZuhf8Ou%2FyGgz%2FT2w6u0aWa7PuCUBFh9PwJQRtcN%2BbUWYD4S%2ByWDfP1SI4DFi2Q3woq0CHWzdsxKIsgaMr8cv%2FwFzsttBWkf1WmunYpRti5TVKG2Sh%2F%2Fy2a1bJTHEiiBOa5qvc8ylpOsvPouZBEPIZMMhZhJ5Q7KVrtUvg1o82RvqtMiSODBj2I1LpBESdcOgmNZVGgipvyv4KRpE3tK5rAdYoi%2BwEZnhYVaJQnQdxJ%2Fd4jXi4AvCchB8f%2Bc0QxHs4d0EmOCxVXrjb5N0hS0kelnWiRUkHbXoUqIPN6xNckBsD%2Bqjz0G4XJPVnZUaiXgPcUWsXxhO%2Fw8jnWMC51K%2F0Y9Taj0Zyrp1PlZg7lQMKpQtbLHJmlCOsGYXMpvFlMzvnYfiNBksPFOdVWumsbUxqBXTikvQ6vdgoRlq9Da8fkSUgeiM%2Ber0l6Sr85WLDcP2fdjg452%2FWyKJeXR6Lz07zlSWlVKjWpBnuo2F2%2BesPPp8Er6NK7V7LQKu%2FiKHv6AbnuETCcYQK4l0xtpkKdo%2F4Q469DdpTEIzUnBt8yUPlz7YUFrfP92rNdl1C1v5lz8l456NUdWhT4kpNjJMe1WixsPgoDzpAfKyyfERB2EKH8xSabTMJ%2BY4s0GOqUBiy2L6Sv%2BhtGjJ9lGke%2FTTFq5vnJu5HPqRBRo9zvn8HgjJJXHPINrYjStwbMHm9qRH1wVJKeozX0DNw1HFvR9%2BXTU9vLui6qXc5rP2F0CIzRsXCVmbcpVvkTlqepHBu1l7Ocnlsk89OP7QRSoT3nJgzD6qW9pdXQGPPE%2Fb2ndYAAqpb93MdMSs0vArzWiOTjgyqeNiKNzNpbtJ7VsfoFUkW%2B%2BXzgv&X-Amz-Signature=727966aff9d31d9e9112bde05462f3051db85c9ee2c0a7299791b7766b8ad395&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JMFP525%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T231814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJGMEQCIHB3ToCrBN4KicrnzGFOB3u%2FALSxPupyYji5QlvzQxGOAiANlUXUNnPVNsYJHFPu%2BLoDdAMrFL7PzHgyux5EbkjTsSqIBAjg%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3KbEsc%2BUebsiCCeSKtwDmtKuXMAaVxgAA%2BD03VwsziJ24amtst4NxS068M8M5RpGn2xhOBvMEfHoUOFUnUhyHOzvaw7RL9OMAS%2Bg7o%2FPnb%2B%2B%2FW5vsdj14byE06plMhhiYrnSFbbw9BxB95ISvHZQfqyQ2FGPg5b1crrkbuLFJYcK3KPaAYavpC7IDBkyRI%2BuArBNY%2B3GHuBIx2lvp%2BdQ27M869DucWtUSk2eJt%2B8Zs49qW9tw6yrc%2FrZF%2B1qDc0ocJVj%2FLKE%2BGZU91BO1Y%2Bcc4%2FjCAPG0JsrW03deeT0M2nfDoqVGdXfPviOSNDKF9lVl6zE%2Bj11V8i2H2a%2BQwq2mbYUNLKbAdE3HTO%2F9%2FOk8j6t11J%2Bg2I%2F17FGcDJ%2BD3HrVQQ5pkKcSQUws%2FbPHKkXfCrjG0q7lvp0sh4%2F6nkDxJt8S1kpfw4wciZhb5QKmSzjOX4BCPf1321XDFeqdvQZFP9ycvvmZT4SAGbWCuFwVe2%2BXOgE%2FcIUQNPbeeXxVng5lBhkdnnyPh78MT2QKadU1iALKob4N%2FRmx1L5lf8f5y%2BdOxrsL8YxzYjsy%2Fc1LS2MK80g1lMw0UAcR7RI5y%2FV8JdrxQhpmpxMx3xoUEbC4IdpjfmZWRZC0g88htxaF3hV67s0IQ7rVYwqr%2BswxZjizQY6pgFGABcCpqBGV0XjOhM5%2FrrosdXOGj3Q9Ub7ZvvX7QKYNSZasM1zYrnp4rtT8DGvhHlK2g489yo8EFjUnFRMS%2F1dXPCRFuD%2B14%2FzlA4Wfu%2F58UbooVV0g6VoQgeEtX64phWxdWUy4aWSKKj4d%2BFhSMoWuJq6MraekehtIvNnZE78VGLsxRBLhhba1B7mNULYgyW9QzoRzu8vViLNTbEVPJpGSmAtIZsx&X-Amz-Signature=d5374560de33cd226d5f49d67aba2c55009e29eb5a5ab1d716faa335ae017284&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46634IBJ7DG%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T231818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQDDmWS8pFq5BpqJfxWWrZzhqTak703Nx3Zrvwel3DraAwIgELff5mJI7HGsi3%2FIKKUVI9WnZv4BCRjpzzYlXEMHHskqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL8R1wzs6SFQ6cI7wSrcA2CYLtwktU5s%2BIfPExsQbsut5W%2BreGWj7IrGjlSS2yFhiawBCdMY7dH2cyOVSbIWyN2XIqIOKKPDVFB10gvJL4%2FC02xM3WRdFAciwN2mGh9USG0CIG9EuedMAPixhBFDrFnzzkeeEApxu9mY%2BQ22mwULxTyxoqJnVG5tUQqIi6hMIwYeZ1i%2BpwQP1J%2F%2B93TNebzFTgwckHkVZ0yj%2Fa4%2B2YF%2F8MP786KFanodvcJZdIbRZEJ6L3lZe8PMWlBAQxNUcH5r9s%2F0h3gwhXjnOTV4AnuuvwNrk0XvQiHcLigt8jjGWDr0mIhKt4F3DIlxq1z1BT8BNhcOANC4ukSQUnc1lo27MLINsEpTML5CsZe555WfgpP8IfkzvA9H7dnVhgDqjrWAZidcLPZQgaHblBw2jSsJrIcs8hqn5r0dXIx3n1P4VvEz2qfcXGqi6U%2FzFRHvc2DJG31gO4VPAmkCobjv8991NK0gfrwA6LUOiSKVlg9s589tenjEdFYb%2BucJgge7oY2MPRKFHIXCkulFz9YGjGWTphlmMozrCy%2BdYidEMdtSpCVJK0KCKjHwIxhxnvBF%2FwinhHA5c6fyxadzZeA13p3Y3L1yaBV8qtLqyzemOCgrlczrwqxHJLK%2BK4S0MI2Y4s0GOqUB1IzfLmVbSg1EN%2BVpU%2BUZQuE4beAieYYZfha%2B8qcb3Gti%2FI0PAyGi1oDg1%2Bm0W%2Fzt%2FZnllk0W0Uy%2BkzutY9V4imeIIrg3sYo8BgkE0S8N%2B4VDT2tQIjuX%2FCu30nKx2A9eefWRGEAyICYNVE5Nj99sy1K%2FQwtA64T0P%2FCPuE1kDupofUEqMsyThyzTIZ%2F8s6JLyKcRY44ez%2BJsbUqNLoNbA3DO4GlI&X-Amz-Signature=3bcd4ac0e23605440a896db76e8aa6a94e9f996e35d2e4cb7c9833ab7c966368&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46634IBJ7DG%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T231818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQDDmWS8pFq5BpqJfxWWrZzhqTak703Nx3Zrvwel3DraAwIgELff5mJI7HGsi3%2FIKKUVI9WnZv4BCRjpzzYlXEMHHskqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL8R1wzs6SFQ6cI7wSrcA2CYLtwktU5s%2BIfPExsQbsut5W%2BreGWj7IrGjlSS2yFhiawBCdMY7dH2cyOVSbIWyN2XIqIOKKPDVFB10gvJL4%2FC02xM3WRdFAciwN2mGh9USG0CIG9EuedMAPixhBFDrFnzzkeeEApxu9mY%2BQ22mwULxTyxoqJnVG5tUQqIi6hMIwYeZ1i%2BpwQP1J%2F%2B93TNebzFTgwckHkVZ0yj%2Fa4%2B2YF%2F8MP786KFanodvcJZdIbRZEJ6L3lZe8PMWlBAQxNUcH5r9s%2F0h3gwhXjnOTV4AnuuvwNrk0XvQiHcLigt8jjGWDr0mIhKt4F3DIlxq1z1BT8BNhcOANC4ukSQUnc1lo27MLINsEpTML5CsZe555WfgpP8IfkzvA9H7dnVhgDqjrWAZidcLPZQgaHblBw2jSsJrIcs8hqn5r0dXIx3n1P4VvEz2qfcXGqi6U%2FzFRHvc2DJG31gO4VPAmkCobjv8991NK0gfrwA6LUOiSKVlg9s589tenjEdFYb%2BucJgge7oY2MPRKFHIXCkulFz9YGjGWTphlmMozrCy%2BdYidEMdtSpCVJK0KCKjHwIxhxnvBF%2FwinhHA5c6fyxadzZeA13p3Y3L1yaBV8qtLqyzemOCgrlczrwqxHJLK%2BK4S0MI2Y4s0GOqUB1IzfLmVbSg1EN%2BVpU%2BUZQuE4beAieYYZfha%2B8qcb3Gti%2FI0PAyGi1oDg1%2Bm0W%2Fzt%2FZnllk0W0Uy%2BkzutY9V4imeIIrg3sYo8BgkE0S8N%2B4VDT2tQIjuX%2FCu30nKx2A9eefWRGEAyICYNVE5Nj99sy1K%2FQwtA64T0P%2FCPuE1kDupofUEqMsyThyzTIZ%2F8s6JLyKcRY44ez%2BJsbUqNLoNbA3DO4GlI&X-Amz-Signature=141593436d71c80f59d7d34a4f373feda938079c517316338b333bd6ee10823f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QBROJC7%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T231818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQDfvsVBgERAKYp%2BVWKDSDleapyQEHS86lMveaJRz0lisQIgXFuOCW2QeJk5VSiONFnqw22SQfNdDOBFt2ZfOtZTGuQqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGJDl%2FqFlnLhmtBg0yrcA5g9HaLKL%2BLhODEcnxVW7vwkx0ehbvz1091hyviLRfSnkgLQHQmTXh%2Fhv%2FLEbI97YkZmTK9kbFkrDg%2BaTsPEOPgeFULtrcK0hSUfqHxPbIGiqfkIWZB%2BR5ZMxzqbtu9JvQqyP%2BJVB9yRPvIvrmnjnkXLur0Jlw9UNGkKSZt5Vaez69uwWLg%2FbXixDbKGtwrlBZ9QlpTSbIme1PE2bYqEfBYTJGyZIFBcsZV%2BcgkCx0P5DkMl3e%2BEAjRz3GgRbltisNDHI0%2BsUa%2BccFy9EtTuQRPn3CnOQV%2Fhv64IX1ea6zryAEp7Co3HS0bFf0qLPZ%2BwrkFfDi9tcq4k%2FrtUYfcZqKE3ff%2FFhZRWsKZ0N8CnZaz83%2BulrdRkpDo35ZNXjPwR%2BhaIX7SfzG5iSFTcX4t%2F62BJyT19I0bpk6HHSWpqxDVB0e5PXRp2qqc%2BzDvBUPUIED%2B3wwxf0GVLSxUOboK3v2RkF7c7nnbi1yp8T2NlmWCyczERDhib2fhVzXbgV2g871s%2FB90v8WV7L95zg%2FooFcvmQD8%2F4u7AFp%2FdkGHoHbduVgnvlOfqOM9GTB7NPcUgPS%2FdUcftXAcdI%2FCR0VuEThMUV9xgJOWIQ%2FBKQn6KHj%2FEhzILR1F%2BjsI00NpYMKqY4s0GOqUBgszTSuEYbelwVkqj%2Bg5pW0zX6rYOG%2FR11M0y78Z0%2BKvrrltgbLKW8eQHcZwwJyx5C%2BFyel9Aj0XMLhX96xW7V47%2FfZFHTLDqnmr0KSy95bb8ZKsAKpoharQ8qH%2BsgtG6BKuYYotKKlwH3wcWx0KRUZjUEHG8bBamhOPHr64JzxKiq4uDGCoinJ5LtnIm1CNTIiRGAkP1XkJwqD29DQLwZZJHxuGH&X-Amz-Signature=74d7163baa55d52c8a440b213cf78397841181375fa00aa6982f9d1acfc2a40d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46634D2U7V5%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T231818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJIMEYCIQDw7UI7dXULJRsIeEQchSmMV8H6j35wg3iMCa%2FszsMWCwIhAIhNXYyJdVJngV05cle2i1zekoOIUov4c1OUutNmwmB0KogECOD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzqsuU6HyEmjkUYpqYq3ANYD0KfsGaniKeTkrggsA34g1IdLKkTq3LHmdQkSWkxIvV%2FFZqRoJi%2BXCbbozXJRTbHRdRgehehFIMH5sR2PZQkKYppwNUtAc5ANSFBjajai1MEFdC2ssgzOStNC0vtWUzt%2BxR%2FNljBVFwfR3kL4yuR6YmxL5jhQl5qoB2Mv9oWbNcGUaAny6bmZTwVQBcTKrzHTSIX5sAALNZux3PaJKBjMkpoCJDSB4nRZZQLg1VFq9YG6S%2BZFwNHjEHynlR97Y8HdSndmr3lTaTzlWuYrGsMNDWlr7bSmizlF7JABedJGBA77sbsUPom%2Fpvy1mrCaDeylqpRrLVfZx3aN094jS1pcmqvYPCmgxskq4x3xftmTMnalIOS8r2uicX0BHPdFxrt87L1cdFeq%2Bl3wJkZxp8yIcmIaOSYKG9WQYYawLYbe%2F8owfnQa%2BppZr20BZAjeSbA%2BuFxsa8H08qEunCN2iQ6x5llhVMwWBWhm9Z24L%2FqIYn4qP7Lz55FIDsAumONC%2FjyZsQlK6cpwC1b9orxd4VON9uPh5attb6DSUlLGAtrHwiZ08HWgDq9b0x24XfoePLvVtztebX2n9Za%2FdpsSc1VncfjiaO7zBP0TaWErfHQYkl%2BpcWVeg0oAj8v8DD0mOLNBjqkAVdhGkFCsdwpQuLZYoINWHvwzqNhLMXknvmK0de41Us%2Bi3kjSHv7u4HlwkAidRxx8WwQxvglaS0%2BlXgS0DE61mdqzMfItjfLUqXJKfYkN%2B8VchJYllCvJXDxzc%2F3nChxP9epwN1DTgIThT%2BLpuAL%2BuDHIzQsf4ft5Vt%2FAyqpWtmDXT8%2BG6HmmZNEILKNmEdiDRUk03zvVV%2BpsGmylYpJYIxN0Kct&X-Amz-Signature=6f464afbeddf98647331e91a87216c6a50fa72257e7e6a4b4d272fac68882ec0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HW5XJBC%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T231819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQDD%2FuJbEoKGN5tkWX3yAp%2FY32hbRYVsqQtvfAywAkYesAIgTPoaAZbautGYxTd3g6UJn7cWqNPU2MBGwJSfljtvIegqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJmE1p0r7OfovGdDhCrcA4POiNVTBoDGIGHZedRFxJvgJeaMCIKMxw5eSIxewk8opLXUe1sUTL3jJ127AhM6VUo%2F6YCwDAyJr%2B4qIcGUOQns4gyDZGuCcvwWm7uoIhPCGNR6ygIK7soSc4%2FmnvLXsQt7oTysQR%2BgqYddKQWWRXYxRNpQzlq9newsNq8ArcotMeOWvorbLPZHsI5bjeeE1y%2Fn2vnC%2BIxFwdXp3Bkh59LH5e2ZsERxlz5Okf%2F5PoYj0A4EHVyQapOAY4iAQPsjAun%2FmSDFGEzsilEFeXKH2veB6c94jBUdPn%2Fb5oYMdrNkEO4qNzeOPYgvBGvA%2BVOUdpY3dZrJjPvZANY9P8opUXUNNsoy%2F68iVhEddhJx5uHU9uS98SXHYENoFtn186cZauE8mFyy6JSwAevrz3AhqNbyV5eE%2FzD89ulXAIcm6luo%2FxdZnn2DXtn9%2FrRDnzPVChRs%2B2xDuTxqQEB%2Bp26WJUw%2BfW4593Fc605g4QqxJJa16JSqJNGv8wtTh%2FBfkfIB3iHxxtL8Xf6KE8Adjf%2BmIVASKaIiOcYcbKvXOnpi8HeNJT%2Fhbasix5yqITVORuixX%2F2ygjbQdcXfs1HADZqaNWppjBvsRuW%2B%2FVbrLEupBGzCRA6mWQfBpLx3YIbuMIKY4s0GOqUBa7oYtR76%2F3X5SWAtH1s%2BuQCuiM3NIIPtzzaaryV3dD2kHptEDMqkmmKPC86QYzbHQLfHLM160HDAYgDLN%2FLltJgvnJzfPBtbs6YMsNjTOBE3VmzvYqQ9KnF8NfBYBHCdd2MyMhgII5FpxMnwnMiC6tv7yvMWlfjXzls8wDf5mVOoHoQvE%2B3nr96NY3L1hACXljFKW1LN0CVbo4nivIahm9FJ7jXd&X-Amz-Signature=e83b9c00a26f0c46168e3989cb1346709b649a06ec50a3a35e29f015a7392d74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S67YZU7H%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T231820Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIG07w5%2FNVfRzWSUbWFyRIxLVXuy70Yk1pGdcBf5mq03TAiEAiBFV8xS%2BfszA17mg5uPlZqDps5uOkgmvMRtXw44o5gIqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJE3H6Nz33QXFaxq%2BircAwdtUhSySxLe%2Bykm%2FTxsMSw1wGvhITEufn8LLpXY3tTiNnBsSdGDxk8zEZc8NAYhJkL6z9RurNgOBA189bUFDNc1plkH3KEba9GnWjytCWDQP8766lYI2Aju0oUD12udXu4s5RlTT%2FjzmTAyrlPF9zD3hU4WEOI8UWO4QdDqxVytmRpcDTHDSCp86eXfhedXj4x%2BVOjQVJxmfYqraBONn8gVXCZCWsGCVQGXZVIoZEW594ZIvY8tYqmyQnxVNtQ1mmI81Ut5orzhDk356ICgXlGLt%2FTFoUgK6AdB4g6uVVDhGlBuY%2FKQBv%2FnMK9We73IsuD2eTY2VeH0p%2F2O3SRXABPWnjgex9c8lM%2BBNOfd1bOn33s3DI%2FAfEopx%2BcCBwuKnPuPe%2FknyIK6Qh4ynRmvTsTqcWVbzWB9pGbDTSd87CNd2Eg%2Bi7gnq5AOxqP%2FjMBaqu19m5Kyz1Q%2FZT%2FhvyHmn%2BAY9LHGFo0JzDsJoVpcwd%2FWpHsFDTksO0GluTnp3PWwbyBzCM%2FBjDgGVZCYb%2B8cwXUqQDazuzzYRFXMlO6hNh530i5cFH08RXvJHyCZuOMJnhZVMkSLne2jvsMO%2FX8aHG8ZSEbrnJHGtIJAtuEFMM04qZpeIPmHeQtV9vyoMJ6Z4s0GOqUBKYhWYQ9vapKkFoWMEGh2wEXf1H0WBJ20U17YtCqKRO7PlTOgPBjAGR3D5yVTIJd52IyX0bvh2DdnOKAAGazoAY92o7CGrfDc0arY3zH8aFxIntbas13Gfi3GlFugbjYPTgOUztg7t3zhyTwFeNh1lt6fboz1IdtvYcTq%2FYlEuywHhHGpBVi31t02dWYJgB2IgEJioLpBXclMNjTKVW80X24MGXtn&X-Amz-Signature=e7692f66a99714c9d18bfbe919fb0f65326642c091eb7ab8d1ab88c73b16e178&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S67YZU7H%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T231820Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIG07w5%2FNVfRzWSUbWFyRIxLVXuy70Yk1pGdcBf5mq03TAiEAiBFV8xS%2BfszA17mg5uPlZqDps5uOkgmvMRtXw44o5gIqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJE3H6Nz33QXFaxq%2BircAwdtUhSySxLe%2Bykm%2FTxsMSw1wGvhITEufn8LLpXY3tTiNnBsSdGDxk8zEZc8NAYhJkL6z9RurNgOBA189bUFDNc1plkH3KEba9GnWjytCWDQP8766lYI2Aju0oUD12udXu4s5RlTT%2FjzmTAyrlPF9zD3hU4WEOI8UWO4QdDqxVytmRpcDTHDSCp86eXfhedXj4x%2BVOjQVJxmfYqraBONn8gVXCZCWsGCVQGXZVIoZEW594ZIvY8tYqmyQnxVNtQ1mmI81Ut5orzhDk356ICgXlGLt%2FTFoUgK6AdB4g6uVVDhGlBuY%2FKQBv%2FnMK9We73IsuD2eTY2VeH0p%2F2O3SRXABPWnjgex9c8lM%2BBNOfd1bOn33s3DI%2FAfEopx%2BcCBwuKnPuPe%2FknyIK6Qh4ynRmvTsTqcWVbzWB9pGbDTSd87CNd2Eg%2Bi7gnq5AOxqP%2FjMBaqu19m5Kyz1Q%2FZT%2FhvyHmn%2BAY9LHGFo0JzDsJoVpcwd%2FWpHsFDTksO0GluTnp3PWwbyBzCM%2FBjDgGVZCYb%2B8cwXUqQDazuzzYRFXMlO6hNh530i5cFH08RXvJHyCZuOMJnhZVMkSLne2jvsMO%2FX8aHG8ZSEbrnJHGtIJAtuEFMM04qZpeIPmHeQtV9vyoMJ6Z4s0GOqUBKYhWYQ9vapKkFoWMEGh2wEXf1H0WBJ20U17YtCqKRO7PlTOgPBjAGR3D5yVTIJd52IyX0bvh2DdnOKAAGazoAY92o7CGrfDc0arY3zH8aFxIntbas13Gfi3GlFugbjYPTgOUztg7t3zhyTwFeNh1lt6fboz1IdtvYcTq%2FYlEuywHhHGpBVi31t02dWYJgB2IgEJioLpBXclMNjTKVW80X24MGXtn&X-Amz-Signature=638fa698bdcd6b298b654ef1b89cf551bb3f5733a80b064b8cab079af65040c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665D5NZ5MY%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T231810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJGMEQCIDIoBv%2FSBwk8mzmyTEaCnNLpLRF3mAyze5fAyNBG5yBaAiB7kIxd%2FA1q1cXyyg%2BNsg4933XxKrGq72%2Bww9kxNHQU9CqIBAjg%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRPe8Koth3BL5LU0CKtwDR39dm%2FJCvpzspED5BkcpDOhtDw7Jf3QXlg5M6WDgkMar8RPNhuCH968OlOWRAY0qJyruZ1KmqUL5Z4%2BHN0G6G7Ztpmp8I51DNInbnM%2FHQmHDst4wB9NrL8g6t7Iq7VbG9MkZxlkXKUM1tnyohLwSWLdK8gli%2FKuNN03Vwx4kEnaDXJqawn6WEtUtreDF0JHnudR1274429HhIn%2Bnf4pwLG7DlZWgz5moH27gYlr5HkpCLgQ58zXXVreyj60rMThTxAQmtUIhrlIEogLmMp3vCOA0XAve4JFp7rDVgWt86NdNV2nsRZ6GTfhDyHOTjeYj%2By3wTD6JJ1C8O%2FIDvIxOZVDO2w6JxDJDZbCUDdXhlmMOWeV%2B1G0t2lP0bevyE4gzCoVs%2B9dGDSV5o9I8qndEcqm%2F6JJEzYKfpEb0uV4KMWPxEsLCxCkHYCYE4PU7rUULtQUapCLm1ze2WhRRMeMP9PbqPJEPjRPQZpo0TiZ1x4vWY5EXGuulxb8NM53w5iw4mIvEW%2BhRiS8MncE1IEopDw2q0osh1AYi2fMCLyvN5gpElIk6p8bGleyJVyV7LJuBi6zzy1vOSOsVF6l9QeV5w%2BR%2Fu7cXAuR%2FsTRUTIqiQUbEziFdFy31%2BP5Dj4cw3JjizQY6pgELcW9df8IO65UwqUsBrt2LwNee6D8yvaRyHbus5BLWZv3W62%2BIF6%2B4ur5K%2BN%2BYxp3d7fLnTKd3iikGhBpfkcN00jOebP%2BiFkr%2Fg3Ut1PdSKcPJA36rp2JzkLKWhTv%2F7dn4dlztLvqb2WNzl9f2oDtSjwnkFoieowf4xGr8%2FoNDgo0OsEIwHnw%2BwRPkCDlqU2DomEC6miLvIFRnlqzQfHAoAf5%2B3SeH&X-Amz-Signature=cee11ae1f3a7f929e2d42e31716a6638a83cff9de3cd29ea29d373a50bf62490&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WOXXNTJ%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T231821Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJIMEYCIQC6gB9Dx%2FDhyMpCwK5uaLHbyh0ZR8h2%2Bs6FGX8Q2kv6AAIhALbIVxHrS63QgQcexwgCVkjVpPNaGf8qAHV7vNI4GENjKogECOD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxUYx1ZZCSeSVBVqdgq3AOuaBjc89qPNw85bvJCTzN%2B5EJYWuWg3S1Drh1oor8UsWLz8bKTXWbi1ZFVWvV%2B4UbtRl01XbHb2E7nmxWyZMF%2F2m97ydEhc%2B9iyvOU7vXltdsD7i%2BVCeBcKBraNExCt1j3ulZlDyD6rgf4iMAXvO4TDaJDP%2Bs0gTiT8ojW1d7vPlwYqZOyhCeCj8Vg5ujmmFd1rgv7aVoQrt3ikqS7Q%2FEyo6fOvCy3N6NIxLyc8FiAayw7o%2FAqy5ywjAkE1QTAyBfBKoDWZgGm8%2ByrFZ8BgL3MWBvfid8ZiTpZZO%2BLX72vfuryhlA5tH8PM0rMPyt435ugTILy5uj7YVzquGmqlB6xvg3hF8TbtJQAYTVQdYyUM4kBIVRWfTeGkWNNzG2Ap0ZgT9jZgLRle96ESAd6rW0aa4jXoPYvzp5sYELttBZ7nVk%2Fskew9y66k7jLPqFWFpl2TPZmKQ%2FpG%2FQADBlG8%2F4FiRTYeiubwMwkFfMSTIAg1Fwx6sTFJ%2B4rVqHONCSdSyfFUTWCT6Hd9I76SwOVuMqwLclA%2Fh8P9eVndhTVHfUqltpuv%2BTpyqU9%2FVzgOoqoBKT8%2FwIlAhOYKbUPF%2BVW10KSOdRpK8kFstZhmaN%2B7WZnjrCRPY64mEJn0RGgVjCdmeLNBjqkAROpPRTSXJVGpVJXojM3J%2BlVRncpPdt0Rklk0hMTlU6Qpigt1bblWXWgt6e7DriLpKI2VJ1oUdfm7oLxf%2BRRe7uUTKj2BGbgrhIEnHQJGp0dTjo7ORoo7le4XgIhvmm4FclM6PKhJsbZSwMinQhmwDvAFgPsubaNqRJN59%2BbibWl5G9yxcTwZzIAZLV1TcsF8iZ7FRT0hB1V%2BCEWZ8RdqjVQwd%2F9&X-Amz-Signature=3eb27b06310720e24dec4dbd0c32691abd08db4cf4459eaaf44525f714132833&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WOXXNTJ%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T231821Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJIMEYCIQC6gB9Dx%2FDhyMpCwK5uaLHbyh0ZR8h2%2Bs6FGX8Q2kv6AAIhALbIVxHrS63QgQcexwgCVkjVpPNaGf8qAHV7vNI4GENjKogECOD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxUYx1ZZCSeSVBVqdgq3AOuaBjc89qPNw85bvJCTzN%2B5EJYWuWg3S1Drh1oor8UsWLz8bKTXWbi1ZFVWvV%2B4UbtRl01XbHb2E7nmxWyZMF%2F2m97ydEhc%2B9iyvOU7vXltdsD7i%2BVCeBcKBraNExCt1j3ulZlDyD6rgf4iMAXvO4TDaJDP%2Bs0gTiT8ojW1d7vPlwYqZOyhCeCj8Vg5ujmmFd1rgv7aVoQrt3ikqS7Q%2FEyo6fOvCy3N6NIxLyc8FiAayw7o%2FAqy5ywjAkE1QTAyBfBKoDWZgGm8%2ByrFZ8BgL3MWBvfid8ZiTpZZO%2BLX72vfuryhlA5tH8PM0rMPyt435ugTILy5uj7YVzquGmqlB6xvg3hF8TbtJQAYTVQdYyUM4kBIVRWfTeGkWNNzG2Ap0ZgT9jZgLRle96ESAd6rW0aa4jXoPYvzp5sYELttBZ7nVk%2Fskew9y66k7jLPqFWFpl2TPZmKQ%2FpG%2FQADBlG8%2F4FiRTYeiubwMwkFfMSTIAg1Fwx6sTFJ%2B4rVqHONCSdSyfFUTWCT6Hd9I76SwOVuMqwLclA%2Fh8P9eVndhTVHfUqltpuv%2BTpyqU9%2FVzgOoqoBKT8%2FwIlAhOYKbUPF%2BVW10KSOdRpK8kFstZhmaN%2B7WZnjrCRPY64mEJn0RGgVjCdmeLNBjqkAROpPRTSXJVGpVJXojM3J%2BlVRncpPdt0Rklk0hMTlU6Qpigt1bblWXWgt6e7DriLpKI2VJ1oUdfm7oLxf%2BRRe7uUTKj2BGbgrhIEnHQJGp0dTjo7ORoo7le4XgIhvmm4FclM6PKhJsbZSwMinQhmwDvAFgPsubaNqRJN59%2BbibWl5G9yxcTwZzIAZLV1TcsF8iZ7FRT0hB1V%2BCEWZ8RdqjVQwd%2F9&X-Amz-Signature=3eb27b06310720e24dec4dbd0c32691abd08db4cf4459eaaf44525f714132833&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6YJVQTK%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T231821Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIGHTkBV%2FRLOZSUiyIArNIIc1Jk2q1%2F%2F2%2BNNJ%2FNPKhmXeAiEA8FfC4Ulsqe%2ByhSEvlPsB4ytgDm8nrxg%2FxN7i6PYmQg8qiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDWpQTxhTpub9dWZEircAyGSv%2B7XiCXW33Xq9vx%2BuAfcQE5iMkxyaXf2C0DlKZkd2J6rSM3f5ihqQ70KW1NrTYA9T0pg9YiROUVrvQ50LRek4fpqq6%2Beo0y5DdN0DEiZfF13F4arj9rFy3yMO8qVC%2FGYVNnnc5zn0leQemwfs%2BnLzY1xoEG4h5fW9J62BV48WN%2FDjJeC7dSXJuTD4%2BCNYuvFTssHbPDVz2BTpWaOyjyB9EkDTqWZ1W%2FUtjTqk9E5hivDuQ5%2FYdNzdS2ln8jUb2TvR97PVz8OBoGW%2BjfwpfD0ZR8S%2BE%2BwgiNHYlHn4lDXkHNL7dSnYnZ45QNfYCjD8SQHu2YgTWu6awoKPynl4D1tfMoG1JWcioNttEB5EDiL%2Boo2z0GGDmdXOzKqpj4ApoYZ8TjY5Ry9ibqjdjmaQ2tqxvRUxk9puBrpW1iovMW0th5LGfOM%2FWeB%2FfcbG4kw%2FN%2BP%2BSy%2FAQvlBjjv9HDIrRwm%2FQnG7%2Fh176OPxBGf%2FAkvhwK%2BeVe%2Bcoe9dMZhPsfpa3MS92J4mgjTvEPJN5AzIryUlFmE7UU631AWMm7fa5GXusffqrwFd4zGNxKXtD8TUHl4f1uOSDrVEcHx%2Bf9CBitqAutRqdNTHxwKjeVinR%2BRIAmjLyxkyClWG0GAMLyX4s0GOqUBUz5l2ABk%2BkXp4N61M1gtDHefBoOdl2wSpqZRR5abj80cz49q4Le3%2F3Gs%2FXggxfHv29ikBaJp6eVwePHbDuOLlvu2WXMl5bo1T9bHGIQXu%2FCJ2yHoqzlla4pM5WNd6xGS4HauZSrFAuvCE8C5yK8PUAe%2FGH%2BpbQe%2BUpJxUUKAhBwsWKedb3PfQ5kTdKrg4%2FPvgOKo03ItxxIxZbNS9p0rAZdp6sMP&X-Amz-Signature=a0fe3bedeeb5109034dfa5c74d96cb25719c5edfff351d6ebed5b553c3c8b07f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

