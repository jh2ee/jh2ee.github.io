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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CCMTJLR%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T062623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQD%2FOfU4MEob7gWB73vTXwthatGizxRNYcUySzZ2OuO9CAIgW%2Bxk3MnbpSv3B5jXxsmyGOq6vwSZQlApT%2Bckj1Dfj5oq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDLHexuK6cbwccQtRhircA2iiq9hrBOrUoR5lC7WDqicDu22M5O%2Bp9sMB%2BKRS%2Bz%2F362RInhZAxiu%2FNuJ8rXUrx7QYRrqvlVV3cICBsS0VTZveXN9xDG2uSraKQJ9PECKJtldad2KXomL0k4rpFMVwOhtLKUmOh2jHgkfk1Y2m4oIaMKCnefjWfXi3xGtAKKZab2vYPXBYaccBJjcXVdnJEi9MiOcy%2FAJ%2FSc0TBkVO3SVs3AdqYauZLGV2EwmDfcu32Ilv3UPAVSTxi%2FFVhVgxrANy%2FBYDNpJmCTUcDPFZDJefryhkoJMRpzz3K%2BH%2FIecfEMNBqKxvAFrCH9mMNJy7tlTtjobLkwSQFwcSj1Pr8DNNkAGVLSwPFKUMVa94%2FbNgj6ZATJzPNfLrw4XEcMytlErEaOhUyM5%2Fnhva5rDdaEKfQSbGph7ZV7b9m4zSkYStJYwA11W7Cxy2FqaCWtAcSuP46kQKqarMuGscdYefJD4lJgp5J89mznlKWFJzPd5CWDUVM7GpFkb0p8w8KnGGodANmeOFc3tl9nZwgG%2FPKz1IdOIiG6uWm1c37pHJgWOlr9%2BzMgMQ1gg0UDh%2F3eTdHhAxFQklifUl%2ByMaiRfDWZje%2F3%2BtfNpgP8hty5cUc3OKIIXLPt0zGZIbLGyQMM%2Fy%2BM0GOqUB2Fd%2BZeyqA5COrDU2uZ%2B30CQ%2FlHnj1EFyy3w%2BurUFEJ5BzHfkg3sBRD7yz%2BhuY0GdaWI6cS10o7XjMpJouHWLVYeI24lsLtklDJEwlokV8Tb65V3rgOoQH9upQ3TJx6D8vh29Zc1FHIcXlWKMGEj5zI32bSqJtgS6fRb8JojQ07A9JrWBMNaU%2BYxZl3V3MbfSkYrjvZKLfcf4Bqi2jsy06UE6EIpe&X-Amz-Signature=dd753125dbfb22d15db35e30141175fb5db00b662e71fd0389fe8a9881ae0ec6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CCMTJLR%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T062623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQD%2FOfU4MEob7gWB73vTXwthatGizxRNYcUySzZ2OuO9CAIgW%2Bxk3MnbpSv3B5jXxsmyGOq6vwSZQlApT%2Bckj1Dfj5oq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDLHexuK6cbwccQtRhircA2iiq9hrBOrUoR5lC7WDqicDu22M5O%2Bp9sMB%2BKRS%2Bz%2F362RInhZAxiu%2FNuJ8rXUrx7QYRrqvlVV3cICBsS0VTZveXN9xDG2uSraKQJ9PECKJtldad2KXomL0k4rpFMVwOhtLKUmOh2jHgkfk1Y2m4oIaMKCnefjWfXi3xGtAKKZab2vYPXBYaccBJjcXVdnJEi9MiOcy%2FAJ%2FSc0TBkVO3SVs3AdqYauZLGV2EwmDfcu32Ilv3UPAVSTxi%2FFVhVgxrANy%2FBYDNpJmCTUcDPFZDJefryhkoJMRpzz3K%2BH%2FIecfEMNBqKxvAFrCH9mMNJy7tlTtjobLkwSQFwcSj1Pr8DNNkAGVLSwPFKUMVa94%2FbNgj6ZATJzPNfLrw4XEcMytlErEaOhUyM5%2Fnhva5rDdaEKfQSbGph7ZV7b9m4zSkYStJYwA11W7Cxy2FqaCWtAcSuP46kQKqarMuGscdYefJD4lJgp5J89mznlKWFJzPd5CWDUVM7GpFkb0p8w8KnGGodANmeOFc3tl9nZwgG%2FPKz1IdOIiG6uWm1c37pHJgWOlr9%2BzMgMQ1gg0UDh%2F3eTdHhAxFQklifUl%2ByMaiRfDWZje%2F3%2BtfNpgP8hty5cUc3OKIIXLPt0zGZIbLGyQMM%2Fy%2BM0GOqUB2Fd%2BZeyqA5COrDU2uZ%2B30CQ%2FlHnj1EFyy3w%2BurUFEJ5BzHfkg3sBRD7yz%2BhuY0GdaWI6cS10o7XjMpJouHWLVYeI24lsLtklDJEwlokV8Tb65V3rgOoQH9upQ3TJx6D8vh29Zc1FHIcXlWKMGEj5zI32bSqJtgS6fRb8JojQ07A9JrWBMNaU%2BYxZl3V3MbfSkYrjvZKLfcf4Bqi2jsy06UE6EIpe&X-Amz-Signature=dd753125dbfb22d15db35e30141175fb5db00b662e71fd0389fe8a9881ae0ec6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3GD5CIM%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T062623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQDGz3sA%2FTiSgxrfXvMq2eNycRWAOR%2BORR9o%2BjtSfzLIVgIhAN4ef7TI39NG13W4z1%2FJy52c7kA8fmzqCpQMKi%2BUaPHvKv8DCEYQABoMNjM3NDIzMTgzODA1Igw7a73UKwwh2dZVi8oq3APN6DtGRE4aYNDtPIDTa6c4zvIYIbjujfZiJyYPz9eNH9AXhbDBGlcTcbF3F4ryo9TV6erdWfXpRixNPyE3EXEHPVjp26N0P6ihfvn5YkUzDHHzO7qFtOTkD152i5ZWtfb8hGRij1HNwDVtYzlcqcokXwAV6G1oy6MW5uf9iKltAh2v15wpajs8KQfPE6XjNKDw%2FCuvEeI%2FZoh7qkkcqdk359A8%2FuAYaBb4ZCZ658HNiYLYtSEtOjZODSMXNRSVIqC01hMsuBom9l64ArploKGduwO0peAG%2FhOAG3tKGwrMGSKLiL8iaiH1nBhfwfu7dPlBhV65fmBrhq37xJxqbOEC2Mcp11KK76b4nWHk9mHL%2BuZQ2AHNUInhwlCrZXSccdp%2FQmZ5HWpupDUVwDjMW%2Fr0RRK19IgSNbvTA9IQCtmj%2BPx%2BEBAr2SsetAdQ4C6M9gQlViIvGLLxwfm9jKHyB5P5RgI9GIAAtb2WO0WYkPzdAhhJGkKU9rrpd%2B9f0UOOwxq%2BP7%2Fo8iLlocEj1NHShRN2wMwAaAjWcVXLY9O657yUikJPalw10yy2iCVUeQ9WXPZSdMBT0AegwvFYPtDbEfQ6SJXVTjG6Dche7dqAoXjdxwihpXhBUh5FadDBoTDAyfjNBjqkAd3Q1rwYpkGmS1PcKd22r0OsnMnPuqZ4gvvHy6ZEHwlofSIVjRWLDZGm52GsjMVJwJJBfYyCEjXQyMkTKW72eVm%2FMbOB3BE0MdYJhdJ%2BkUHORql%2FV%2BV0a92%2BitBfl3BBbeoKOU%2BtrIYLq1mxCuX%2B1uAgZ0NuDpT3Rld%2FRdwijkS40UIbPAgBx9c%2B7xreZWkhkr0aWbR5ahdV8JnyMmvUoCjxnPUl&X-Amz-Signature=1cefe2899d6c9bd20557cb696324e5af72341c27ce358cca1ed7917d44a3bd14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSCH4CEQ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T062628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIB4jJHGlBuApsu1aej7EqrwaO4M4WArNIR%2Byr%2FLosFVwAiAHVaE6SnlRiQ8oqsXhnlnHcLXgVNB9YVjI6k42CVKFvyr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMOSa8xiyAMax3LQquKtwDGv7phWcC9KsvM%2BpSYSZIsunQGPYb3IKQuF%2BQX1WUSDk%2BljHAPkuLwPLJBPwOQ4DpEFO19zSD%2BQq%2Bl8S3zgO0ikG%2FuEzAG37Z%2BGaofcTycgcBgmjHtIL2ZzP04ldqbSILQ02ojoQCdKia9qS%2B%2Br9oP4xuy3TGRwmIfrQBe7CgHXJYC06eILqKQspwgD087Pml%2FRsMKv0zCrLF60q3QGRLgDo6H26pbXFRq7FtpKEP8a%2FYhn5taVUadfvihHeli8CD1MsF4dSrXo2AMdglTov%2FK6ROxNasadoUCFtT%2BeIOq8%2BI81xm7iHKyHBgJ7buNMmRZL98JZv6%2F8%2FJRoEVqGpuIOqH9dVavQ2GEwX%2FZdmoPbk75ShlYCnHEVVO4M4yTZ7gPO12IMj%2FJUobIfq97DJVBglowhj%2FcHFUsW9SfMhDuQ1AWunuCaXI3hxv4nrO9LRQW15uAyIi7SQGHSnfVfPfxfTl0Sh9G7iiyNEUZGEs8C0fdmnQ0TlwzFHBLSfmjLBs8UnutiVudOJ7Fn97gOMRiFrKZHgbifiGXOmeId%2B%2BHEqA3brlk8wpaTYEyx%2BBKc7wtDhBDtZc03FD%2FfiPyt%2Fdv0CfHrcYdDoqFF5ZvYHeO5nxh%2F9Wl6GqFeSPE7cwh%2FP4zQY6pgFqausWsD5tBnu4M2RbmArklne%2BjggzOOD71MIeSPaBeq6ZyLG3RNi%2BqAvnaP4cNm8pHRpdpcB%2BN%2BX8eoUnWRedMulWtQ8qEpE43zOboQSYtfQajhFhl%2BjvxAH58vDg589M8QqYJein7cb7ALS8qCnXvOvH8N70BsY%2FUiCISRH5ztthluUcoSWvPuYWuJP3VAX1lM6F%2B12QHAamhWp%2F%2FIY8TjxT3ak1&X-Amz-Signature=43c14e5caab8436797185397834334f6d8b89da79f2baac59c38d9839ea3bc59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSCH4CEQ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T062628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIB4jJHGlBuApsu1aej7EqrwaO4M4WArNIR%2Byr%2FLosFVwAiAHVaE6SnlRiQ8oqsXhnlnHcLXgVNB9YVjI6k42CVKFvyr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMOSa8xiyAMax3LQquKtwDGv7phWcC9KsvM%2BpSYSZIsunQGPYb3IKQuF%2BQX1WUSDk%2BljHAPkuLwPLJBPwOQ4DpEFO19zSD%2BQq%2Bl8S3zgO0ikG%2FuEzAG37Z%2BGaofcTycgcBgmjHtIL2ZzP04ldqbSILQ02ojoQCdKia9qS%2B%2Br9oP4xuy3TGRwmIfrQBe7CgHXJYC06eILqKQspwgD087Pml%2FRsMKv0zCrLF60q3QGRLgDo6H26pbXFRq7FtpKEP8a%2FYhn5taVUadfvihHeli8CD1MsF4dSrXo2AMdglTov%2FK6ROxNasadoUCFtT%2BeIOq8%2BI81xm7iHKyHBgJ7buNMmRZL98JZv6%2F8%2FJRoEVqGpuIOqH9dVavQ2GEwX%2FZdmoPbk75ShlYCnHEVVO4M4yTZ7gPO12IMj%2FJUobIfq97DJVBglowhj%2FcHFUsW9SfMhDuQ1AWunuCaXI3hxv4nrO9LRQW15uAyIi7SQGHSnfVfPfxfTl0Sh9G7iiyNEUZGEs8C0fdmnQ0TlwzFHBLSfmjLBs8UnutiVudOJ7Fn97gOMRiFrKZHgbifiGXOmeId%2B%2BHEqA3brlk8wpaTYEyx%2BBKc7wtDhBDtZc03FD%2FfiPyt%2Fdv0CfHrcYdDoqFF5ZvYHeO5nxh%2F9Wl6GqFeSPE7cwh%2FP4zQY6pgFqausWsD5tBnu4M2RbmArklne%2BjggzOOD71MIeSPaBeq6ZyLG3RNi%2BqAvnaP4cNm8pHRpdpcB%2BN%2BX8eoUnWRedMulWtQ8qEpE43zOboQSYtfQajhFhl%2BjvxAH58vDg589M8QqYJein7cb7ALS8qCnXvOvH8N70BsY%2FUiCISRH5ztthluUcoSWvPuYWuJP3VAX1lM6F%2B12QHAamhWp%2F%2FIY8TjxT3ak1&X-Amz-Signature=a4777bd6454fc16ea897b9e81f40a67b94ce4ad183ce12ec80f6b24d168d7bc1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2GYEFX6%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T062628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCID09J%2FLDpNz6ahcldd%2FELyiI5FPT8FfVL2cCyBenFBRQAiEAsftdlPVRpWdWUwAhyvaMq16Cd1s7ByGMEkm85hdVrKgq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDO849nSQSWLIAd4JJCrcAyTALkJKCQhquqBuSrIVucSl4UQBMWTP1AQKOBR%2F4TwY1OCI6kA5SjRDiuZUpZAIQXdCp4V0YvQMhGJlSAmdaADFQrGWIt1z%2F5b%2FiiKI7qADqXTR%2BVsqSqjGKPer%2FvrV4FGqK3vBCjsn6xM7ga0rTrTz6hF%2BvAgwtpKOsZ%2FWS2r%2FewWLps5HECrchWk3Qlhw%2BEfA7eV4cWg%2Bre9r1q6RN5JYstlYxMmZ3%2BwCWgj9teEDFhUVyih%2BsYF%2B8W5rAbqBPAln%2FCCv%2FeaBrN1RUiIhFFca29x7nQxRJ781VCkYO9YhNIoXcXqQNXXeeSiBg4Pc3ensW7%2F63V%2FiMsKoD1YUX925jnPjYMewtX5BjU2irDXqphGoOFbZjeKMm26nkg8FY4%2BnUGdAitRs6CPoC503j95772obDfkAJbgAJFHsJeVizPHIGc8GKqXNBcHVzHwt3o8e2ctphVkAs%2BRSsodHaDQYDEoEL4%2B0QL0CBDj65TSCLcaj3kOnEhmUgSG2YGqbSUb7z7QWQ3eTDR%2Bz4Y1a37HTuSQ29necG51%2FsVoLbRWA7NeS80ZNLWjfJX3AwQ2N%2FeprOMiMZO9crTFbRB0C2WZNbD4Fm1zuQDpGcGKmvJzyVyun%2FA1kVXzCOQI8MLLz%2BM0GOqUBj7zbiddkMhp%2F82Mejwn2I6Te6emFerw0%2BOE7vIZYGvUosrWRC9%2FCKnJVB57P5JR3vCX0MStvH%2BwaEd0WynuKaTBX7DCUjpK6VDMwHMaf%2Bn%2BfGW%2FFBoXfL%2BK9JE5IML947jh1v5MRXdbalEEIZS2YEmTbgaXTOfbEfRC2Uyqn7MWWboFIQxC3d5S9e8ntelqryCFzXrzsXWNWglcevBbQ6i3qHgNi&X-Amz-Signature=5a654c605e6372bea52b6d114e077c5b2be90efe78994d7e6a6122fe2918009e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666WBNBUXP%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T062628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIHFAolazRjiYxWpTXl4jbxThBDOWTXF%2FhZn7QNXuZazfAiBrPaYeyZ0PPlC5wMsumEb1DvGB%2Bu7KNQu1R2SahtwYWCr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMcQ6LeQYXGJadmEzdKtwDRcl41THWHHthBVTmR02Lpq%2B171Lyb6x4aTf8x0NFLWyg8hIVM6PQN%2ByPO9EyJpxMri1hFVLzrpg%2B7l34QMHGvNxPC70wdEicFdSN6WNlSM%2B4hYfPuuJwGPsWphEvtssL3NHQ29bP32PVGu9H16IepjMwmFAlzFPSUes5BizT08YsdOmt2uDJ4xKOjsfLVinUC7Y04s6Wj9DEhN1%2F0JZwN%2FBfKwveUloABi9flMH0s2b0S4%2FwX053Hhx808cFtPsWivsHLoEF%2BQwHxeK8cccEV750JCy%2F2GmoNB7o43%2F0afMedrW4jO91Q8zwltn2kFI%2BIfwTXI8htoqKUYlFnv708UsQHuul6t21jt16FnInIv%2FpPvyJUAGp%2FPlRDNhz9tRuTgwoAAZmT3gIrelaVZkAy8A1TDMIyZvIfvozLchqQLy7bTMjcs8%2FuCoHE29PmC%2BPs4JSV8CSIUthBltaBkIghXSKN9O4SXMV4ocbemFz510bg%2BKvdmk88C9B9jUZmuFpmFRBXTMEEhbBp%2FBD%2FKvhowU%2F%2Ffxegz1Scgsd3xLi8%2B%2F21caEhSo08YnYmTgoEACSuX4tLwwMSeaPerFBaDAvnKgf89Wxq8RZFP1ujMhPC2ASAdp77T0qnuhGFR0w7Mj4zQY6pgG6kVuX6EN1ycHFqs3EC4FrrnENR%2FERUDs%2FyMX%2B%2BfGzMk%2FRIZJgPckfxUw3aZ%2FrRZ2Ri6dnHghE4DjMe1tMwj6GVf6R1swyiyTcHoPmEpow61FjxYM8JMhf7hHh2vPx3HCDbkOZn%2FjQT9Pg6NyY8D66BaXMpdG%2B7N3NGbKT8ZlX5SVm%2Fntsa4zKF1%2BbJb%2BEB%2FSBsPqA4nwgP61WDIZ0D3BW%2BV8sQRKY&X-Amz-Signature=948cd96bc4c2216627ba3b6cea89e8badba4bfa2f1f09cfb87e4bdf685c9f536&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZA4C4ZD%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T062631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQC73z26vPIeqj%2Fdn8qZztHCI1C4adnQr4I9bAF7W1OiJgIgdX6avQ73muVx9VysFboGY6mwRWQa5UPhQdN%2FkZQnc2oq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDApvaSEO%2FfheRx3q3SrcA8eO%2Fk2VDrHu4ENmt%2FKSj1hHXj3j9zYGlMuIiUSC44MWL%2F8f1uurSNfxU3ivVdussSTDGQ3G9VDdEBveD%2FsxRE5FQbdrQjzLmgmrEOv9DZOebiUY2eaBSiQRbyrPX0ATf4Ch4v3rzAYMLRefwZ0LmRFFipMxVfqHJwgLvF%2FHm8OmZfUZY8bdpBcQKQwyL%2BmoiEPKqFlhxVsuUann2jgdL2H8RxaYmYuVt6OV2qeYhz0bzKtf82DIU5c9Jvuw28WfjczVoV2jRV7zmdTeXRbBp%2F671qLjuxJfv2QSHk6gBHMqk3bUtR0eym4v9dHW4y1DnRjA77fqrhRAipZ58tTP%2FzTVhFvorcfPlecSpn3CjzzXYmY03x04F%2BoebcvHZHddtMOpY7IcvuW8IPKNp5IizfHlUK%2FhT1ker7PrkjoGKEyvDUi9iZZm9%2BrLhEOhSvHXdR0B5Mmj1CpzKEtDWsxvXK%2FdO%2F2HRhCMo6TTBduVlD%2FFvdIVBs%2FmmJ1awIGvOyIp9zh0Urfma9zRYgiS8LpmI0KIVnHvy%2FAZ5L0vhHbIBR3%2FUHllt9UqsOtLosyMCWyIBzN6fUk3DUTcNwi7%2FVL%2BUJLp1%2B4D8OLmo68PdvY3pynE8LPxJ9sisJkd9XrlML%2Fy%2BM0GOqUB%2BaLIObh%2B8KoSaN%2BS1%2BIcs95pW6Ilt12Y5vY8DAUdY9qJva7ySbNQ2gffdwHyoz6fC1U3870dUSydIHsYIfDk0ieCdcyK72%2BTQZLgW5CXIjJHv5u%2FDpgZAgH8fC0uXXbH7PE056bU%2BQCoUBc58RT1u6jvaE%2Br2xN0I8qrIoqvlnt4afJiCMcUep39ZkpjR%2F87AN2MFuh7XS5I5QWcw7ZMtQvs8ruX&X-Amz-Signature=7a3bcebf8cb03125c1fdb68dcd49a811808ede6533a48f2a4865a0a2b272672c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W53Q6PRK%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T062632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQCCfe%2Fi2ID8ZZBhxfZdRx9uns%2BZ2bZh78BVSb6ksea%2F6gIgTvJgu1iRHIhhEHNN3jkb%2BqlSo3Jmka2WCQ%2BJ0Rt0h%2BAq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDAqy29gg%2FATW305KBircA%2FVyXv1nAOivTaBIQH9ATFaHx6tj2gIOZzZpdHsGE9KgMzweBLBTTjn7Ebl0Qnpm62C%2Fko9ZmasPPVDWUAwnLV7hPEqUYcdkMK1oqOWXFnMYa%2BkBSKaWe%2B0d05%2FULD0VNtHcvP4uVc8SbBGbOFlkMZ4rQOGU6p3o5rZZFnA7Ozepa7jX9y9EbQo%2BWCpfo8p%2FHMaDP9dPe1xmh6UdrsvnvHsPdKy8EFfO2lUdpf3MHPE2%2FKB3UdRwY7p3Zukv3DvGcSGTBwxDSo2KLLkfLKDKmSNT846DbWsbWt4gGAJLTNFsxvqMCTAuRaqDxsO2M%2BVbAVzelmfRzuBUx19E2IcgdKt7svRh45gu8pa0tJczxHD4LQA73kAvuXGJAT0a%2FdCzGvgSReWnas8Dbrlb0xpH6XriYwEktzGtWYCBrE%2FpfgFNFgoYMdnAGO3EX5IcrEFoVViWz2yVQEY4RGOBDi3XsS88Y0vrZRetT71wK4hliSpM7LjH19Ewj1%2BTqLVbBqcNX3UJe7CHb3s8ffMGMqGaNXkZmj%2FWtdQVFTjkGeGkAwAVrKP1F%2FycR2L0ZGo%2F4uj0SvBJiSK3WSNfgcRsWj477e69icIaQnMGCGPo4D1jth84Jzy1FYWtDENM%2B59ZMIrz%2BM0GOqUBiBXgLwDWBo8X9iFks%2BXV5dnx%2F16vpBXqdsJrvoUZs1wzD08fZtJoF5fraUyq9%2Blc23xJ9U7EbksFYSxhA%2Bb1oreV9P54TmIsOkjJqxWVY3z596ZEDth%2FAzVRhMxOrq7F%2FhXh7bgEOWrMxJrtRN%2F2L1su%2B7m1zM3XXeT5%2B1uo3wNuxI%2FATRzHrIqafLoqKvX4gKXWB0vvGsNC0u%2F%2FrI7neeK59cRp&X-Amz-Signature=6d4f7de172cbf8eb226adfbd75df42dec6d185da9e6d3c30e797370213bc9faa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W53Q6PRK%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T062632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQCCfe%2Fi2ID8ZZBhxfZdRx9uns%2BZ2bZh78BVSb6ksea%2F6gIgTvJgu1iRHIhhEHNN3jkb%2BqlSo3Jmka2WCQ%2BJ0Rt0h%2BAq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDAqy29gg%2FATW305KBircA%2FVyXv1nAOivTaBIQH9ATFaHx6tj2gIOZzZpdHsGE9KgMzweBLBTTjn7Ebl0Qnpm62C%2Fko9ZmasPPVDWUAwnLV7hPEqUYcdkMK1oqOWXFnMYa%2BkBSKaWe%2B0d05%2FULD0VNtHcvP4uVc8SbBGbOFlkMZ4rQOGU6p3o5rZZFnA7Ozepa7jX9y9EbQo%2BWCpfo8p%2FHMaDP9dPe1xmh6UdrsvnvHsPdKy8EFfO2lUdpf3MHPE2%2FKB3UdRwY7p3Zukv3DvGcSGTBwxDSo2KLLkfLKDKmSNT846DbWsbWt4gGAJLTNFsxvqMCTAuRaqDxsO2M%2BVbAVzelmfRzuBUx19E2IcgdKt7svRh45gu8pa0tJczxHD4LQA73kAvuXGJAT0a%2FdCzGvgSReWnas8Dbrlb0xpH6XriYwEktzGtWYCBrE%2FpfgFNFgoYMdnAGO3EX5IcrEFoVViWz2yVQEY4RGOBDi3XsS88Y0vrZRetT71wK4hliSpM7LjH19Ewj1%2BTqLVbBqcNX3UJe7CHb3s8ffMGMqGaNXkZmj%2FWtdQVFTjkGeGkAwAVrKP1F%2FycR2L0ZGo%2F4uj0SvBJiSK3WSNfgcRsWj477e69icIaQnMGCGPo4D1jth84Jzy1FYWtDENM%2B59ZMIrz%2BM0GOqUBiBXgLwDWBo8X9iFks%2BXV5dnx%2F16vpBXqdsJrvoUZs1wzD08fZtJoF5fraUyq9%2Blc23xJ9U7EbksFYSxhA%2Bb1oreV9P54TmIsOkjJqxWVY3z596ZEDth%2FAzVRhMxOrq7F%2FhXh7bgEOWrMxJrtRN%2F2L1su%2B7m1zM3XXeT5%2B1uo3wNuxI%2FATRzHrIqafLoqKvX4gKXWB0vvGsNC0u%2F%2FrI7neeK59cRp&X-Amz-Signature=7faeba7cfc93d66e617885c065a103dc714859bf8777c491d8757f11ac2248a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLYZMVH3%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T062621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQDi4sbFosj8eREgyuKCTOGM8EmhwuvEHgti6aiDMyWdFQIhALqy2dd7KJbVNHc9g%2F1%2BCBT25fx%2FqiVX58B%2BUC2oDMTAKv8DCEcQABoMNjM3NDIzMTgzODA1IgyyUB1USaVjn0SfJT8q3AMZtk9dd%2B1zTip1%2B88x%2BlghdZjeybAqInrlHVV1OcUF7K4In3z2uncjdf9CsorxOmK9Q8dzTN2u7R7ENtnkvrgHHoTU81giJ%2BVbHaf1Fn5YJXv8EV8E%2ByAOChbx1Do2UVgGtsQyE5CIUmdpI5BLYJdSAaPpZSCgaAZYYf6RvcriSf%2BcGuXz3wfntfacK70YI6Fk13mfJDdaXejxYaV2708AXgxD2ajAW7z6PS4URAVTTA6JdrJqxXaKA5T1dywuhKmwhAJ8o1tb0%2FYASk9C7BLak4u7ELi0iJdKWXAx00Miza0EZOETsP%2BUSQCqt4iiBTF65IMvMFIPpPb6n%2FfiiF5iHZ6pPmzKfTJtevczODhiuZiqiLqUeg9vkYYBS1r3WbiOYGdrfvZz%2BwV46WZTvHHWm%2B7m916HKPs7oYz6bcC0uJz%2B33Fyo2bo2YH8TK%2Fl1092%2FPXHsqUkoObzfVSquXx8%2B1KaQKqRvJQpfQTX2ZukAb9VyT%2BNeeSq3ZtJ%2FjVQzriPsU9PVjoB0ImmS9V6XUjo9KzdOe7c0HPGfwr3kTYKooR2Tb8rqKPmkHwYIuP5e69u1ZeusctivmOeV7JQ1E54Bus%2BUoW5lRvxsE4mrvLON%2FPYHGiy77rtAKCbcDCm8vjNBjqkAc6uUHQrblx7Z4zdeP79k%2FwlX7g7W9ZHyV19EOGrQ7M8jbhJxT9UQH2xLE8UTy2LK8EWciQYaZc%2BQeIAdaivQIbeJ3kqOC%2Bt0gsNo%2BuvtX1ckKfb0e2hTSkIaOkMGrNeaf1FiPk2K%2B7kSdjOB6nRYy%2BZ7JW%2FALJpLOzVF5L%2Bv%2F6YHXd1LdM6MKIqfMpBl2t8isNEPkc8Uoix%2FTcgscXIJ3Bhqi7X&X-Amz-Signature=4d9e1c665e3b6f19bcce980ffb3d4b7644fc9018e0035ef00a2a58ccd8d54210&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QUCZIAJ4%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T062637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQC1RKMwMpTg61RrNKicB5TkeAXa04zDlKWxKSq%2BXDLYdAIgFootyg%2Ffpw2C3BtD8IL9aYQ7bXTOipcHJM1CnubjVzQq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDEmirum0msgQ6%2B4JryrcAxbZt4Ix8ghYuaAPhuvoQWHeAwqoKj89oqBWbVzVpIIIwzMjcfh4FwZ%2F2fzTVPaFpRLNqKpDAgUml1yEGeDooC70coD7KELt4NXLgHbzWqiAWRzPJuad240hxpArJiGYonpbej6O3r8c%2F4PCC8CiWufsm6Zn%2Bmg5XvHD23T5%2BygwS7nINpSEQGAch8CKOWKUIUFXL6khYcrjaxaZlBYlS8yGGXl0u%2Bu%2Fxy%2BmYxWjeAsDHgJdwSzQoa0lUsGvbusanRqaqieR%2FucRxnFTSS351uXNGzDlfyRv%2F%2B8a8rZxny0V0ezNOlc91KHsvfbp8hnjQBo9Ls%2BXwLJjCQ%2Bfb0oXTkoHEp103tlQGybkXvUeTDFt97NZi9KTRCnOPaEKx4tSlIK2RP59MpJ1OIs5t06YfJE40mk%2BdjVdyrVs0LGI7pk774%2FmYey%2Fu%2FKGeN2X3rKrom%2Fpohue3LuNSOu63UfkFmVbg%2F11pjPZXnuIljP0PwHaHx0hWbNOKqUtZWUfPyI4RnbtfIFv3izqiN7pPvS7xF%2BrupA3rG8C2l8jPHuoYDiq4J5zQU4vyabd375W%2Brt2HWe8YjT%2FcE6wKz3rqOLJ63C6z%2Bc8UggDKUJSRvSnYrI597ok%2BE2g0c0IPAKVMP%2Fy%2BM0GOqUBnqi5Q%2BZt07OkUaqx6S0M4AgSFEpd5%2BROWxNafHkfukr0rHJZTnLanhPJ2U9as%2BKQfaJbkf2I8UVeeDMpmnR95QRqgaCXGbHwA3xNdjPP2g3ylYZ2y6GGABovM2dVvuWl0fDfjXy4Zb3xlvTi7RuRsGSBx4Elguz7FQlCX228gmnfE%2B5%2FWvfs97SfyXkcEpV2%2Fp0nXjB%2F9qWWhcF5eO0Y3j1RyfC%2F&X-Amz-Signature=c678a657d74f823363cb1529cd0ed74cdc00cbcfb4863e4ad922c8fe9eef0ac7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QUCZIAJ4%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T062637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQC1RKMwMpTg61RrNKicB5TkeAXa04zDlKWxKSq%2BXDLYdAIgFootyg%2Ffpw2C3BtD8IL9aYQ7bXTOipcHJM1CnubjVzQq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDEmirum0msgQ6%2B4JryrcAxbZt4Ix8ghYuaAPhuvoQWHeAwqoKj89oqBWbVzVpIIIwzMjcfh4FwZ%2F2fzTVPaFpRLNqKpDAgUml1yEGeDooC70coD7KELt4NXLgHbzWqiAWRzPJuad240hxpArJiGYonpbej6O3r8c%2F4PCC8CiWufsm6Zn%2Bmg5XvHD23T5%2BygwS7nINpSEQGAch8CKOWKUIUFXL6khYcrjaxaZlBYlS8yGGXl0u%2Bu%2Fxy%2BmYxWjeAsDHgJdwSzQoa0lUsGvbusanRqaqieR%2FucRxnFTSS351uXNGzDlfyRv%2F%2B8a8rZxny0V0ezNOlc91KHsvfbp8hnjQBo9Ls%2BXwLJjCQ%2Bfb0oXTkoHEp103tlQGybkXvUeTDFt97NZi9KTRCnOPaEKx4tSlIK2RP59MpJ1OIs5t06YfJE40mk%2BdjVdyrVs0LGI7pk774%2FmYey%2Fu%2FKGeN2X3rKrom%2Fpohue3LuNSOu63UfkFmVbg%2F11pjPZXnuIljP0PwHaHx0hWbNOKqUtZWUfPyI4RnbtfIFv3izqiN7pPvS7xF%2BrupA3rG8C2l8jPHuoYDiq4J5zQU4vyabd375W%2Brt2HWe8YjT%2FcE6wKz3rqOLJ63C6z%2Bc8UggDKUJSRvSnYrI597ok%2BE2g0c0IPAKVMP%2Fy%2BM0GOqUBnqi5Q%2BZt07OkUaqx6S0M4AgSFEpd5%2BROWxNafHkfukr0rHJZTnLanhPJ2U9as%2BKQfaJbkf2I8UVeeDMpmnR95QRqgaCXGbHwA3xNdjPP2g3ylYZ2y6GGABovM2dVvuWl0fDfjXy4Zb3xlvTi7RuRsGSBx4Elguz7FQlCX228gmnfE%2B5%2FWvfs97SfyXkcEpV2%2Fp0nXjB%2F9qWWhcF5eO0Y3j1RyfC%2F&X-Amz-Signature=c678a657d74f823363cb1529cd0ed74cdc00cbcfb4863e4ad922c8fe9eef0ac7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VGHB4PA%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T062637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIDyU30nshe3113lMptr3M4i7bBR1%2FlUXmSn%2BXLBFblnzAiEA7ctbXiOpdhrkFP6JTZR0pgZZ%2FiPHgAJBlkdg4wMnPTEq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDOr4sN6EndoE6FyPOircA%2FqNkT9AnJAwyLI4mdwBZ0XVFoI9r76CGYL8ULU2UbocbT68zkeMoTI6SOLX1NNuGKTQ3bT7hfW2bBfWI6Ubxs6VnvRmA5a77AXSHQJeg8t4dMyp1dIlKWELzfxOrTRXP4RrXiuKorPikKkubCCQqf9sKf9Morp0SwqtdwYix5dY2xlNTD7Z0c3nbS8vGmuwarxWmeuenHWc7XdXeCbN9pajGdpcij3glRjQ3q01WZAqtpSnSwIvV5IYJ8RBvjgGLtzy5gdRLGrhhCXcqfRhQAnJq79y86J3VOZHuTgaVSPkFyG14uHjd5wjvNQu3xN9u%2FBboN8g3a73YDpPWTVDLmH0zcnDPGTI4CUXscD%2BVy1DRKebTsApzDuzHUpk4kRAI96A8psF2DL69KQQtkZKdxLBBd9irEOGsfUTdXoFEMhPqGdNOk98%2BRkbZfB5YzJIlqdaiJvEbbOOcSeFendFVloz2XX2myMAJmeX9YBuHKPGlzixBOGORKgxHWjgUVAMRALMxZXdLZsxbOYkmlgxFdXy1N3VRcELw6Lp8NS44ndPRtDsMBIO9XLre%2BUODVm%2FESpPMFeUCY0L0VQHR24%2F%2B9JIDqeodytYOhiMM%2FuGwFKatAjxD%2F4%2FC3D1GJlSMJXz%2BM0GOqUBFvGEcwcD9GIn2fM%2FCx1ZK9u0gb4XX4pmMsvo7ViqqdELg%2BqJPQwjR0AL%2BekdZdiubcwBdNd2w66dDLkJ3UklHWPg90Vgl575h%2B9Droa3tQf9xkUp28ye1xaSQwL908kZaALCfZ1RvuQCAq3i9wx04Bggy7HzLg9SvXLg4UQy3nVE23UZDCGivo0xpdTdhPN8HkbWMEbECqUwAYoLYeiXcevqTehm&X-Amz-Signature=27ec8cc72db9c8261bd1a30337bb2cfceac6d288deb3876f0b70b2d3389db77d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

