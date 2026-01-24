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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RVOYEY4%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T200059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQCwsvPSUhUuKPMRQFAYJMvPYhlfbEvs9osSHDiz6jGZ3wIhALp%2FdPDIhGd4xv%2BWmu7yhAzcJaAFFGvfSrS2MEttlRfvKv8DCBUQABoMNjM3NDIzMTgzODA1Igx36odI9byWc4Cygs0q3AMsrA%2FV53SASw640XvyDuKClgXqdBAMvr5uXM5mTwhD%2F%2B2tbp9uFdwZriRg8fvQs25i9CwqwZyZEOaR97B2lj8S4EJPUpcYR1zVLZ%2BuZlXUxXRpT6jJBipOFJsc7rUpLj2avlD3QuRYhZkLIfmGRPD01WA6b7Ak18UuFW7fdzZgJqi1zE55S57Lu9XXjrKZg8NBauKufECxuhyi284vxOuw7UNuTRyryVc%2BrYGzhNVU%2B%2Fk4sACXtlWvopZWCZL9a8cGbDuFcZA6M0Ss1To%2B7ftNjHRNl3K8O7hJOxbjcGWHwryNbIf9o0UEvHoL7bwYgRelZ4uDz2Jn7ysjMk6UnhqUxwOZlHj7Lc977x4kINB4DM3Pr8UrdUkDlBRsgJbCZbrsdT%2F7GDi99JztelsxskoXDYzb4hZiBngR43OzzWfE8lz3miBbaZvirdKiji%2BlLc%2BXqPIZVxtn8n42YmxqujUCaublTiyf%2FPH%2BaSWIJAMPdBprw%2FQ9ZU0a%2F2DUxAtfIrmTJ0zh%2BET2ulwC7LCP%2BimDrbCnRaKIzFKIQjBZAuTLyworueg2UGmi0GErgvXCyPtjUqbu%2BR9IH3qiVeEvinmVdGpJqSYmEWItfrUn%2B0ic3Ddv%2B7l6kP%2BzyoJLljDRwNTLBjqkAReir%2FQ0UOkwZOAKqCgpKiVAJGUVfSlYCohX%2BSwWbxObGtlvcEKPyrWa57tP90v%2B9rtKzS6UYXHMW90%2Bq4woLqOXUoBvY5gfN3ifp2kewo1AWZydCfSK3KvaG2hEXXFhULD3tfktx8z9IKAtimBm5MfKHwO5XdJRNAJnv2mT3RbDt43QH2fLLKlmYmHvy2Vte8kEOFjfNvUzCE%2Bv2GHFZLRyfXpy&X-Amz-Signature=cb089f50dca7f26964e0c75c78ad9dafc66e80fc332dfc1297b9524f5853ec78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RVOYEY4%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T200059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQCwsvPSUhUuKPMRQFAYJMvPYhlfbEvs9osSHDiz6jGZ3wIhALp%2FdPDIhGd4xv%2BWmu7yhAzcJaAFFGvfSrS2MEttlRfvKv8DCBUQABoMNjM3NDIzMTgzODA1Igx36odI9byWc4Cygs0q3AMsrA%2FV53SASw640XvyDuKClgXqdBAMvr5uXM5mTwhD%2F%2B2tbp9uFdwZriRg8fvQs25i9CwqwZyZEOaR97B2lj8S4EJPUpcYR1zVLZ%2BuZlXUxXRpT6jJBipOFJsc7rUpLj2avlD3QuRYhZkLIfmGRPD01WA6b7Ak18UuFW7fdzZgJqi1zE55S57Lu9XXjrKZg8NBauKufECxuhyi284vxOuw7UNuTRyryVc%2BrYGzhNVU%2B%2Fk4sACXtlWvopZWCZL9a8cGbDuFcZA6M0Ss1To%2B7ftNjHRNl3K8O7hJOxbjcGWHwryNbIf9o0UEvHoL7bwYgRelZ4uDz2Jn7ysjMk6UnhqUxwOZlHj7Lc977x4kINB4DM3Pr8UrdUkDlBRsgJbCZbrsdT%2F7GDi99JztelsxskoXDYzb4hZiBngR43OzzWfE8lz3miBbaZvirdKiji%2BlLc%2BXqPIZVxtn8n42YmxqujUCaublTiyf%2FPH%2BaSWIJAMPdBprw%2FQ9ZU0a%2F2DUxAtfIrmTJ0zh%2BET2ulwC7LCP%2BimDrbCnRaKIzFKIQjBZAuTLyworueg2UGmi0GErgvXCyPtjUqbu%2BR9IH3qiVeEvinmVdGpJqSYmEWItfrUn%2B0ic3Ddv%2B7l6kP%2BzyoJLljDRwNTLBjqkAReir%2FQ0UOkwZOAKqCgpKiVAJGUVfSlYCohX%2BSwWbxObGtlvcEKPyrWa57tP90v%2B9rtKzS6UYXHMW90%2Bq4woLqOXUoBvY5gfN3ifp2kewo1AWZydCfSK3KvaG2hEXXFhULD3tfktx8z9IKAtimBm5MfKHwO5XdJRNAJnv2mT3RbDt43QH2fLLKlmYmHvy2Vte8kEOFjfNvUzCE%2Bv2GHFZLRyfXpy&X-Amz-Signature=cb089f50dca7f26964e0c75c78ad9dafc66e80fc332dfc1297b9524f5853ec78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664H26S56U%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T200059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIE8Ae0ea%2BRoupQdaAFFRux68v6ONtPinlInQRdZy0DmPAiAhTp1x5JpvBPcD9e0hS3J2jjlLQ9iHVJ32cLqhcPIdSir%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMI%2FYmktTb6FlN4Sr8KtwDLmQAiYec9OvG6lGSY%2B8rE0J80%2FGAp%2BM8Hs96MU0EptSkmq8z6v2UQ03rqT2AlsUqSydZqgLQZi2CZBLfyuUKS8laydgQmbiL9QNRE%2Fxof3fllpews3BnFapyIrewglU6w%2FmAY3goZWslG2VnAspTqsGRVpIf89FA6CcuIsdfhfOEpSJxwpJUEuUmW7UK8WUGqJSXKaxPhGvnd0dTqjSSPuH%2BeRLSiJifab9uyKp%2Fz1s9qWSGPwQiHiYOE7mLdezaC%2F8YkTAxZT9WOMSbKSRCjK%2ByM%2FG6paDtnG0NRxfSalaU4737cDLt8iUuQPCF57xvV91rM6l5dGXhYZHWSkpnUwt7lojq4%2B%2B%2FPNBXKtgE1sp2UfUNvqO3qrc4NCgZOOj96Q1oDEwHPrURWhGafbuHUlA0DGPT0ih%2FuuIuW59rvey250xxkGg9Pobzi6ohClFQMqo2M%2FMhPaHnp4s0OgskMlYdCR5fSEROj4MHHQXtzppuI3V8jVRhmNpt%2BlhldxNwLrt9iYvH%2Fc3tBZ0w2pGl3Kotv3arz5CLlzsxD2lurPK%2FIqe9dxS4az43b2S%2F3vxugHXKX078wiQb9gdijiEq6OWr1G%2FuURlOQTKAYWJceoI98gfBYmtzP8ojHFYwqcHUywY6pgGadj5GadXn6F5epGln9w2vhzfu2unk0GeQ9vOIxEG1iQIGrosqdX5xlMOaorEydJBc4B4eDspl1NkV1f5%2FUoDZtkNaq1Qfbb%2BjSr%2BOqU6e7Hy72ohEu4VRqmxFemPiOr0wGYEvfKP4oT9HWP2TmYm%2F2dmKAPQRp9C7T7pbmlNBqBhV%2BqEQsky8X9wzn96lheVPvtL%2Fx5hrN8ubeCNDOMA%2Bc%2B1dvNvy&X-Amz-Signature=36bf8f300e1e379d02b3da7fa450dc916f30ff4c500f8a9ced746df4cdd3a10c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BT6JCJT%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T200102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCICOWNyNItcJrOJS0RRJrpwwLpPGzy%2BRl5D8QpWjVDEdRAiBUm8msXXA0K1PVV9iMKICfHTG0Szd%2B7hs9dhmqelt3xSr%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMdZwadBxibKjHOYoaKtwDtP1qFImChdYBGeNgQhTky5fIZHt69zC5p1FhR5%2BEeMOcjZDDziyIqPsNwCQ7a%2BYjZwMvp7hwY%2BAKo23sdvR7zKft%2BqUPmVLmB2anp4AYYHtr3hNAOrelJ8%2Fs%2BmQDg4wi1YVSLckYRKh4ghOPIbQE1QJ27kQlzsv5mK7Zq%2FzFwyQus2FbrHTYa11JxzZPURsBufBbvk18AisRTC2bTtfm5phD%2BFYzpnXE7CMQEJDl1lZ87ZAEBCGkABSm7kyUmQa0r4OKM0%2FRrvC4%2B7hwz7PT3iywFB8xmFJ3wl%2FVuEEQHUVdNVJZwICxtJXjpiIsQVGo7cx%2BhJhHmmlMufxfwFIg9vMh92WLaxjTxKjooz96FuKLa3sxhjopTkhoUveFIg4bdkbg%2F8WHPqUIKbJP25Y4Lgi3sD4p%2Be4w%2FNYI02XbtKfJGOW0Sr7JroZcZE29%2F5Q0iUioOdAc9X8LcMbY2Y%2B0%2B2gPkMp47fZi0kCcWAc%2BcbHIw1DsjwyykdG%2Bxr9wgcwEDqvGmrnTEujoUTo8ZZnaKntOTKw2Khcl1mEYIxygi4ZBG3REDiWsLfxIujRfUuW6MS5HRk61rC3z83zcv45HzbnR4FSA2EW%2FWMtngp%2BZigobo%2FNanBwllgcMhVsw18DUywY6pgGUhaNJ54VFKG0HuQcJlHjNyYZaS3QUdL0CUo9FPSUHf%2FJ5sMoaNBv7m8vvYyV51HlvpvQX2%2FBgWDjeikwSnHmtsOMrvdZ3amh%2BxBMI8XGH5bt2JGneml2IeLHxh%2BlniTLNkQefB8gb%2F3yyDUZQKtYJ2d3UOuKRvN1e9lo5gXCRcerdrF6BBOf7h2cibTGclqnYnJttqI1I0Pnlk1RjLh1XWt7I%2FSS8&X-Amz-Signature=0c5cbe43207b1a2f1ca79909f2902ffdaa736d96b2ec28d69324f842903be1b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BT6JCJT%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T200102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCICOWNyNItcJrOJS0RRJrpwwLpPGzy%2BRl5D8QpWjVDEdRAiBUm8msXXA0K1PVV9iMKICfHTG0Szd%2B7hs9dhmqelt3xSr%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMdZwadBxibKjHOYoaKtwDtP1qFImChdYBGeNgQhTky5fIZHt69zC5p1FhR5%2BEeMOcjZDDziyIqPsNwCQ7a%2BYjZwMvp7hwY%2BAKo23sdvR7zKft%2BqUPmVLmB2anp4AYYHtr3hNAOrelJ8%2Fs%2BmQDg4wi1YVSLckYRKh4ghOPIbQE1QJ27kQlzsv5mK7Zq%2FzFwyQus2FbrHTYa11JxzZPURsBufBbvk18AisRTC2bTtfm5phD%2BFYzpnXE7CMQEJDl1lZ87ZAEBCGkABSm7kyUmQa0r4OKM0%2FRrvC4%2B7hwz7PT3iywFB8xmFJ3wl%2FVuEEQHUVdNVJZwICxtJXjpiIsQVGo7cx%2BhJhHmmlMufxfwFIg9vMh92WLaxjTxKjooz96FuKLa3sxhjopTkhoUveFIg4bdkbg%2F8WHPqUIKbJP25Y4Lgi3sD4p%2Be4w%2FNYI02XbtKfJGOW0Sr7JroZcZE29%2F5Q0iUioOdAc9X8LcMbY2Y%2B0%2B2gPkMp47fZi0kCcWAc%2BcbHIw1DsjwyykdG%2Bxr9wgcwEDqvGmrnTEujoUTo8ZZnaKntOTKw2Khcl1mEYIxygi4ZBG3REDiWsLfxIujRfUuW6MS5HRk61rC3z83zcv45HzbnR4FSA2EW%2FWMtngp%2BZigobo%2FNanBwllgcMhVsw18DUywY6pgGUhaNJ54VFKG0HuQcJlHjNyYZaS3QUdL0CUo9FPSUHf%2FJ5sMoaNBv7m8vvYyV51HlvpvQX2%2FBgWDjeikwSnHmtsOMrvdZ3amh%2BxBMI8XGH5bt2JGneml2IeLHxh%2BlniTLNkQefB8gb%2F3yyDUZQKtYJ2d3UOuKRvN1e9lo5gXCRcerdrF6BBOf7h2cibTGclqnYnJttqI1I0Pnlk1RjLh1XWt7I%2FSS8&X-Amz-Signature=9f36b4ec2464ed3bb6e95dbe7a7d4ce528d0933fd8421b0e29db86be8ebc8b7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UOIP3PIT%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T200103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQDB5bYNHI7U295xRNRBWZzxHO61%2F4CHB2MSbiuhNaxuZAIgZfR2jhqOExaSwDupdJ5tIsJNdT%2F8xQDZ9di%2BetBCgcAq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDFmEjUZfIIZIJzVARSrcA0r6iY00U6T8ySB8sruBxvALSgYUZhdIFtUCe5GULi%2FCIJosjUtkvli7uRELJkLzfgA0Ji%2BDZcNQehQzShIDo09QLCyzVQGG252FxTpWIeDg1wfVBO92L9zlv%2FMdADgGs8Oe6C%2F49ehctEJqkKMc9NTy4H%2FTEY6%2FzuufSX0MwkNFCG9Ci%2BvhAUFA6gyt2x18K2JkSjpaHR4Fd8OvHwWU9tfeNfA35U2u%2BfNkPYiVwOvFL%2BNQwx6bbRsNDBjqmRZpUzNSyRuEEF%2FaBNWACjb0Hz8v1VazGZovIRzuYofeezUDdE%2FQp6ZuUedLExtccku5IpNDnGGc88MUqfpCrp9vmvt3rEVdJSp8VOXrUBeIdrf05ErdYyBV1b%2FOuzCyyctqStekh%2Bi1WT1eoVjYdw1WW3kGfaPwlV8Ye0RZG5l0gz1Y9lS2KgY0QfOv%2BhUFV%2B5Wk4LQ9bNvJTe%2Bsgb8YK3lTFUFuAV5XH7xIB%2FVMVBpXhw%2FCaI38KG0InDiMNJbP9kiSCSAww9RyY8t911j4e6H7XZIbynqsmHiYL8EItNzlrR4WFxPtiekNC4siisM%2Bzqhi2Gdt0d8Lo9zWfLPBxa5S2Znjb%2BrdlPNEeFxYzCirfcXjiA7xPvjGEWDnVK%2FMKLB1MsGOqUBB6nuhzrkRqbOPVQFjp3HaCmb3otUCU8lEa2MCGJuSG%2BSvGOiDalt9aQX%2FBsZU9Ww2dpoUoQU49Ni1hIGqNVpWymlzgOKtzl1jMC2GeuQzNpAHGJbPnzcFusLWRATsc%2B8VmCDQlEFitoArUvMaP4Pp%2BwbMWVfFTPJhaYNvtTZv4jUF5I2DvATti04TAZ0C2k1HtKrJsOB%2F%2FXaCJhdhh%2BvN9c1mz2F&X-Amz-Signature=a109822b57798794ca237d16404625cff0ac2978b7cf7893e54b6b97dbfc446f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQKJYVG7%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T200103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQChMneZ8LCZHwlJ5EzzXLB0Hjf87NM5jH%2FwHEezR8Wz3wIhAMbHKdkYJctiaDwXMTX%2FjX10zDU2yrjAVBPBCzlloXGlKv8DCBUQABoMNjM3NDIzMTgzODA1IgwYlCvbiF56tOcDBFwq3AMpJWLsnNfbFRaIB2AaY8K4jj%2F7PgM9pv89YmXkrsls9zGp0jnacQH5GDPhKdsqI6SvUMGk4qrsWwNhcVBOIcli%2Br9lXPayv5xUEicpeN86WhsJ40I3IFBAfPL73IG0ZFPZOz2VGYl8pXuWVfXlAaogfcJFDbfwWBLoNGi2ExlEbYL5721pKgibXJk4jlS8Yy0UO4B5MrKExCkmwSAg26hCqnRr7AD8CwIHokOtX77TqGqvKRO1igfC7hl%2BY%2BsRUJPmioYROg4e74PndtKyFeQD4a1cCuQDQ0nBay%2B0lcCQygnrrE8lOVyL8OrHoAcHmD26DZAoUYC91lVwuzT%2F6Q%2BbRu%2B9l0Hhnm1w2wquozpR31pUJl5fOoCkc5RrpMb9whveaIp08pKFsiV6EnkaG%2BmrszfHbu7xUeiZKJLWDCw1pwba2U1lOyIW%2FaMbaRSN6dEDCAUQJqtpt%2Bs8GJsGW1mHYx8ii9baoqu3v6Px8aCv%2FXBE7YIulOiFJzw52%2FTUoq1DpYNUhyZHpF860U06mGWwyqnaJzG8znhC2uF67UTEvEmb3Ojw1oTR2NBf27h4RM5sxRujWxZ3kL3eSpNxvP17pewm6dpTsjFZRnoijpjHYM%2FtX7Ep3Pk%2Fe%2FaF5DDBwNTLBjqkAWfLcSkfg7Zjvmjspjg39KpE8z1V4dzHpr%2Bt%2FbzuQGShYAjuc%2F7KTh7Fz2pV8VZ00kVVzbYQdintX2TM0bPJlgQ6PwhiOkaDCB%2F6DafgWbmBLzmVKJz2h6NRlcopKkNT9JddrgvXvcJSRWHyZWkedjwNXa34nWoQWPWxA5ZxX7K%2FaR74QWH2QAmA5y154FaaVf%2Flq1%2BBu0%2Fb7Lsps6CLKx3whN8g&X-Amz-Signature=08e96eb1d0073b17fef43b126d33526a1fb58a888b476111d20a92c8740a03bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TG37YO2X%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T200104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCID%2FO02koajJkFbSTvvP8B%2FuxrHiS6PGwhwE5orZ5NAtsAiEAlC2Uq4%2BVvGK8kT1kRuzDJpIECT295F2plMWvtiU6qWoq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDCiKgRNgwiF5z5hGfSrcAypLjfpFaBcOguE8udOUvKmClOuhJqzPawcELlQ5yU9ytoyf7rzCVMa9LEoW%2FSgSMi9XasBgSmabb7J4gnKS%2FXy%2FqsygnbWGDBoQmbHgE9pF8fNoAVLjfGT3qK3PwNCAhZ%2F8BIKg7tsE%2BdygFNeNVjOh2npAr%2Bo8koKd1VHnIMSN90nlUMitTJjuAJk4LqRBRqFsqustM655RpdI1DlYY7cxgwMfRiCn4DdZwyzlmVMgoXtpTaPf78S3PbW6PBnHdaTJcvRMnx6drFGvvrypfp%2FtSUAcmWMYZbLeFWA4yicM1qxBPcRD%2Fo8Tf6LXTziMxcDS18yGZDI0ZLqh3p6%2B5%2B4VXFTjRXk3YybZ2MvHEaQXMwBBYZsRtseqT91uPGmmx84ZS6RelFGFFePTMHHd9D1orvfrH6N%2Bz%2BAy2os5%2B%2BHpwn9bUc%2Bjtc%2FAj0QwyZIeh67fzbjF38n6lCJeGSO2IhXvYOfVdFsV1wf%2BfqHN%2FgCEL%2BfOuLIg1TI5N1tYDhojgstsnZ%2BnYNdcqkh6CLxnt%2Fh2bfpILu8TBmAr16jwZpAQO2IyLT45f1klDvBPZ3s3wPAJY4HBqFhQhJJigtq6QvgzanpcmDt91NADi7QiL2Cn%2BhIogHy2S5HLP%2BUdMMnA1MsGOqUBQ8paN4xe6BwI08lnV0WusPZeTs9xbVDg5gnQFnS5e6NBiZfhy64OF2NywOuWM%2Bo264J7bDPasUtRGnbKxM%2BxoQu%2BFHwRz1GDgzjY13xKTyKDLwJ5VzB3NNwUFH3AAmm4%2FV%2FVED7ON38cO843dRbMDsZnhxABa9hpHOmdjIHkmW0QJZdmsTAXy1Dok46DPmW%2Bymqt5R0h%2BrTP3x%2FaY9g6lUBHavF0&X-Amz-Signature=1734ee7e30a9a26cc8eeb52d71abf3449aab68402b2079c642ef5ba9a4385705&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQKJYVG7%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T200104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQChMneZ8LCZHwlJ5EzzXLB0Hjf87NM5jH%2FwHEezR8Wz3wIhAMbHKdkYJctiaDwXMTX%2FjX10zDU2yrjAVBPBCzlloXGlKv8DCBUQABoMNjM3NDIzMTgzODA1IgwYlCvbiF56tOcDBFwq3AMpJWLsnNfbFRaIB2AaY8K4jj%2F7PgM9pv89YmXkrsls9zGp0jnacQH5GDPhKdsqI6SvUMGk4qrsWwNhcVBOIcli%2Br9lXPayv5xUEicpeN86WhsJ40I3IFBAfPL73IG0ZFPZOz2VGYl8pXuWVfXlAaogfcJFDbfwWBLoNGi2ExlEbYL5721pKgibXJk4jlS8Yy0UO4B5MrKExCkmwSAg26hCqnRr7AD8CwIHokOtX77TqGqvKRO1igfC7hl%2BY%2BsRUJPmioYROg4e74PndtKyFeQD4a1cCuQDQ0nBay%2B0lcCQygnrrE8lOVyL8OrHoAcHmD26DZAoUYC91lVwuzT%2F6Q%2BbRu%2B9l0Hhnm1w2wquozpR31pUJl5fOoCkc5RrpMb9whveaIp08pKFsiV6EnkaG%2BmrszfHbu7xUeiZKJLWDCw1pwba2U1lOyIW%2FaMbaRSN6dEDCAUQJqtpt%2Bs8GJsGW1mHYx8ii9baoqu3v6Px8aCv%2FXBE7YIulOiFJzw52%2FTUoq1DpYNUhyZHpF860U06mGWwyqnaJzG8znhC2uF67UTEvEmb3Ojw1oTR2NBf27h4RM5sxRujWxZ3kL3eSpNxvP17pewm6dpTsjFZRnoijpjHYM%2FtX7Ep3Pk%2Fe%2FaF5DDBwNTLBjqkAWfLcSkfg7Zjvmjspjg39KpE8z1V4dzHpr%2Bt%2FbzuQGShYAjuc%2F7KTh7Fz2pV8VZ00kVVzbYQdintX2TM0bPJlgQ6PwhiOkaDCB%2F6DafgWbmBLzmVKJz2h6NRlcopKkNT9JddrgvXvcJSRWHyZWkedjwNXa34nWoQWPWxA5ZxX7K%2FaR74QWH2QAmA5y154FaaVf%2Flq1%2BBu0%2Fb7Lsps6CLKx3whN8g&X-Amz-Signature=f85334f3c4ebde6b0d76c0250c338aa82b646b33610a57dcab92f62001878abf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQKJYVG7%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T200104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQChMneZ8LCZHwlJ5EzzXLB0Hjf87NM5jH%2FwHEezR8Wz3wIhAMbHKdkYJctiaDwXMTX%2FjX10zDU2yrjAVBPBCzlloXGlKv8DCBUQABoMNjM3NDIzMTgzODA1IgwYlCvbiF56tOcDBFwq3AMpJWLsnNfbFRaIB2AaY8K4jj%2F7PgM9pv89YmXkrsls9zGp0jnacQH5GDPhKdsqI6SvUMGk4qrsWwNhcVBOIcli%2Br9lXPayv5xUEicpeN86WhsJ40I3IFBAfPL73IG0ZFPZOz2VGYl8pXuWVfXlAaogfcJFDbfwWBLoNGi2ExlEbYL5721pKgibXJk4jlS8Yy0UO4B5MrKExCkmwSAg26hCqnRr7AD8CwIHokOtX77TqGqvKRO1igfC7hl%2BY%2BsRUJPmioYROg4e74PndtKyFeQD4a1cCuQDQ0nBay%2B0lcCQygnrrE8lOVyL8OrHoAcHmD26DZAoUYC91lVwuzT%2F6Q%2BbRu%2B9l0Hhnm1w2wquozpR31pUJl5fOoCkc5RrpMb9whveaIp08pKFsiV6EnkaG%2BmrszfHbu7xUeiZKJLWDCw1pwba2U1lOyIW%2FaMbaRSN6dEDCAUQJqtpt%2Bs8GJsGW1mHYx8ii9baoqu3v6Px8aCv%2FXBE7YIulOiFJzw52%2FTUoq1DpYNUhyZHpF860U06mGWwyqnaJzG8znhC2uF67UTEvEmb3Ojw1oTR2NBf27h4RM5sxRujWxZ3kL3eSpNxvP17pewm6dpTsjFZRnoijpjHYM%2FtX7Ep3Pk%2Fe%2FaF5DDBwNTLBjqkAWfLcSkfg7Zjvmjspjg39KpE8z1V4dzHpr%2Bt%2FbzuQGShYAjuc%2F7KTh7Fz2pV8VZ00kVVzbYQdintX2TM0bPJlgQ6PwhiOkaDCB%2F6DafgWbmBLzmVKJz2h6NRlcopKkNT9JddrgvXvcJSRWHyZWkedjwNXa34nWoQWPWxA5ZxX7K%2FaR74QWH2QAmA5y154FaaVf%2Flq1%2BBu0%2Fb7Lsps6CLKx3whN8g&X-Amz-Signature=885772ae358babdab5b6fdab568d382971632a8abc71f3e18735e631b7096214&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667AJSMFM6%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T200053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIF0G6Drg9NZl1s1X%2BjuMHIxPsJyJE1L0kXaDWByd%2BV%2BDAiEA2koM7uholVVpePgcac%2FplOXdDiH8a%2B999fAelpSl0kYq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDM39g0yLlHjSJzGNHyrcAyVSVj42j0eI%2B4uD3y6acElux4qTG0wPvMyX4QguevLbr9X57%2BMR02eELx%2BYKMgrvgADnGL4g5RRMT7NQZOjjjS%2F3UyEtse%2Fz05WOpfeus0HZxWQiA2xlEN%2BX3QcnGRYYFzJd2dSk0wofVVjSrQ0fstbe6pylBJqB9V4Kzh8Whki7yr4tZi7smfysTl%2BBExYJ5h2b5lYTyVm%2Fm2LhA3fSU0O%2BPl6%2FS4FPVmHMZci7ROphTW7ubuNIf%2By779rgFEtBrRrcXHJoKxAu9d98DkFMhw0ikvHrUxpL%2F6FflphnyzM7%2FUTv4LXBfsaHtX7s3njN%2FVQaTFiHm18zbU3fK87OKFxHgBmr%2Fh1cSdMDq%2BDxlyXHKDf3sCJNljrGyy2DEpZOJIIWdMoiF0N5uR%2BNp6%2BUlm4B9s2Segn838cvV6zzKmeVBBrejJunpm2r0Uunx8r8Rnt9%2BH69P1EYh14loHgu6Hj6Et8Ht4E0rgWDn%2FBuSJG9qvedSsSFfnMuewibWMsF5zP3lPYxuy6blvJSiI29p%2F%2F46rglDbuh9tNAWe5CEJil3Q5raybI12EG7g5wy%2FQSnAbRK5cVE8nf7G3mPRlKfEVui7u%2Bs4dfXjFE8aH8GKWrnML8rNPUOq90VMBMNrB1MsGOqUBiFbDnRUQMVsQajMVRkDGlB8CpmAHVKUCxUpRAGsAO6VNI2fxdVkRIpC44ThOQnRYvyxkVi0tPM1zIgNcb9oHLIRHEyzlBUcbS8qPsQa0Ony8VCcKDf14h2JLSa9AU4XWL3PYZW2YFGLC8uE626gL%2BQ%2F2OZPp25AMIqR2vPe5Uvce4N39Do4Yul2QuyXr0wxnJ71cFCKlaPeX4MEdXzIl%2BSK5voxA&X-Amz-Signature=b151ee37f5f6973a19c5c0ac1c93b25a89f8af6afe26e16942c04813415a2bd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDFSVFR3%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T200106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIAeTwzb5pWKvBbZL6%2BsEMbaCiVVK2xMNoIfTTBEt8Y3QAiAfhXwEz%2BMVFSe4uI%2BP8w9p2Q0BzBrMKhuwKEXWbeQsYir%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMDCcxa3OfgZ2xxiUYKtwDpNZ4qKMY7KbeqCftWw6X34qruuUwB2jdMWvXymCPcHR2EBuESmpq7tqG8%2FPY7XJTTXic796f91KGJWAe5dG7Ooo4lMJTacmt6OHbn%2BYoLlHcBgF%2B%2FVrg3jwDeysRoSui1VjAOibDfqmjqAWGlVxiknIrrW97zPWd8zuBidZXDHHr2SR7cJzX9gpR5nQifW%2FUkLvb65fC6B6pGlqweaSELJj1PPbKMyB7%2FIezWgVQBUilfzvrk9%2FwQES73YFmlGBw9tn4%2F6QA672IkdGnzpA5gShAZmaVQuhiYPg04aa%2FAYSekXJBvv%2FJqmGyFDr0HDrBDymT7FMz4H94GcqIG%2FWAOl01NVGT1a3BzAN76Pbi%2Fr8oZv10qLpVwk6xaod41FY4C4%2FoR6sks4VklRzbwcF4YHmD1LWm29ENED%2BLnCbkk8hVjYqYP%2FLw7x6l3n8KmMaEw6eVMC%2FGbAVkSvsltLLsSmMgASeWQbqp0KL37uMh3zcmd8mPxQ2mIBN5xzKQRnoaa7YitmpKdXBFV1gJWBI9HoXe0Xc9zPYyl6GjfUYaqHw4tzaab9IISaFolQh%2BDHrNYkLm7ZvIVApgGdle8lhl0jEh2gxDiRG3hudVGqj3dsJ1veJdIZBXDZYW9vEwyMHUywY6pgE9j0Gf7mP2y73efML5B%2FT95JjK7Ha2Zm%2Fde0dc9ekI37LpEssT7cD29ctK1tODfzmdZpJ%2FzNshg1lVcVv%2FCeeVWSDUKpTs4H8oUtK2vapIhLao76ibovTfd5DRKHkzHv485f%2FPvXNPAlp0Kve9Kj2Q4cT%2B81Uj3FkalOabO0gfbGQvmHEDvw1d91lLMIsYSARIkECP34EQQ2rbEdDMXVsqs8WN%2Fcbu&X-Amz-Signature=3d61919db03a7edeeb712dff54abe2da5fc80744124944f3bd54e73b4a4029c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDFSVFR3%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T200106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIAeTwzb5pWKvBbZL6%2BsEMbaCiVVK2xMNoIfTTBEt8Y3QAiAfhXwEz%2BMVFSe4uI%2BP8w9p2Q0BzBrMKhuwKEXWbeQsYir%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMDCcxa3OfgZ2xxiUYKtwDpNZ4qKMY7KbeqCftWw6X34qruuUwB2jdMWvXymCPcHR2EBuESmpq7tqG8%2FPY7XJTTXic796f91KGJWAe5dG7Ooo4lMJTacmt6OHbn%2BYoLlHcBgF%2B%2FVrg3jwDeysRoSui1VjAOibDfqmjqAWGlVxiknIrrW97zPWd8zuBidZXDHHr2SR7cJzX9gpR5nQifW%2FUkLvb65fC6B6pGlqweaSELJj1PPbKMyB7%2FIezWgVQBUilfzvrk9%2FwQES73YFmlGBw9tn4%2F6QA672IkdGnzpA5gShAZmaVQuhiYPg04aa%2FAYSekXJBvv%2FJqmGyFDr0HDrBDymT7FMz4H94GcqIG%2FWAOl01NVGT1a3BzAN76Pbi%2Fr8oZv10qLpVwk6xaod41FY4C4%2FoR6sks4VklRzbwcF4YHmD1LWm29ENED%2BLnCbkk8hVjYqYP%2FLw7x6l3n8KmMaEw6eVMC%2FGbAVkSvsltLLsSmMgASeWQbqp0KL37uMh3zcmd8mPxQ2mIBN5xzKQRnoaa7YitmpKdXBFV1gJWBI9HoXe0Xc9zPYyl6GjfUYaqHw4tzaab9IISaFolQh%2BDHrNYkLm7ZvIVApgGdle8lhl0jEh2gxDiRG3hudVGqj3dsJ1veJdIZBXDZYW9vEwyMHUywY6pgE9j0Gf7mP2y73efML5B%2FT95JjK7Ha2Zm%2Fde0dc9ekI37LpEssT7cD29ctK1tODfzmdZpJ%2FzNshg1lVcVv%2FCeeVWSDUKpTs4H8oUtK2vapIhLao76ibovTfd5DRKHkzHv485f%2FPvXNPAlp0Kve9Kj2Q4cT%2B81Uj3FkalOabO0gfbGQvmHEDvw1d91lLMIsYSARIkECP34EQQ2rbEdDMXVsqs8WN%2Fcbu&X-Amz-Signature=3d61919db03a7edeeb712dff54abe2da5fc80744124944f3bd54e73b4a4029c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SYQQJXL%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T200107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQC7nF4PC6GMuEljv%2Fuf9T9eyRrpRbFm9bmCQA%2FqNoC9qgIgPpf1o6zdTNpXyclDKsfIHN23C2ZLKcDa0aTol%2F23G1cq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDPcOjzK6pFhw7bR5YyrcA354nQtGRk7FbebmujP%2FnbjuYedWjqB19yyEbYd238AElZ%2FHl1WQjY5AUfyi2JIvN2e%2FoaiL7yzA6OzuIUvhECcAs9pyC5CnM15Pw89KNdPxbIE%2Bfuj6s%2FUp5pyARGkndJJ4BV8kS%2Fa1ZfnJDUi5%2B%2FHDmVINH6Nc%2BqElBgu%2FlPDP1V%2BxmdiiCLzbWu8mfTzCRsPm3TiBscFado4iLEfCbMDoBN1%2BK9QcimIZMtcSz%2B4uYvlVssn8Nszy8PlubrSmztv1oUckU8nq%2Fg6qXJ7mbv90yySkSMPp27eKNqXNOxRuhhZbGxLCqCZaeFkbwiSTdHJBQucJwXpl%2Faq6fs%2FRqo6c1xGEwA2gcT7WBhDY5%2BRi%2F47wZZ5VcrlwmpXChxwnnKUpiefmDu4fqAyDfHMvSaA6cNLir9U6JLwHynGqfjYkENxH8ZVPSXZzZxcPaS3%2BcjCViG3EuR9ivxxiTp5SyEJQ%2BYSz2djNW7Nr2YLINitMOIDO62dMlS2dsl9CXFv1VDXbCoJGWWiEeNQrUwp1tydmW8zDryPsV0%2BYtxNzFnyNcGWc3umQvbFYcv%2F6AvSwpcv%2Bn0rnS%2FLGgVl%2B0AAQAsBVzjljCwB%2BbSlpMFImK%2FPD2RDAiOWXL3f5CcrNMMrB1MsGOqUBR5mFrg0CvByPdv6lWH4shz9CD2x4rCwVxuwbnhl0DoVqH8j%2FKrPXWUGLNKXNAHlGYtWgPc4lhBzqfQ6rP1pajwdWVduFJ37vz42ychUkrJ57hGI%2FVYJdKuDqo3TQ4KhIwOsg1PNcAAF70y5YlsAZcidzYw70CkThaipdxdYtGUEQyAnPOHispHzA6VBuFT4GkMJ5OFvBPO03wOHTVRPZY17%2FytMc&X-Amz-Signature=d87d11038163af87afbc5c5544001de6a7002a2fa7a029bce688a478652524e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

