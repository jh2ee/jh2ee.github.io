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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBAYFLSH%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T194638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQDljE4ybobxnk8GIUGJxsZcS7DxkF4OwFUH1UFQFtqz9AIhAOTfpKI5ZbEAb0%2F1d%2Fx7Xy96oKCtNPEKkuho7%2FreTsLZKogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwaDQbVoFJkatgweP8q3APCA4mmRauGmlM2oFijwHjAwcFvEcyCFRv4LVZfSgHmCRPKexLCAXXjJofad1mSt1xkAQZXBt6m9N5ourMzmilyC%2BlbNcT0L0PiSwAcPvAbFZAz3%2FJWWNxXgL2OJqPXJTBHfkxAxOpBDf9NdNs1RYUcKyFUYp47QYmHuD5VIxMPkQqq3JcRU4ytqhZqq7aQEOCxLZxKnZjKLmUrhysSWTH%2BSJwXm8H2GLXs4TM7t8HOjjDpbsuwtmKx8yRb53B2BSUqczj4AJvWC5WhidvnkRnanSM5MI%2Bb1dVUbl4U61IUWuFMDSvzvMXzMm6YlDwghxoXbzxU7QRkVZqPbpWOIq1QcUrreK1ymV%2FCYeoYUk8BbiXLWVHajD2VmvgYVXXuF8ZJe5nnlmA9zX50KLRMBgmegn7wHyziXmv40RD9Lq5OJaCQQTOkw%2F%2BzPw9dy%2BFQivV8HoNOAkDygstAGFAhMnlmSvk9Uw88M%2F7v3Dco0xshIZ57VVpqsOQPPt86LVfFb%2BrHGHt2WGaC4J9K2PC1tkF4hXjCPrfNjgj4rOWX2CT6RKOimw6JhaZsL8ht0jqTypu4bP2Wf%2BDySr1yzTutx1VySWQ17LOoGRDva%2BTibMDXFbNM4fsQuSAD603pPDCqnNXOBjqkAcl3X01QIGJFzmTq0bvKyaRJd%2Fay0FsKVAuJtXkM1w6gpnj1v3oTKIcJB2%2FXHHGKpazuQ18dqSis%2F7tH15G35AylST8VAfd7A1VcEtErftyfG%2FwSAP6oXKEmKlQAVTPOxPbIEhH%2BcJoBf3J0nb7THGzCXDOeHpQhnZqLu1tqXQRcJ7sYU7JPfYBx%2FxfTghXzvpQX5PIZJXmYsDm7xEm%2FoH%2Bwrqv1&X-Amz-Signature=ad8239c156ef51ed06bf136e77c7daa67ea8887baede1732f550bb7da8acbcbd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBAYFLSH%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T194638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQDljE4ybobxnk8GIUGJxsZcS7DxkF4OwFUH1UFQFtqz9AIhAOTfpKI5ZbEAb0%2F1d%2Fx7Xy96oKCtNPEKkuho7%2FreTsLZKogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwaDQbVoFJkatgweP8q3APCA4mmRauGmlM2oFijwHjAwcFvEcyCFRv4LVZfSgHmCRPKexLCAXXjJofad1mSt1xkAQZXBt6m9N5ourMzmilyC%2BlbNcT0L0PiSwAcPvAbFZAz3%2FJWWNxXgL2OJqPXJTBHfkxAxOpBDf9NdNs1RYUcKyFUYp47QYmHuD5VIxMPkQqq3JcRU4ytqhZqq7aQEOCxLZxKnZjKLmUrhysSWTH%2BSJwXm8H2GLXs4TM7t8HOjjDpbsuwtmKx8yRb53B2BSUqczj4AJvWC5WhidvnkRnanSM5MI%2Bb1dVUbl4U61IUWuFMDSvzvMXzMm6YlDwghxoXbzxU7QRkVZqPbpWOIq1QcUrreK1ymV%2FCYeoYUk8BbiXLWVHajD2VmvgYVXXuF8ZJe5nnlmA9zX50KLRMBgmegn7wHyziXmv40RD9Lq5OJaCQQTOkw%2F%2BzPw9dy%2BFQivV8HoNOAkDygstAGFAhMnlmSvk9Uw88M%2F7v3Dco0xshIZ57VVpqsOQPPt86LVfFb%2BrHGHt2WGaC4J9K2PC1tkF4hXjCPrfNjgj4rOWX2CT6RKOimw6JhaZsL8ht0jqTypu4bP2Wf%2BDySr1yzTutx1VySWQ17LOoGRDva%2BTibMDXFbNM4fsQuSAD603pPDCqnNXOBjqkAcl3X01QIGJFzmTq0bvKyaRJd%2Fay0FsKVAuJtXkM1w6gpnj1v3oTKIcJB2%2FXHHGKpazuQ18dqSis%2F7tH15G35AylST8VAfd7A1VcEtErftyfG%2FwSAP6oXKEmKlQAVTPOxPbIEhH%2BcJoBf3J0nb7THGzCXDOeHpQhnZqLu1tqXQRcJ7sYU7JPfYBx%2FxfTghXzvpQX5PIZJXmYsDm7xEm%2FoH%2Bwrqv1&X-Amz-Signature=ad8239c156ef51ed06bf136e77c7daa67ea8887baede1732f550bb7da8acbcbd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNB43LLX%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T194640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIH5687VBg4LzwdWRqiLrly3MklgVEr5wNKQjxwdC6t%2BlAiEA8jD4v3ilErpYWdb8enz3tl96lkhKGWYRnn2r1hpnMDAqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO%2BIaBQ%2BGC2ZgX%2F5LCrcA3t2nJjJmWOkthgZdINLJXDjLKbt%2B%2B8ebk0%2BBYTS9eoCS%2FzHhXkKf8HOJCJE0kT2Q4w%2F7gPgNFdFNsPYct%2FLySWBwiiBGUK426GoXK9BoMQmvvnVMW5z%2Bg0%2F8k6SYMefvzCdukiukUXvrsDivEp%2FXZ%2BXfozj4MvLCWkbQ7VOuq2N4HAwjO85VTYY2On%2F%2BqD%2FHyYRgtu4vfYP7AMGxsbUUrN%2BeQ8fBwiQIkyOCd13ydAjXF0Ijyg0yjc5vkoBLI3XCEpyl0h0Rk6JqatgalkKmJn1eclM6nYMjAGH29DyCIW8FoxxtOKWtnMw6VORgYoJUSExgq5beVrr8%2FNmeJeHMwqT1l6mX2zcHMCj6U0VnBuq7pCpJdpegUMKQ15XlOh%2FnfXIuF4chwd2aQ0dkR1wBQ%2FJ6Qh7DHsk6fPb69UAFs%2FJX116NbUvsbEgqgPkmHkdOkdSvU%2BwTXun0xHf9hmbk1DWbnzcWL3g9%2BgohU8RQ5ZGbK7yIeVmZCQLC69zB1T7Ig84V6V8DIaO7HpwdHUxZh6Iv3%2FuIjbVDDS8d8xxvmmmNfW7VXs0EyGwCD%2BlxO%2BwGIOb84P4YYmUuEpbUJdx5jK5m7H4YK9v1jzyD0AakFvVTK0i3bhbU2H%2BYobKMMmc1c4GOqUBHqPzC39FquMB1pCFG70iaAYJqdW7cAHwRBvY04F1rkZUdcP0tKRt2bWLLqoMn8UHxiPEG%2B%2FmE0yaFhWnZnI9jvTPB0uRtYCzLuW2iemIq88IhBEo7aN37hhS630dfowTj4%2FCEyU5NQjTuV2y0yj2EpJY%2B5p5NsUEp%2FPof4QO3B6M%2BNlPHzh5dOAxoGjWdZUKLzdO5xkzr8DbfH1Lz1YXXJRiNC5y&X-Amz-Signature=65d605622f2da2ca89219c42d82d64dff239711180fb41f5d0cdf440e0d0df1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWCATV6H%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T194641Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCIFE2ftea5U0Zm0qkIefW6amPiehlYbDnWMC50k2l8p0OAiA3anvf1rJ4WpGG5RHHXeDAi1XG6ExVX2zFwr5yDw%2BJ2SqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMtMjN4i1MkWr1a2A9KtwDW3H%2BLmm7f52svZTwX%2FbabdzgJPY85ZGIpShskHvYaAMgsf9AJTUdvbZuLsl%2FrbyiKm30%2FEiaBjXGyGazstSeoZuKbcOf16S%2Bp12OeNyPAzC8Kae9vRmfLY3wsdOwnViAtYwkfPACLALE8%2F1iCWtDoOQcxryGB4PQXTbqXwgq1tQE9wFzK622CKhxd5OLbwuyZqkD2LM6G7%2FQ7BEOHcEZxVJrbo%2BiBHaas3MCsQgsv0TnLQ6E%2Bcq13RjCYGAmPPE3v8gBXASSK%2BeJmGxbv4C7Dyy0vsHXaZMQbeEfn9Gd1fR90egUOu5Y4isGBpLrMgMbFDeGF8%2FpeZ%2BX9Kzd6lAbkv%2BuIn9KfLS8%2BiBHV9rnOZ%2FCNJGrUEFEhLPTJ5QZy2Wi07GP%2BPrnIo5DJUeisEo24Zeu8HfcPmtSUUZKHMok8cL%2Bx6tircxnPM1M7j0IAgeM19ky4Je38xnA6goU0E3U%2FW%2B1mRutAC72eparQIs3ZnL8MA3i%2Fki3IVyR0w0yLjUW%2F3L399P%2BlRNKeMM8hz03ngeUsS7iz9bF8m9nBk3driZxjvy5vLoeV7B08obXrCeBFd7YnReerJ3K8XkoAHSIWXg5LE6nNyHBYkORbXCIpw9NdKVUX6j%2BrU5SAfUwmJ3VzgY6pgExbXW%2BAmHrN4nwtboHiXTmOFQRId7MVqZB3K%2FX%2BKrVKLM7Wxzr2Ywp6VvLmT6yTSOlerFTH%2B%2Fws2CrjNudHGExF3jpaJ1iPC1d1AG6Og9yBTGxBE02vL6TKgsDbkoPa%2BmZl4R%2FiUwyVGNpaNDN1XDBrQipRbooFHtP%2BcGmME0kNy24twgdVaD7hADiGv9JGb3GPmbH9ed5CFHCqMuYiVqpXBmJV7F1&X-Amz-Signature=14c36a6458edba17031dd44ce70f1c69756c8fa45425b1953e709d3148313c3a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWCATV6H%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T194641Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCIFE2ftea5U0Zm0qkIefW6amPiehlYbDnWMC50k2l8p0OAiA3anvf1rJ4WpGG5RHHXeDAi1XG6ExVX2zFwr5yDw%2BJ2SqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMtMjN4i1MkWr1a2A9KtwDW3H%2BLmm7f52svZTwX%2FbabdzgJPY85ZGIpShskHvYaAMgsf9AJTUdvbZuLsl%2FrbyiKm30%2FEiaBjXGyGazstSeoZuKbcOf16S%2Bp12OeNyPAzC8Kae9vRmfLY3wsdOwnViAtYwkfPACLALE8%2F1iCWtDoOQcxryGB4PQXTbqXwgq1tQE9wFzK622CKhxd5OLbwuyZqkD2LM6G7%2FQ7BEOHcEZxVJrbo%2BiBHaas3MCsQgsv0TnLQ6E%2Bcq13RjCYGAmPPE3v8gBXASSK%2BeJmGxbv4C7Dyy0vsHXaZMQbeEfn9Gd1fR90egUOu5Y4isGBpLrMgMbFDeGF8%2FpeZ%2BX9Kzd6lAbkv%2BuIn9KfLS8%2BiBHV9rnOZ%2FCNJGrUEFEhLPTJ5QZy2Wi07GP%2BPrnIo5DJUeisEo24Zeu8HfcPmtSUUZKHMok8cL%2Bx6tircxnPM1M7j0IAgeM19ky4Je38xnA6goU0E3U%2FW%2B1mRutAC72eparQIs3ZnL8MA3i%2Fki3IVyR0w0yLjUW%2F3L399P%2BlRNKeMM8hz03ngeUsS7iz9bF8m9nBk3driZxjvy5vLoeV7B08obXrCeBFd7YnReerJ3K8XkoAHSIWXg5LE6nNyHBYkORbXCIpw9NdKVUX6j%2BrU5SAfUwmJ3VzgY6pgExbXW%2BAmHrN4nwtboHiXTmOFQRId7MVqZB3K%2FX%2BKrVKLM7Wxzr2Ywp6VvLmT6yTSOlerFTH%2B%2Fws2CrjNudHGExF3jpaJ1iPC1d1AG6Og9yBTGxBE02vL6TKgsDbkoPa%2BmZl4R%2FiUwyVGNpaNDN1XDBrQipRbooFHtP%2BcGmME0kNy24twgdVaD7hADiGv9JGb3GPmbH9ed5CFHCqMuYiVqpXBmJV7F1&X-Amz-Signature=662e2a0411c5da77c97b59ad639427ba8a86f318807a6bd72bceddffd152627b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFWORXZ4%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T194641Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIEZ2KYky%2B8w%2FE163a%2FLlQO4HS51G2J7SEyijyqvW16ZCAiEA40J1ViNNnBevtkCShEheGnneY6vdmoHtydJGSaqF%2BSkqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEsMuUobCOTMSbwdnCrcA5arS4vOpi6a1TkffQ%2Fn78PzEW4pOcq%2BIlMVsE7mImXfynFnuttNhJcMmFjr7onb9HzEZjZxo3zckrIF%2BPUyK1TDduXVCX313O2%2BVxFWqqO5d1Fk%2Bhn5wKka4XZS0E4MkjTU3X2fLltQrZEaJRkDlqo57nWr1oyZ%2FrtHCFn4xoqoMVk98%2FJIkgyktyJVJZ6uGfGVUWz%2FP1Ey%2BZt2mOzovetX8ePJfziRP%2FiduopwyzbtzQKKT1bCHx8ppy195TO03rl1n%2BNThv%2B2QC0WhwGM%2FqjaA8Icg4feKjcyszZ4%2BaH4qKLFZ5V3w%2BnbAUDtmwHJ%2FeGScfuviVUTLJdP72jkR9Q0HdOFcYL%2BgvPCecBPaJWHR7QQj0pufb4tDJ7wCGjQwniV6zHbNx3gjNeiogJz6%2Fm5LdW5XvYczxl0Xx2zD4t%2FNBMcunkNce5nUOV10M1znU%2FH1XlFOMtYa5CPC%2FrmdWPxCB1BlI%2B3sVwcRlKutHohwGsYyfxHgOppAr6mD%2FS8s5kwIgDLTGr6NO%2BaF9k2W61pOrzQTr%2BH7UVtvNOgNOwAOdJn4chTtIsfPsec7SY10Ih95oXzEQBKIWJRcZjnTGh4OVdBvzFYlSc7Q4tEYUd4fo82i6W8AMraSIuTMMee1c4GOqUBrC09Zfol4ppwkwmkVg6ZL1uvUij9V8dc%2F2xjy0iYG5fxxij%2Bt3qQrl%2F5wJ6QgPMB%2FpSn8dzkAKo%2FUmWnodW7C13LbY9d5AahomcCfqDxIHLVveXmcJAWzbl%2BMhogmI%2BdAJQ8stFk%2F7il8V5i0Jc2hZrjGcaZ5JMyFqfskSSNeoApDtpGhJyxSSbizDj9Ee8VHDFAvMn58burOxbkdP5INrmuPu2f&X-Amz-Signature=9b6b14da043252a1a27053e4b7062c830ff3ccef09fe3c2b47cf99a2ff31933f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRHMXX4L%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T194641Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQDi2nsT6BRNHlnQFMJdNsCsuungOXcKDqcxUEMbHQOfegIhAMIaein%2FoWzjYvoSH%2BwSG3Q9VhhCEE%2BFrlrtDMHmNgEEKogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyh38lCNiyZULBoUmgq3ANbIRRWn2%2BBB30Rc%2FIA4%2BG%2FoKXuQWzJSavHLWJlJACn0MeUz0UA8oINpAs3ze5LazzoY03u49rOLyy8znj9TE1xly6Y5zZonwNgSTdIfMUzgf5Bietz0BFz4QjWULo6%2FuCZl2ViEYIK82s7fylSCFIer5coDquhylQWtx0LeWboIvro3VnLmoTa3285S2DbLtYoqvlLvDJtUNDpnR97Cc%2BhHjfpCFU5SmSlG%2BCaiz7aUTgcWPe5Ero%2Fu03PKSKY9dopogFdCYf%2FTfAfqapIpagdzsPVjfzs%2BYNAMRSZJeSB3phDAYOAXh0UvYRS0kJ%2F1M9Kgon6R4TwnGG5Z3G%2F3ogAcWRbj84vukwQt%2FUke236fA%2B6RBP805RDMz8Xa5XVGO5%2BYVDa%2BLNIa6AlW%2BtjdMRzDyro3U2DiGS3e%2F52ri3fQuIjRhBEKAvdLbsPWzJBqdKAmavt9AMLdxGOp245qXeB75jAPGsRGYN1rX%2FHW6jFBaTkGLBYyHyNIoUMpLtpJZQbZAY1vvMfPySPwbv2w39FgVjfKo85bukEnVQBtiX3or7U9ycScK50B5P%2FBEfDnJ4oQaTQTN2Imf4YPVVF0FaOIPp5DNJqd1SLoSrN8zT0szpiNBjwvieioAbXpDCGotXOBjqkAd1qzihUjCZPuOZbftCndkcNmwlJlYIkBPa5DjI1Q4NsxAAfbbZmMvbUoVMVfBLWlYgdjnUcY4j690Wnc2UPucT%2B20olY90LYB%2Bbamrso1Es%2Fmk1LJoYkG8jWziFWuHKioZ0VRGKXT2a0c7lBHPwIH7UFbTeinlzjgQ%2FXW2DKi8BXBmdXBESA%2FQzbSSCEQyzjhCxE3w91oHjp%2BzKev3iQYUtjkA3&X-Amz-Signature=be9da6e7323d5bc83a30a01bd83695cd2e97ee2910fb328382c9f95176f9df85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVGRV7XC%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T194643Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCIE1wx9xnJ9GW4LQaGc48WsHA3ZXW04Uzye9q8vg3IqhdAiA3dtAs2Wq0tKr8w1kmHA8xO98RonGKbvcwwzgSJCqFYSqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnFlMgDvQ5gnqyc6lKtwD4QKKcnuvJn59dYciKqbk4SCp5tPWJijGdu4yQbLlNRSP250xwEpnMdXfW1zcP9dLVBNE4vj9Eu4OUsD30FqEX%2FbYGFYpkk5R62VRoIVsQEtcOHnALVcP6oYPQdFoaVu6HNCbhDgP2qKXKbKP9s5dr55cO0tLB0ZBSgR1m%2Felh8eRzS4s5gAt2ew4PHKmeJXXKmuKL1gR3gDMF77tiGSIC6CLDGpiPq%2BI9vS2hFpfcse950KKxwNSCgGSTy%2BIKQ3ecm0A9q%2FNpGfGInEDrE45t9Loe4%2B28zGCnwJdYHis2OfmKNzH57toEQeuWhsfNxo31uKkzeupUlSrR76CQijwVkR04d5w4dN54VcdVBtK08oLW9ZMDaeSdDAMUI%2FoOQHXJsk%2BuxgzKpaGB1MEXPq%2FFUfrJPJBfsWQeitG9Fe9gvBlbFcE%2BbKLp2lS1yRPtUf2e34ttZ7%2BoZpXGfmDpR4mWmZQ7ixZqdRmdbAp%2FQ%2Bb9atccVoaA%2FRPWkg8pSeUp3WhHpuo%2FYAkr8p05MpYqniSpVStlkSKDSzcflwKcumjw5MJ9OCp2EHKlCxCM7SOJvEk%2F9j1ObH4FfLyLmEPb1teEoii9HqH%2FlFQSanj4x%2FU1zS9Wfakl4Fvhb8VcKgwrp7VzgY6pgEtZdz8kf1qiCBwgUHLa6llPjbPOE080XQdAeP28mPSAqEyuTM9uHSZ7x062uLS0tCitXl4fDotX541BOLJsDy2gvToi5MezwgNwVefZYOec%2FsYCgNjtfktaHpEDfc36S%2FFFDmEPedKIXlfClnwC7t49O8F9sJ5zvuq56UrYpowivI7LvCuPpdACh4dny29%2Fi2oyG6jCuZa57TGMgIggujAkZS9lxBN&X-Amz-Signature=61a6adbe7c048a03053a98937fb975b11a14e9a1785e52d9e3bcb654068d65a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRPXBAHQ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T194644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCIHCfdg0Yd8c%2FYDgUOGIq%2BPE01jH1EEEtPw%2BZCPg7wVq6AiA4Sslpe9JZQD1YzAF%2FP8VeZidAq2ZDsxeXn8Wn6FP%2BtCqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM41rhST31SVevc%2FvRKtwDIuxB4v7uGJN1imzDRnv6BvU9O7D0U1v4TgtN9b8bcPdgD8vqOB8fQVuoFookG45Q%2F236QGgReQsZhoocULL0gqIIdtwXUmSrejaxU7FWzjdGR7zraijrJNJsc6E8d4PqR4y38h27yDPaatH5P6EKAdDqZAhES5kIZ19CtgtqTXJt8TQX9P9ohU2%2FrRDEav1JIlLKeOkXIEOAMrgGADIg4YqbQmAyiOtZ4PSkxUXkpo3WmFyiwVo1lIqhyQ%2F2JajSSUsUsKNhq%2Bvt%2FfLsoRa3gqgQDBvpvvFbxsSXTsh%2BOS%2F8hYsfftwAT3An727IQyZheSpYi5oIZCexKgseurero7RjIc2Jp4pyjfOZuvZRF6BkQLgOp80CrCptdgEzioO8kGVwgwLWXGhCH5Gx0x9V3iq3E1xL6u%2F1hae%2Bramu7YqCbAYOQ8m%2FNn3o0npPiFwxfM07vqBMx3NNeuc71AyfrhNm1Ly4wAKBRYek8jAXkdhljWy%2Fof6pEE%2BSLfecSOsnZvt52cN%2BhgBbOaiuI3DSzsD%2B5EgCEMxm%2FHtL5k4o3Nudso9pkjZ5ZNlxyIT3mqHvvBFowqfkJHRoj7JwjNMnqWn258YA1V6w6Ya7jFLbdv8nbQ3Cz4rMTDLXjdww25vVzgY6pgGaDQpNubGeWVHjvB0h%2BrXIvULHGeVoDUyt%2Bg7k0qrciUEg%2BW%2B2SFN9MEVpLvefPu5PUWNTx%2FpTyg8JL878oheicnKiWoeQ23a6XVuuOE%2B0C8Omq8%2Fa9XrSZvnT043B8w6CUfaBAt157z3H6c3dWLAO7bq84xnjZhVS90UTYYmMdB3NqywIEBW1xd7%2BfBjFQY%2FQSDgoqew3kFS%2Bm%2F6hdfCkaQE5gSYa&X-Amz-Signature=56204d9c2360b06cfbc4e7dfc0dd7fd216122e3889bb8b43b38e152442ff7576&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRPXBAHQ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T194644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCIHCfdg0Yd8c%2FYDgUOGIq%2BPE01jH1EEEtPw%2BZCPg7wVq6AiA4Sslpe9JZQD1YzAF%2FP8VeZidAq2ZDsxeXn8Wn6FP%2BtCqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM41rhST31SVevc%2FvRKtwDIuxB4v7uGJN1imzDRnv6BvU9O7D0U1v4TgtN9b8bcPdgD8vqOB8fQVuoFookG45Q%2F236QGgReQsZhoocULL0gqIIdtwXUmSrejaxU7FWzjdGR7zraijrJNJsc6E8d4PqR4y38h27yDPaatH5P6EKAdDqZAhES5kIZ19CtgtqTXJt8TQX9P9ohU2%2FrRDEav1JIlLKeOkXIEOAMrgGADIg4YqbQmAyiOtZ4PSkxUXkpo3WmFyiwVo1lIqhyQ%2F2JajSSUsUsKNhq%2Bvt%2FfLsoRa3gqgQDBvpvvFbxsSXTsh%2BOS%2F8hYsfftwAT3An727IQyZheSpYi5oIZCexKgseurero7RjIc2Jp4pyjfOZuvZRF6BkQLgOp80CrCptdgEzioO8kGVwgwLWXGhCH5Gx0x9V3iq3E1xL6u%2F1hae%2Bramu7YqCbAYOQ8m%2FNn3o0npPiFwxfM07vqBMx3NNeuc71AyfrhNm1Ly4wAKBRYek8jAXkdhljWy%2Fof6pEE%2BSLfecSOsnZvt52cN%2BhgBbOaiuI3DSzsD%2B5EgCEMxm%2FHtL5k4o3Nudso9pkjZ5ZNlxyIT3mqHvvBFowqfkJHRoj7JwjNMnqWn258YA1V6w6Ya7jFLbdv8nbQ3Cz4rMTDLXjdww25vVzgY6pgGaDQpNubGeWVHjvB0h%2BrXIvULHGeVoDUyt%2Bg7k0qrciUEg%2BW%2B2SFN9MEVpLvefPu5PUWNTx%2FpTyg8JL878oheicnKiWoeQ23a6XVuuOE%2B0C8Omq8%2Fa9XrSZvnT043B8w6CUfaBAt157z3H6c3dWLAO7bq84xnjZhVS90UTYYmMdB3NqywIEBW1xd7%2BfBjFQY%2FQSDgoqew3kFS%2Bm%2F6hdfCkaQE5gSYa&X-Amz-Signature=efa06c3852592382da46151d1813c404def1cf6c9f2d2232aad912cd3aa7f039&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKV7VLXZ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T194635Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCIBTFRyiQ3LvWqZdPBzZeGhCwd0K4Cp5ass%2Ff6N3ZKm4KAiBRO2sMb1FYNnAdbR8z4ImhRGICn3SjHaM%2BuVzjpqXagSqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMmM%2FBoVwYn6NmsH0VKtwDDhSJspIsjHAfs9AQ%2BOcT8KqeS2aAwMpYkoyaGsYuTOPPrTk3WAvd4xc87RpnsuHxCjgg7SLOQoLnPyLan79l3VK9i8V9pc%2FotwRJojkcM7ZlQS%2BK6W5%2BhQxsNxRjhSBbcZvw7cv8sgq%2FoiHtPnQ2b3wyTbnP0trtq2hIArU6BV%2BvWx8Jx9Qd57d9Z%2FYX8nY7HR5zcErzOK5s%2FwyHPxRhez82Q35ydeYXJ4P9LqHKOip60dbPLnVTwU%2Fm5oVr5%2Bb%2BtSa%2Fl5kODb0lMxwj2O4CLSJLhC%2B55lAIFpLPPSsT8%2Bj%2Fd3VBxft%2FN6cxCdQPrxyMnbshS3M6C%2FUWQSHd%2FdGa3JFYrVQalvAMhu%2FHkY8UlHZMJf4S5PoyKshjHsA1n%2Fve55ejFDsn5fAfrTdgESI%2Frnd8fGrwlj1Ys%2BUHsRl%2FmXlqxcqmGqNp5XCnuCzdRqWpo30Kt0lO4T3DkiLJkJL8EzqcOX810cqjXxSvgenKNsNZCXIVT68%2FDKatVmJKFN6R%2BP3GnOFUSC8Xi4sOPG4ASjpYhVmmf%2FzS4Nrmsivn8AknJCEvLJ636coReA9i1Lg68cdckkDhlGk2GaREkRbi1%2F7aQNnPNewv8Hp9qihutpvdL0RrKFVXeH7aIi4w35vVzgY6pgFHrek5IJbw%2FyHAdPumuyY%2FagrdrHL8g2aAtDlCSWOYS2H8oI%2FLvudhymWvA4uKcaCMI5ncmSbTRBd0Twudee2NHHpBZ3hkV7dbZBvl%2BnljpardkWX%2Bp7%2F5kdIRiSwsY%2BtIeGcDcfhBLz%2BOtQCSegRoS525Ot7ba%2B5RUGPnx8w2JEEiWsjZuojF7sjUW5L6o9qEQ4EVIELajY%2BhM0CYEdqKW2qv9iPs&X-Amz-Signature=79fcdefb49fda51e7f94493d7cf4d29d31631d093086bbf4e4f9b8f38de014ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664AVMHLXK%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T194645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQDqFOM56IjbsaPQXLSxP53DQoEf5VQ3yxIpTxMPVjHTSQIhAN3WpTNkwIwhLZGSAp0inskgdlPCnUV8HQYof1BB78b%2BKogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz0jUJlqaGj2RuFYmwq3AOhHCFEUjXSEVdC6%2BL%2BdvZJJjVnWFhsBhzf0%2BTATWtufvihlcMM3R%2FIoHxCF1hFLvEJbn%2BBdcRlbUe5A%2BAsWq5ZSxZMR8FMK%2BhispLy%2F5XvsJ3TiXQPZ7pId5KM1vAFfTCd%2Bdbr6iKPIl9kQTG03XmkNZA6JUJyKIeqnnU0jrmsKWbCHL2dQzfleIZn1iggODp1dKXnth%2BEuMYMkJSU6%2FVDIdMOKhTRkm5dhoEqSBPQA4JE6vqaqlhiTECQ0OE869SJiQjJypZZEvVc1aSz7rwUqz7k7Jj8pChIIJT7vyfAsC%2FvXKu9WE0NydCDcCUFWity4nx6AVALB4qL%2F4LR7mnZBkyxhYQPP1drcqdQTVHwiOV5Rz1nb%2FbmzVrsWaYugdHLEqRJNeMrLkKNL7xZJhxw59x7hwjCd1LZsRSB5mBox%2F8i5ckB6LN3QVnGp%2F5vCyoBvSZWohQMv%2BEaoFdV8mbS5TYP9rvRWphexIqBXCHv1GNO2%2B3VaZYiuqk0PDCwob86r%2BTKtyfsO6LwGj9fd6zcmvZknGfD4MX5gBfrpnoKBdI1V18AQVs7dZM0YBQabx0KO3vZHuTRnR1XTLUL0pjXcN1VtCDWZd%2FMKPdnaY9ysrqNi7V%2BOC%2FE%2BvTjuzDJnNXOBjqkAcolIv7Kg6mLdlj%2FnB8zz9IA58wn0h6DRaUCv2BtJ5ZAMPHiQOS60jAlZ2xhhHrQRpABSngphkanS6KvVZtTKUjJhuGXyYamtjIJk10w1FUoSHPNPR3JkGatJ1VoH2vIM8AIisE9hzIKjJfGSYHsx1I6KrYB9rxj1d2v43mFdH8JEO8DXg9k1BDJ6lGg3Toxw9F7xonVTfPY3JRP14atdEAuvnmb&X-Amz-Signature=5da7eb1a74f01d36852c96eca83ce7ac1a544eff25c0866de43a16f62d2c0ea3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664AVMHLXK%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T194645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQDqFOM56IjbsaPQXLSxP53DQoEf5VQ3yxIpTxMPVjHTSQIhAN3WpTNkwIwhLZGSAp0inskgdlPCnUV8HQYof1BB78b%2BKogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz0jUJlqaGj2RuFYmwq3AOhHCFEUjXSEVdC6%2BL%2BdvZJJjVnWFhsBhzf0%2BTATWtufvihlcMM3R%2FIoHxCF1hFLvEJbn%2BBdcRlbUe5A%2BAsWq5ZSxZMR8FMK%2BhispLy%2F5XvsJ3TiXQPZ7pId5KM1vAFfTCd%2Bdbr6iKPIl9kQTG03XmkNZA6JUJyKIeqnnU0jrmsKWbCHL2dQzfleIZn1iggODp1dKXnth%2BEuMYMkJSU6%2FVDIdMOKhTRkm5dhoEqSBPQA4JE6vqaqlhiTECQ0OE869SJiQjJypZZEvVc1aSz7rwUqz7k7Jj8pChIIJT7vyfAsC%2FvXKu9WE0NydCDcCUFWity4nx6AVALB4qL%2F4LR7mnZBkyxhYQPP1drcqdQTVHwiOV5Rz1nb%2FbmzVrsWaYugdHLEqRJNeMrLkKNL7xZJhxw59x7hwjCd1LZsRSB5mBox%2F8i5ckB6LN3QVnGp%2F5vCyoBvSZWohQMv%2BEaoFdV8mbS5TYP9rvRWphexIqBXCHv1GNO2%2B3VaZYiuqk0PDCwob86r%2BTKtyfsO6LwGj9fd6zcmvZknGfD4MX5gBfrpnoKBdI1V18AQVs7dZM0YBQabx0KO3vZHuTRnR1XTLUL0pjXcN1VtCDWZd%2FMKPdnaY9ysrqNi7V%2BOC%2FE%2BvTjuzDJnNXOBjqkAcolIv7Kg6mLdlj%2FnB8zz9IA58wn0h6DRaUCv2BtJ5ZAMPHiQOS60jAlZ2xhhHrQRpABSngphkanS6KvVZtTKUjJhuGXyYamtjIJk10w1FUoSHPNPR3JkGatJ1VoH2vIM8AIisE9hzIKjJfGSYHsx1I6KrYB9rxj1d2v43mFdH8JEO8DXg9k1BDJ6lGg3Toxw9F7xonVTfPY3JRP14atdEAuvnmb&X-Amz-Signature=5da7eb1a74f01d36852c96eca83ce7ac1a544eff25c0866de43a16f62d2c0ea3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFWK67IF%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T194645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQDWXCJxDeEHbQmgSzLoe%2FRx%2BVJaLI1kHVdShJeGkK%2FKKQIhAIFlKAv4gUS9wk%2F3HUfqtqhwXBy4O4Go203WIr7C2w8LKogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwIMOv4r1HMw4o%2FKrwq3AMkdbpQ%2B0MZS2l1Da3BS9UTBlVcRgms%2Bb0M4s9m1CPA%2BJE1WJnfmssLkLiEhVQ6zT%2B8F8ulNTQM6XJ2aFRY3NtvLXmZTy5K9g5pkAzX1F2u6Z6tB6qwTopzOSPvJcApCk%2BtXNl1e%2FHVwp8f6%2BCepDIAM0tbIiJ9JrtYA8m19hvu%2FI7nebzFVXMIsh%2BTgWu%2FblMm0LHzchSET3ETeWGQutA31MAaHBfI14BeGMp4dYhz4g1OSf8iIOYts6Sopy9QXBQLWH41U7Xv4Ck%2F3kMIrjhE%2Bsq3bD7vX9fxiDk%2Bn1RClrvR%2FNtWo1ggaLecJY8u6SbsPDLbQHetzl5KEHsoqPtJjE8Qk6FI81HMCoPzDuqNfccspe6mVTvzesKD7zspHcjUsymkpc%2FYjUVDyvwu2AnTOXsWF7OyctXB5rAUdop9%2BJ7%2Fwa4CocUv9qn4S9sCOxgnjqVtd%2F3E06TWwomR3fKuSnk%2FK4gsQuJdMZXAfRJvvZ4GzVH7c8MkQrW4Q4oWaYXIb9szReCoSIIrkpBoM1gR8mlkjkIp3TmT0Q8z8wiLAdo5qP6K9fSKZgSfOFRm%2FAfkw2wbNcF%2F669g0RWNiyMt6SybCHvCznlxDfIcWO%2BemQNllWx7HpGHv5JFRTD9ndXOBjqkAWhZ1NNIx79ESzofQY1FfjMtVMeP9qc3yRyBmmw9i%2BFNfT6ed3XMLiy0ZsTpmQV2P1qBR%2BQ25i0xwYGYl58N0Z7tdGC2IK7C9gVtdPYSnKguISiYd6vKu3Y4CxB1SAJAHTL975dTIT3kvX3rWg2kC%2Fzid%2B5UUxI8hskzbkitJ%2FeTlPiv9J8iPDg5s6X1zOwclkwbu5tYQamUCXRwYM6WyopUBH%2BP&X-Amz-Signature=b4c734aeeaa4875c7bc12e737c41c2243ce32398469778bc31a81f2f2fadf91d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

