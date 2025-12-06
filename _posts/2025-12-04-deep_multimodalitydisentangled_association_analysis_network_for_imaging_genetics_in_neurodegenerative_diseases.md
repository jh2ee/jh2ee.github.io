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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJGJLHS6%2F20251206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251206T090103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDtF5%2BZYGzb3WOI0hPK5cQYdpD22%2FTEWMadQsJ7ryAY%2BQIhANWLlUqCsOj7qLGwHcY%2BcB71L7W3sicBYi0lnUXaxKQnKv8DCHIQABoMNjM3NDIzMTgzODA1IgxuZFgVRrvB54anWBkq3AMXlrVrYd476RKH5y8wKKMOZMYxq1xftK02ih9Risc%2B%2F7%2BxJnYx9VuwJfDoKxByZidTdgVctw2KmxCRNUdlflrzU%2Fk4lkPDZJnfdEFqmq%2BmMFLli2uBmPyELllAXOEygpJwmnfaCzuUhyzYbIRZ2WgloXBqIyrgH6XWU06aL55yO8776RIXP%2FDasloxfjBrfHz52EJwho98SLDdgJe0Vsv94yeXlCtMn1BLkFze15Tgp1pVQIuvyAE%2B8SIJH5frQ2lAI7fE4k%2Fi7PheOcM4bAcFvXz56MOKV%2FcmaO2noETHDwWo03paz7sRrf1%2BTKaSIGpf%2FPkGi3oY8OZDSV7S3S6yCSAtA3TmwNZQGWeUYhd6bLe9nBCADQOcGNALClzkY6siK5H27GvLwAdrOMEwGZVb6kzIWBrymRyG2u0EnreMxm%2F23EB05fuXCPZkzgb%2F%2BaG8XBqwt1b27W6OB49kRWYaZ8lpKasRKegoJVuisyJQxQtxEBlyl5ewpEt2sZjx0HqjltQiWvccboqf1OMHM7the1hxFh6uaMilYMwHPVLg6nrn7GiCp5DJBCGxfav%2FacixGC%2BuEs3jIorSVz16J2hc6xArTxFN7fCzRaNUTO1ylTvW6ATsN6q7t%2BYneDC13M%2FJBjqkAVpvZPDxRAGZ0dUcrN7qz8J69b8QSukZFfHBVgaaZiomyI5ryr%2FHnhaeZOEb1kTy8iMDxkldWco5tInQPOy06Py%2Fo%2BV2T3aeDB98z6FAi2bKUK7bpjLNUV2kaLqw3DXd%2FrI5FvPDmT9fU1ddLzGOLWBKMf7tKs5%2B4h4TfPpwEXtz7uo1S6SQgUBd0RzVUMLPmcTlbXsxJUGdo917UxJI8UZV66RH&X-Amz-Signature=6826feacc862fd0c33390ec7fcedd80adaa5f7b002a7b8557e54d07cb61c88c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJGJLHS6%2F20251206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251206T090103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDtF5%2BZYGzb3WOI0hPK5cQYdpD22%2FTEWMadQsJ7ryAY%2BQIhANWLlUqCsOj7qLGwHcY%2BcB71L7W3sicBYi0lnUXaxKQnKv8DCHIQABoMNjM3NDIzMTgzODA1IgxuZFgVRrvB54anWBkq3AMXlrVrYd476RKH5y8wKKMOZMYxq1xftK02ih9Risc%2B%2F7%2BxJnYx9VuwJfDoKxByZidTdgVctw2KmxCRNUdlflrzU%2Fk4lkPDZJnfdEFqmq%2BmMFLli2uBmPyELllAXOEygpJwmnfaCzuUhyzYbIRZ2WgloXBqIyrgH6XWU06aL55yO8776RIXP%2FDasloxfjBrfHz52EJwho98SLDdgJe0Vsv94yeXlCtMn1BLkFze15Tgp1pVQIuvyAE%2B8SIJH5frQ2lAI7fE4k%2Fi7PheOcM4bAcFvXz56MOKV%2FcmaO2noETHDwWo03paz7sRrf1%2BTKaSIGpf%2FPkGi3oY8OZDSV7S3S6yCSAtA3TmwNZQGWeUYhd6bLe9nBCADQOcGNALClzkY6siK5H27GvLwAdrOMEwGZVb6kzIWBrymRyG2u0EnreMxm%2F23EB05fuXCPZkzgb%2F%2BaG8XBqwt1b27W6OB49kRWYaZ8lpKasRKegoJVuisyJQxQtxEBlyl5ewpEt2sZjx0HqjltQiWvccboqf1OMHM7the1hxFh6uaMilYMwHPVLg6nrn7GiCp5DJBCGxfav%2FacixGC%2BuEs3jIorSVz16J2hc6xArTxFN7fCzRaNUTO1ylTvW6ATsN6q7t%2BYneDC13M%2FJBjqkAVpvZPDxRAGZ0dUcrN7qz8J69b8QSukZFfHBVgaaZiomyI5ryr%2FHnhaeZOEb1kTy8iMDxkldWco5tInQPOy06Py%2Fo%2BV2T3aeDB98z6FAi2bKUK7bpjLNUV2kaLqw3DXd%2FrI5FvPDmT9fU1ddLzGOLWBKMf7tKs5%2B4h4TfPpwEXtz7uo1S6SQgUBd0RzVUMLPmcTlbXsxJUGdo917UxJI8UZV66RH&X-Amz-Signature=6826feacc862fd0c33390ec7fcedd80adaa5f7b002a7b8557e54d07cb61c88c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLBQGI4W%2F20251206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251206T090103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD91GRTbnu2%2BBc6nNMwNZ0vv5X31T%2BToCcm9Pu8TZRLJwIgYPjdVHp%2BahB%2BJNEjbgdPZPi39maJok%2BlKGevpHo%2FH4Qq%2FwMIchAAGgw2Mzc0MjMxODM4MDUiDEuW1X%2Bnf8ji5J5emyrcA4%2BKW4AKE0Vsjn2QZrkymgV%2BtEz5Y6xV51Drn6FTWgRIoezHwKH%2FOcLPRW4Ds0tQR6ZGVTbPO8HgNInzAh7eBKCb4k1HXXcHvJAKoGz1JFpN11%2FX%2Fr8q3NjHZQeVClZVB3y9UDj7TVOxfLo0aGUpEa1ogNjco1wKgpuEH2Una%2F8XmPrBxbweJ0oV9zLrXFAiRTScaoBkG3ExNxDYru6a%2FKxjMziNVHVs5vZNFQrNkVx2bQ6ygcr8r9PdxVpeLgPHdepbaAjOvUKleTrgsg51YnoAvwg7YGk1IDVkoX1Cu3bZ9oODt8BfZWljzzQS6to3XYlT1KH0NikXMxr5eZy%2BUHgIvufzeGxx7RxqlcoeRTnhPTvCAz8%2B2vwlta1DrfCWRXGlN8PyM4kGfNYthF1ts5HJuKkpv979kQQFXpfIGo1igUjaFNqdACi3GxlEVjJRPvvAIVE7U1R1pr1UmNeO4iFfFXP%2FHI3YhgpBBcJnOHku9eTHYZQ0Up9ebOIKYS3y%2BzbSgX5Ar5T3lL4DQjifcSQ4dgMWPCy%2Fqnumm1GnZdO8IbbKaQWHAqqvVRBFuTPWMlglaDgTueFp7DKgB8bqoDQzR3B720mziYSi8%2BZQx55pIp%2FFkpMsWpROSJgHMOXbz8kGOqUBcczX4RzQPOiRrl1L8aC1DcSszR7k86n2edXN8%2BSnVwdn7UXuBGGR8Yro6W0wFk0hiAVU1bf2uugOLD4%2FkvDcTx5wO5j47ouHympn2CIyUFdmAWz6Fg5graeBGQErVrdhFPzbzjSKuPLunlRPY6k78uUu5mxSM31WavoAqDJ4qHqETDL8GDjZprt6GluD09Q%2FLfrHh9MHQRoBKT%2ByyMK378PZNAFz&X-Amz-Signature=9d661e5549460fbfbb232119dfb5ee67599572ee8618ab63f2cb574b8d3d4090&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLSOADPU%2F20251206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251206T090105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHdUEN26EDivkAWuwvBoizht8EpENsIeyrnVPL0P%2FLw7AiA37cgT6NpAu%2F7r9WXOrqtepccO%2FcoJrAfF0IotZNVM6Cr%2FAwhyEAAaDDYzNzQyMzE4MzgwNSIMpazOPtr77lRG4U9lKtwDy2IRvAIuOr7D9UsAr1mJPuvUDpRi2FpyvXgSqkaiHbIaxbrWJam1MyGHU9yjiOC8GzMU%2FdSjDk8lfhn3nWMoNmhAFfRBRAuiiNY4l9ZsBrHJp8oljE5cNb76Wsp7YEepRsr5uFlV4HKmXxhfQQIBts3K%2BbMs3vFDtXMkyGUJOGzHQSfuVDISWlZECHqrneXilvnHarYU0BksIl5Y5tGbFiNzCaXrX805Eu3iXx9ASGPUuHl6WdpLAeKgJ%2BURosx8UdO7KJ1O%2FnjvcB%2FD5IdrfkgFdCdVW8jdEIfDDOLGhn0DaPEYGWuyCfLA1j%2BdMko1XAAYBBGSAi6KjI7nG2iGsVYdvilWYJclGGbGMRD%2FwHbLlbsw3IYJ8n5EkArhPEDWwbLzuKyA6ZXu7ip7IbrGZNQXl7W%2FF%2BMphOhO%2F5d0Y0wrNak%2FWJptRKHQ%2F5jWhFWSHLXCYnZJGi%2FlUFpzpqA6WjREsbC0%2BYt9Q6ehIqLWCC7%2FDVak3KCXTo4jWWnizb9eCXY6%2FkZG368cC1Jo5nzMZzyPW%2BujcyR%2F4pwauksiBfAJZxEqE6GyLjt03SjOjbZ%2FTkL7arxuQRxcrgdIafSoTogToyRuutNdVKO966RR7Xk73fRMR%2FXbXcryPUwwyNvPyQY6pgFNTUUMI%2FBB4%2B6Lbrw2c8L%2Bzn5eEpmxSVSIpzHqzNIXxPtaWK%2BcRsMy3q8O%2FUX9hq5LJ8t0vTNppzWh%2B9R08iMDDRrKrzN04zXGYopYo%2BORZQkk0B1JlQ%2BCeT2QLJKQulqEGfoXHLnnrFRuIB460hcelnj1i2%2FTlajGAtAxQCAyMHjkPj3wf4%2BOzl15NHNFln47ACSYm6Ms956pQ4xNSB6Fy3gLGyAH&X-Amz-Signature=da5d222702b67d47b81bdc618648f5c1c71b2adf13985e20f34010b4fb5f7ac6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLSOADPU%2F20251206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251206T090105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHdUEN26EDivkAWuwvBoizht8EpENsIeyrnVPL0P%2FLw7AiA37cgT6NpAu%2F7r9WXOrqtepccO%2FcoJrAfF0IotZNVM6Cr%2FAwhyEAAaDDYzNzQyMzE4MzgwNSIMpazOPtr77lRG4U9lKtwDy2IRvAIuOr7D9UsAr1mJPuvUDpRi2FpyvXgSqkaiHbIaxbrWJam1MyGHU9yjiOC8GzMU%2FdSjDk8lfhn3nWMoNmhAFfRBRAuiiNY4l9ZsBrHJp8oljE5cNb76Wsp7YEepRsr5uFlV4HKmXxhfQQIBts3K%2BbMs3vFDtXMkyGUJOGzHQSfuVDISWlZECHqrneXilvnHarYU0BksIl5Y5tGbFiNzCaXrX805Eu3iXx9ASGPUuHl6WdpLAeKgJ%2BURosx8UdO7KJ1O%2FnjvcB%2FD5IdrfkgFdCdVW8jdEIfDDOLGhn0DaPEYGWuyCfLA1j%2BdMko1XAAYBBGSAi6KjI7nG2iGsVYdvilWYJclGGbGMRD%2FwHbLlbsw3IYJ8n5EkArhPEDWwbLzuKyA6ZXu7ip7IbrGZNQXl7W%2FF%2BMphOhO%2F5d0Y0wrNak%2FWJptRKHQ%2F5jWhFWSHLXCYnZJGi%2FlUFpzpqA6WjREsbC0%2BYt9Q6ehIqLWCC7%2FDVak3KCXTo4jWWnizb9eCXY6%2FkZG368cC1Jo5nzMZzyPW%2BujcyR%2F4pwauksiBfAJZxEqE6GyLjt03SjOjbZ%2FTkL7arxuQRxcrgdIafSoTogToyRuutNdVKO966RR7Xk73fRMR%2FXbXcryPUwwyNvPyQY6pgFNTUUMI%2FBB4%2B6Lbrw2c8L%2Bzn5eEpmxSVSIpzHqzNIXxPtaWK%2BcRsMy3q8O%2FUX9hq5LJ8t0vTNppzWh%2B9R08iMDDRrKrzN04zXGYopYo%2BORZQkk0B1JlQ%2BCeT2QLJKQulqEGfoXHLnnrFRuIB460hcelnj1i2%2FTlajGAtAxQCAyMHjkPj3wf4%2BOzl15NHNFln47ACSYm6Ms956pQ4xNSB6Fy3gLGyAH&X-Amz-Signature=8caafd38efa01dd618e98799606ce582f43cbb588230c104fc1d6cf0f57aff2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46677DSPWIW%2F20251206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251206T090105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDdYam4wgNUblT86%2F18z9mmfmvlioLJ1kptMonptPcVwAiEA3TvzJ2O0bWT%2FKLW7uWftKIMGIyPhEMnU3ZGdOFngJT0q%2FwMIchAAGgw2Mzc0MjMxODM4MDUiDMjjX%2BEuP8t3BqfYISrcA8H6bka33BTs0V2awwi%2FpSFsXvLcZy3FR%2BFVOTQUVmcPJa7OBRLoPgTWIpvDJR0sKb0wC0oY7a5IX8Sq5%2Bhqn376PscG8o6GX26IeWXVQqFSjdh92qK2IE3uzSk7uu1fQdGwSZ9xk7JkaUemKXARnO2Ueehm5q7eBLMABCLu7fFsjo99IBrD1oqIqeesaLAi%2BI9xpQlgdSUkKBquJCOEiYmp6AuJ6I02R8Kp0E1SbFikbDuYlkDQeWIFf776AwAue4BppcE3%2BUjbggADCSsPC6DMjv%2BYZRwvFZHKuotip%2FKv0tPVmSNcLp4o8cNUWEWumoLWpzY4FcYFZvRWFo%2BtKeQjBUzf7nl3y9Da2b2LjyE1jiDi7eCrthAfGDRwEFrDZ2zHaoPF9TVZmCx7Tfq8RncxtZLKJ%2BBbKQ4wcO8OscWO2r5kmr5GvuEwp1lpEzfM3cD3SE0RjiRuSlPawEJVl0hhtASbLIzSO16A4HqEukVqRMn20ZJADSQEBip5yvQmiTdVWhuTqxuN83SbeEoEOmu8IpUMzz8UqJAjN9QDUS5KUOliKHbJ63vvSfA6abUSlK12FyKb7xaoThYV%2BwzJCcPIMREEqXKdHnJxKA%2BuvH5EaQgga7vrsg9udzkfMIncz8kGOqUB5xzBTJKY5bHoajNVpuGMcnY7gqx4qjm9bus%2B%2FKFPLXialQ3QCPY8oCkOye8Jd7zS1i%2FNP3kxpcJML12%2BT02Ou5bpb8CFtVvdVi7K94hobPGI5n1G5h%2BbKKBX5QBRPW4XsaA2jZtl1sr2UBlI6RbZ0pvzmfJfecuz1llc0OwltvSMJ0IwwxO0w7ttl2yPhrUz4I3Ipn7XPukTY9HZhfgvtHpumVvm&X-Amz-Signature=5fa15f16655218896d318ce42166dde5963e892ce406704f99495f5da51f51cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WR7ZXSWD%2F20251206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251206T090105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCVEXABNc25ycRKJCCjIz3Vytj254hN6iA1Jzg94kDQWQIgG3YVFWnf0xuB0UXD9LV5Si0So6TdY7K75zoX1uNQqMAq%2FwMIchAAGgw2Mzc0MjMxODM4MDUiDB%2FDxEiuo0%2B7HZWM2ircA3MUoId53Z80z8CMs5oENiVjwEbzKpkOBBeEa7UfvE%2BV4xUHvPfJDCMLQlhtgSpQbF14jWnqcpO7uDe4jQ7ILH0R83rIi3gdn%2FuS8CrlcEX3fMiQrUCQJlFcurG3Ev9vW5gsDaDGnhVJqqu8lyXsP5JZ24z4dHBPVe23uh%2FAvhgWDnhIv9tAwWCajWWvTY9s6rEqhcRGeaIooBoicK8Za0oHf%2F81X1czmGIepKbQkYJVhw2cBEgtCOuy7MzxgAqpBec04TNTfe6ti3cS4zEzgp2t7U2wpReMCSZncrGsj4B3Yw0J3dAnG62LkPzQbPy%2BvfuE%2FERgAtmYp8x6KAVmruM5jPcAeNISOUVwJ%2FTjtZDo%2BGrU%2Fga8WUbNSgYSE5Z9%2F396u9JxYJYXMRpD%2BqVUfPA%2BbXKUWQFejVgUmaAFOhQq7Ej%2BueiaX0wu5qDP%2B7cr9Al%2FhlCcfWePX82ejpQ6XwADx%2BWMJtENNfsAsCClLkVA6KDKhJ70TDwMO%2BWdUijVVFtrDJR4QpDT0DF%2FUfo2CZD1UE8P4s6TeSOhrbGdLBjIo6faX%2FpwApzsNPPfXI5qaQUN2%2BqWvMd1PUHVZqXHnN8yHUGtbbeM9%2FkVz5grvDAVu6jJOHBSXXfxSoRgMLzbz8kGOqUBPxfMKnBLpqrCz9hZexRTE4fer0hVdZOkNjeLnK88AyyOja4rK%2BJoRMgyGFMtAJk3d%2BA5KLH%2F9OObxfFTkuv8Zu4Rt67Z2tNPqyHTBlO7jKyVF8vtDDxSKOS4cbGjYSiAVYqw8GGuR5xJUHKwadcwEIDCrGG80YLE3r2eQyHBq4ic6IAHt%2BNm7WwIdCpDR0cXuNqziTfEUHsm9ci6UyMDjUBmhlVk&X-Amz-Signature=5b7cef7910845ebfd40d73b50cd7713fde5fd8541f2d601ae325e4c4b21a3f9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SU2WFVKQ%2F20251206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251206T090107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDs25xLpuIZamuF8pZuZXRy585R9E5zS43DKs78oLIJhAIhALBDw0JdUTwgXVzsOs45Rpp34LHz5mGsUlGNlVbQvrPxKv8DCHIQABoMNjM3NDIzMTgzODA1Igy3%2BOju1SG%2FtXldyi8q3AMmjmXZhUuARqVUqjrdgwd8yEO1Wn0AzqCFwGAFa2b51nFcJ2RpV%2Fz3H9PRq6NQe8hu1rmlzJQr3wuVwubUXRoVIEKOOqHCAeMSByGtndm%2FkG86j26QGS3vZ8z0ehnmbcFjfP3nT9rdr6DFcc3tMhtZQvifx%2FyfTx%2B6mova3nfJ5QQkP10MHNWKld9WJLwtqjGl8Bc8uL2CL6zC9buoXL6a7PWyDZ%2B7Cf9lag6KOmL7Y5c4vViIOV8XLS%2FKc%2FeGZgDB82QU0S6ACg3b6d%2BtXlg3zPejLm%2BSwIHBsvVxUpp6TbkNrAnP1N5nzPm8s6WqyZy9qtqkTTqa%2BfUIYPeHrH%2Fs19hwgDexLueWgDBjVQwgE1Ot59I2nHMn9QhnfHZEtig4WXGzGEqBdXuKdHJdxSY7z5E9AsXV8JMB7oXecpt8KfOVBFOo8yf16WiuAqPV%2F5dnjd%2BnGC7bmorp9PDNN7jDaf9H%2BzjxmgpXXnTS36VE2hU8jQE8V8oBWtDWzmiWKKszJCACtIio%2FjEwpA8LAhsZN7tg2DtCmELqPZVI49yj1HbYVxPh5%2Fdq4l9sxZiqf7tMMuOzZnNVfRQ64NUX0E7riwGCbkHqVXW6igu%2FYrPQzw3mhHwDmi0R%2FeoOUzCq3M%2FJBjqkAS0AZJMZuZmiEjKGUIvz0fNSKW7qLDfxL5wieRKf7j1JOfIW7biC2h4R67aHJUrUPueyR6ug4WKemRA%2B52zs1wGO1XbMvHdaH9RQSvlMfRqwjVXuFMSow%2FIo1FTaRTzeV9%2FteSKK7OIHIlXhYG4gG1%2Ft4zJp%2BXnNpiqEmlLSdw69ZbAmjcMSwWjFASDUtyuu5FcMXjHxRasaCcdJ0KqlstEsktQ%2F&X-Amz-Signature=848b479faaad2c95e48d177e94da203e178fdf0e436b4b038eda180f862b152f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAP7TJZX%2F20251206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251206T090107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCw9opxAW1d4umjtraOzX1tju%2BYzADNns8x99x47PDS6QIgbk1rOTR4Aep8RQcfgA3WwXe7ISJqCu1a5U%2Fp8bITNqQq%2FwMIchAAGgw2Mzc0MjMxODM4MDUiDJFp%2FFtThnyOsP8aXyrcAyaYFbNuMsPMoefkIc6J4hp7m8Y9IEfoqICv844SEASg5UjnmwlJUMlh9%2BMzhPca1vOoxBJFVE2JxYYb5%2BL%2B2yfrUVQZkF0papJ84B%2BYocxA2V8GNi76yvAVicW8abFFX0DRVo1yt8cU1tzoSpZmBeoK08hCKsox3X8g9H5dL2I5WMSS9X20oBhTF%2FIivBNyupwN%2BxPNmTwbvfMLPw%2FZCmc2eLfwR4AnXLNnR85UUpi3mjd%2BWbSdMtCexJZBdNBPBzcnZYDfCbUZufDTECvdaN1arPIh7RXEID6oEScup4wtQP%2B2TFVZYqDPH32aT4EPd3cg3eb9LdO1nNtFVj81rBOb8C2e4qAHRgamwX6fJPfHR3YlU0PW37d4tA20trgHMpRMd5FFT9NDO1UyZ2WceNXHkEm%2BAbPm%2FNTlhVx4YVhFsPG9u8PjzD7Vm148qvp1BcI6FI5o%2B66WyCNY1YFi%2BlYwbfIgdMeknHwSd7FoxhxgGhhjxqHOLX%2F%2BdB9MS12EKfk7XICNNEbb1h157JH3%2BYviEXwe%2FQdtSZsD6evO%2FIY13wzExbbzZFSDxomx7EoEuDi4B314Z2K6o%2B1F4MD9vU7AS4G4mDaHYhPRXnY2gAHzSLXRQG%2B%2FE4xfiBSNMIDcz8kGOqUBfduoYOnIaw1lB%2BMLN45CVMZS0tubN4K0nRB%2F8t7iy5fTabAEeZnJXe9IXrR7ELA1tmWMhsDjAVMm7t6EeH759RktXHpy3QrqamT5rTMJDB1vnQAzikKb5WrbCfxqqIMgnl3D6TtkHidkrd%2F5k48JK2veULLrCeQND2g69JtKoTmHiFMRJ3BhcuVIO%2B2CTvvsjne1gN%2FV7DydV8%2B91747%2Bge%2BvPmH&X-Amz-Signature=5a7553303e0e4b13665c20f4175f88a3b1057788878b4940a4f493296b0d3815&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAP7TJZX%2F20251206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251206T090107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCw9opxAW1d4umjtraOzX1tju%2BYzADNns8x99x47PDS6QIgbk1rOTR4Aep8RQcfgA3WwXe7ISJqCu1a5U%2Fp8bITNqQq%2FwMIchAAGgw2Mzc0MjMxODM4MDUiDJFp%2FFtThnyOsP8aXyrcAyaYFbNuMsPMoefkIc6J4hp7m8Y9IEfoqICv844SEASg5UjnmwlJUMlh9%2BMzhPca1vOoxBJFVE2JxYYb5%2BL%2B2yfrUVQZkF0papJ84B%2BYocxA2V8GNi76yvAVicW8abFFX0DRVo1yt8cU1tzoSpZmBeoK08hCKsox3X8g9H5dL2I5WMSS9X20oBhTF%2FIivBNyupwN%2BxPNmTwbvfMLPw%2FZCmc2eLfwR4AnXLNnR85UUpi3mjd%2BWbSdMtCexJZBdNBPBzcnZYDfCbUZufDTECvdaN1arPIh7RXEID6oEScup4wtQP%2B2TFVZYqDPH32aT4EPd3cg3eb9LdO1nNtFVj81rBOb8C2e4qAHRgamwX6fJPfHR3YlU0PW37d4tA20trgHMpRMd5FFT9NDO1UyZ2WceNXHkEm%2BAbPm%2FNTlhVx4YVhFsPG9u8PjzD7Vm148qvp1BcI6FI5o%2B66WyCNY1YFi%2BlYwbfIgdMeknHwSd7FoxhxgGhhjxqHOLX%2F%2BdB9MS12EKfk7XICNNEbb1h157JH3%2BYviEXwe%2FQdtSZsD6evO%2FIY13wzExbbzZFSDxomx7EoEuDi4B314Z2K6o%2B1F4MD9vU7AS4G4mDaHYhPRXnY2gAHzSLXRQG%2B%2FE4xfiBSNMIDcz8kGOqUBfduoYOnIaw1lB%2BMLN45CVMZS0tubN4K0nRB%2F8t7iy5fTabAEeZnJXe9IXrR7ELA1tmWMhsDjAVMm7t6EeH759RktXHpy3QrqamT5rTMJDB1vnQAzikKb5WrbCfxqqIMgnl3D6TtkHidkrd%2F5k48JK2veULLrCeQND2g69JtKoTmHiFMRJ3BhcuVIO%2B2CTvvsjne1gN%2FV7DydV8%2B91747%2Bge%2BvPmH&X-Amz-Signature=47f768d07d46ace6a18f4f82a0722cb4112ab2608ab64d6221edc5485846d05b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BEEDG6X%2F20251206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251206T090058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDsfsWk44Gk72j1KxcIKPx3NmtTlz%2F9yDwrtPxDRRME2AiAZwOnMzXOQoq%2FnctTRJozeFnV2Ki2NHw66OkLJZoLLhir%2FAwhyEAAaDDYzNzQyMzE4MzgwNSIM6GkFTCuu84iPKNk0KtwDt9qOs8Rmh6mOwSdGEAn7%2BxDF7oI5HDV4lwkVyF9w9ixflrMxmyJ%2BgmVCaWcpINTIZvLJ6tfE0AYuwfZ5j5SBkYlf3K6452ZRv8T5C3BVumzIYf%2Bc58JffV26iN9zQy7wCseVRHRqNg7Nc0OgElC3%2BA0562H5kQfPKWKbT3yaz4OaKBMl6%2BWfe5JGiz54rj2GTpgSN5Alda7WCkers%2FNaOIvTAomKc7ktQSda1jvHiB3EkdoqodS0F41V1ZtyeH2K25B2zcPdBlEX5qCSZ%2FN%2FRDF0uOLlLSEUpNpmAgvOSvig%2F7vBP3VeZrA5txjnmbzUbHuzFLXajqk7ZaPASIVZiRqNcZGESSKbHMVH%2FWitva5cSdAjrRrboqghVp%2F1kekx7xJd%2FYADH4EHGsP6YF%2ByUUhtyk9vS0rIGTrj0jxCeSBWYqO6sNcau0rgQs9%2FZVdBWwou%2Fs0Ra8Zj%2BXXZ%2FeY5lQ4WmkeZRyf5ne6DjbZjRWKDU2quWmktorIDg7tNFAz0HMkEHkXaKXD1vweL%2F%2FsCiqDJiypqG9MUHWXwXS0s8%2BrPnDDSeqYlT%2FrIFtrZR69an3xtyjKh6QBaHqx9oKdr%2Biv%2Fv%2BHvqVjc6xkmx2GBVZC0I458BGDDzVarvzkwxdvPyQY6pgFTHjF%2FTrOsitFxgNJ2vjG5nPr7Av4lr5cEqa8eo4Y%2F9lf0I%2F4ZDni6Y1VhsdhvDOhibP0Dpu3KODYCKVqVUDI7defq%2FWOVyIr07EU7dLm33mF4jMRwb%2B9bk7O%2BXJ9mGmogMch%2FMHFOiXK5MYTle6Uuq80A4FdMxegP%2BZme9UyVhwMN0%2FOVnZnq0qbikEER5xtkorJkwBGyOF2%2BO3xhpacPV2InT1JZ&X-Amz-Signature=048793a97ca7d668de0d00bd04caf1f7912a08352327c9ebbcd51572beb33934&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TVKUDAV%2F20251206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251206T090113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBM1WzLA31tbFLJ0GqJv7DGMjnCsTgh1ZIDzJPgWPJDBAiEA68b5GwFgCL57iCuISK59BrAYBrqt66N%2BosD%2BAmzzWEMq%2FwMIchAAGgw2Mzc0MjMxODM4MDUiDERNHc9GZ90fw9C0VCrcA2%2FRUuZFKk31ed67FHMz7ae4EcoSZFP4SMNNj9vfOgf5e%2BOCGWFXlHZSdAayrDoyWyuw7Xma5zbaJbke80pW6XKJj1g%2FmUon3u7MiqXp604kEjCC2Hk4oj0Fxr6jVXXqhx866JAlIgL0psmfXB5Vyj3G9PUaZzDbWuGfk5fSopfQkDOJgVM7I5DO7PvxW4WoMW6e15sHlL32lg4G3N7e4pOLSRpaI3xRu7%2B8aHNcXbKXtjjhGAqUF%2BDEqC%2FrPgGikeEh%2BXB%2BRmARnvdzSiACzT%2F2AIgV6NwJmuwbI6FSe92%2FqwrRkePOAZJi6xBEPYoRGvgAuqtJjFn6BT5evwGX%2FNnO9BBV6C8IBeQ8iQ4MfHOJ6nOVMmgYqwwt8u4AfHuNZQtyRZL85pbWU8U9x2vTIH5LxtkhnkZymulZGr0wo8Lqc6GDlEvfkl%2BvtCX267qrX78QdPGxi6ibf6nRDUIOU1LSB%2BDiakm0115UgofnqYbBvL3YgAN6uBC%2FqawWTQKc56hHRrdn9%2BK1qD169zBi48SqDs63ZazP%2FC3N9gFxn0f0RYZsfxX324q2g1RDrZz1z4d%2BB%2BivgExxoVaXTbw6afi23Pge1ItiVPrcQ4NfakwBe2grmtfnb%2BXVyqFPMIPcz8kGOqUBCY0nL%2BzEdnG1zwYunTqOTeWdrCs8AISUb5Yj4KfTxC0gLUQSykG%2BnGish0bPfrV7PQOSKB2KmKTAbot49RD%2BinkRrAl4Kck%2BQAgyHHc5VuFbCCbMWbQdrWJJeu2KBFQyew8zqEO%2BZim5UoeL3%2B8hj2Vdb9483M4vXIl9UY3Tx9DyhVCp1VFmohaIhfJN9PNsWhTajuc4j6zGmJ19eK0sx1zOGUYk&X-Amz-Signature=4868f3d1318cd933d53caf6e7d2ab0ffebbeeb07150240b2a7086c4140946bdd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TVKUDAV%2F20251206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251206T090113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBM1WzLA31tbFLJ0GqJv7DGMjnCsTgh1ZIDzJPgWPJDBAiEA68b5GwFgCL57iCuISK59BrAYBrqt66N%2BosD%2BAmzzWEMq%2FwMIchAAGgw2Mzc0MjMxODM4MDUiDERNHc9GZ90fw9C0VCrcA2%2FRUuZFKk31ed67FHMz7ae4EcoSZFP4SMNNj9vfOgf5e%2BOCGWFXlHZSdAayrDoyWyuw7Xma5zbaJbke80pW6XKJj1g%2FmUon3u7MiqXp604kEjCC2Hk4oj0Fxr6jVXXqhx866JAlIgL0psmfXB5Vyj3G9PUaZzDbWuGfk5fSopfQkDOJgVM7I5DO7PvxW4WoMW6e15sHlL32lg4G3N7e4pOLSRpaI3xRu7%2B8aHNcXbKXtjjhGAqUF%2BDEqC%2FrPgGikeEh%2BXB%2BRmARnvdzSiACzT%2F2AIgV6NwJmuwbI6FSe92%2FqwrRkePOAZJi6xBEPYoRGvgAuqtJjFn6BT5evwGX%2FNnO9BBV6C8IBeQ8iQ4MfHOJ6nOVMmgYqwwt8u4AfHuNZQtyRZL85pbWU8U9x2vTIH5LxtkhnkZymulZGr0wo8Lqc6GDlEvfkl%2BvtCX267qrX78QdPGxi6ibf6nRDUIOU1LSB%2BDiakm0115UgofnqYbBvL3YgAN6uBC%2FqawWTQKc56hHRrdn9%2BK1qD169zBi48SqDs63ZazP%2FC3N9gFxn0f0RYZsfxX324q2g1RDrZz1z4d%2BB%2BivgExxoVaXTbw6afi23Pge1ItiVPrcQ4NfakwBe2grmtfnb%2BXVyqFPMIPcz8kGOqUBCY0nL%2BzEdnG1zwYunTqOTeWdrCs8AISUb5Yj4KfTxC0gLUQSykG%2BnGish0bPfrV7PQOSKB2KmKTAbot49RD%2BinkRrAl4Kck%2BQAgyHHc5VuFbCCbMWbQdrWJJeu2KBFQyew8zqEO%2BZim5UoeL3%2B8hj2Vdb9483M4vXIl9UY3Tx9DyhVCp1VFmohaIhfJN9PNsWhTajuc4j6zGmJ19eK0sx1zOGUYk&X-Amz-Signature=4868f3d1318cd933d53caf6e7d2ab0ffebbeeb07150240b2a7086c4140946bdd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYYU4NN4%2F20251206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251206T090113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCMwjzmmKbEeyMrLS3KXN6xj1p5GP6q8vJgmhvNMvSpsAIgQYwVJd7ukW%2FLzeh3hm12zWx9OwKPQlbbVkjVPzoVk9Qq%2FwMIchAAGgw2Mzc0MjMxODM4MDUiDAzsCpuK69bYBE7WdCrcA%2B%2B25x%2FSpwQX83QsIhdV4ztWLUPQdrn%2Ba7UdRaW0yYgboATGJbCvhW6Ck5fJRjnuXtn%2FJ7mMb0tiFl%2BPDLhj7YUa8HPbzA42UdYigkU1U%2Bzx9%2FdHMqHLHuHKqUQQBxW3x1eK88zW4D8wMxYAUGXbD3%2Fb%2B%2BGLAJFS6Zq6ny61wyDDZuO4xA1w%2BhehMLgkzxv%2FJdEIhlvYZUXkDkldE%2Fx9A2yPrgXdc79Nrb80XdFYs%2BAz%2Bn5XX6u2OFOsfXqRBefAGtzCMfaNm5ekrHpL1KC5m1YUIXKpALq%2FuTV2SNKyoFXN0iMx7MVnwG6OKNAO1vLk7wiqvdN4aooRv%2FTBBEIzNVrG1nOxyP0%2FduZfJbmcIwC34etUwBJ10nUN6q2KtshDFMHj740oZv1Hepn9gNK4sIwKbM23GIRoyqgZWyBhzW3KkCoWw7mcuMnj%2B%2FNaB0HvDwhruE52KwpaRXjGUeLqh2PNl5RvGw6EDF4irwvLGZxKK%2FC1KyNBRc7qq6hAFP%2B8zIlWgqqS%2B5XViUSJSSI7RQ4ZPfUXNyBSIkh4Qh3gojgkf4RLjRmmj4z1%2FxkgrYJBiuv%2FIF1erZFTUgm%2BUmIf4hZHTA1HhDHlqCqUC6%2B11%2BJfxlfoNtVSThJ41oxzMNHbz8kGOqUBKh%2FRLX1HFro2Il6BDGl5ZQ6WE6Bev9W48dbePBL6pumDr5c40gRHAY%2FGPK7F8KW85zH%2FhgRo6dkJhi2iO0pTIFfrLCUUSgj2uBycw59c4gU0CsmDKdFD5lJBpkGppQpUnswesOZkAweqqrC2gtDShYu10JJLc8PH%2F%2Fbmi%2FH%2F%2FKrRfc9KmTsY2CpxazHBiD0fopdVpZnrCb91bPBtfP%2Bx4HnzUI3r&X-Amz-Signature=10f3e7f0eb2b173aace8c2c2062e657dd39d9fe4a0076c0000941995acbddd59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

