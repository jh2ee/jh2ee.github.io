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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGB5WU7T%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T134934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICB6m7KrLIcWlJtzl4%2FyajiUIc8GjqANnUmEoRqR3KDnAiBgYyG8Crd7J3ePHH3tj%2BSJt0FCsg5mteEOAtQHnUrLCSqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMG2Iw98cXEc943FHnKtwDVlGegbpdxUbIj5gqPxJlYP%2Bbiot6Z6%2BS8mbiYmQIrThq8oRNvTKqAdVr8r4o2u6j2a7JUqzjKqHSSqqeIxDiqI5bor0WYHIkqwjZ4PySScrajPNfOtZ6Bip9MVauSzqNiBzT%2FAjk12rLxRvu6ZdL1mnI9nLJ5D5aKwHbDoRZhJMkm6Y%2FiFDu8H8dQLd1E2GDbbCYGeRMo0S4rUhHJRfymLeiZ%2Be%2BYbnkok8wjdMSY45h7YmO6RE9EXM7R6ooHGpCL%2Boxyl1Gjqt2619nYxCkK761SVnlXrT65yFZFYGpXdYvCoL4Klpb1Z9NVxAhEj3%2BUEkDYe8k6IO%2B9Ynk0SF89Nj0%2BiStHUU0WLy4m2%2FSGbZPa6SXFsqKx7LGXyXaxJwcMscgYh8GVZzMg8mmFMfacDgs5Ivb3Jz7nkDc0Vxr3Cgy3Uie4Fz%2Bll11sSRqQ4HVcqWE%2FXG2L1f3ahQR28IGeR9baltQe3rwLv9ff7YcJxkghnrNJg%2BjAqgpPyBplMQ1NKO90B%2FPgc3MjAo3knd%2BUdeNQN0hIh0KN2vpp6%2BvkQzUA%2FAFQx3UWkFH74yd4g%2FcK%2BDaMPRDz5OQfnev8ZodHp%2BNDHiuL3CXGplORjZjkjbaiomJfL1vkyjCfRYw3sTtywY6pgFBP%2Fd26h7fYrTif28WIw1chd4HhrLZVJEheJ27kWev8ZQ0xZeIRBW3MKAy%2BHPeX0GitzhFL35uESXkNgewIrAYY5LwG2XC55im2ccGEe0dNl5nDfLGL%2FNdJJxvRUi1ADCeooatNGeyhScP758VX7et925yIwofKLsk5K1I%2F%2FlFqAGKQayypmUrZ7TtIDYgkjkLHr0yYqP5jdI5dcg4CXL5Q%2BxOgbHW&X-Amz-Signature=3e2e08ea17f722fff488932584b63a21029d245cca9ad828aa85e2d9572b84de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGB5WU7T%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T134934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICB6m7KrLIcWlJtzl4%2FyajiUIc8GjqANnUmEoRqR3KDnAiBgYyG8Crd7J3ePHH3tj%2BSJt0FCsg5mteEOAtQHnUrLCSqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMG2Iw98cXEc943FHnKtwDVlGegbpdxUbIj5gqPxJlYP%2Bbiot6Z6%2BS8mbiYmQIrThq8oRNvTKqAdVr8r4o2u6j2a7JUqzjKqHSSqqeIxDiqI5bor0WYHIkqwjZ4PySScrajPNfOtZ6Bip9MVauSzqNiBzT%2FAjk12rLxRvu6ZdL1mnI9nLJ5D5aKwHbDoRZhJMkm6Y%2FiFDu8H8dQLd1E2GDbbCYGeRMo0S4rUhHJRfymLeiZ%2Be%2BYbnkok8wjdMSY45h7YmO6RE9EXM7R6ooHGpCL%2Boxyl1Gjqt2619nYxCkK761SVnlXrT65yFZFYGpXdYvCoL4Klpb1Z9NVxAhEj3%2BUEkDYe8k6IO%2B9Ynk0SF89Nj0%2BiStHUU0WLy4m2%2FSGbZPa6SXFsqKx7LGXyXaxJwcMscgYh8GVZzMg8mmFMfacDgs5Ivb3Jz7nkDc0Vxr3Cgy3Uie4Fz%2Bll11sSRqQ4HVcqWE%2FXG2L1f3ahQR28IGeR9baltQe3rwLv9ff7YcJxkghnrNJg%2BjAqgpPyBplMQ1NKO90B%2FPgc3MjAo3knd%2BUdeNQN0hIh0KN2vpp6%2BvkQzUA%2FAFQx3UWkFH74yd4g%2FcK%2BDaMPRDz5OQfnev8ZodHp%2BNDHiuL3CXGplORjZjkjbaiomJfL1vkyjCfRYw3sTtywY6pgFBP%2Fd26h7fYrTif28WIw1chd4HhrLZVJEheJ27kWev8ZQ0xZeIRBW3MKAy%2BHPeX0GitzhFL35uESXkNgewIrAYY5LwG2XC55im2ccGEe0dNl5nDfLGL%2FNdJJxvRUi1ADCeooatNGeyhScP758VX7et925yIwofKLsk5K1I%2F%2FlFqAGKQayypmUrZ7TtIDYgkjkLHr0yYqP5jdI5dcg4CXL5Q%2BxOgbHW&X-Amz-Signature=3e2e08ea17f722fff488932584b63a21029d245cca9ad828aa85e2d9572b84de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7L5EWOJ%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T134934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDjaoVIivfSNQvKYqJO1lDsnDcK0rAl1UftLIygjXsmTgIhAPCa%2B5l4Gd92YP1voywY%2FpxtRSBfWmnx3BM%2BB8ngwYeXKogECIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxhKh1yNhJkZ7kV1ngq3AO2C4BWwluxalhKSrBfABwNsyHBdAZVp893st9sLWLJWHryQxKLKbDFmjooKO3aTKkKWnUSczVb%2BYxAK7JmHgIDbzughf1oqivSof3p3p%2BvnGfARN6yNaQMWbSm8906IGQLZmqlm75MMoaEKfuIhni6sj5xgD3c803fIG7jOjdwVtBVXZ%2BdNhuCmYcqrHSiEy3NuDb0SSgx589fFwTikQ2mHUIqm9I2kMeukip1FfjflN2FEVz9w6R59vPmfOEbFsxAgOzV9%2FmhUrAo%2F3OQYriwRkMRrsrmdcL2iBrQVr168piB1G6ouRQwvV%2FFrRZTKmvvL3llo%2B8SogFZyzHM6Bbq%2Bbi8516OnA3ceTRw2sNGhiX1NQFNcaX6Gu6kb%2FjeNuynfFLU6l%2FZhCpkXRlE2aHelA0sRXMkyervX28uWkfDP%2FCrGzhxh4cpVJyDzjsjs9z%2FIoq%2FlcjNr9rPe%2FL6cfZyAcRMtzqYoU8irRxUXFdBy196IRb0L5qTuraXNhQpw70%2F%2FwU24pmHhlsoM0nWXCqhxH%2FbNsKSjQ0scG9HUfQrqwEklJGPOWgtn2%2Bae1g4AnyhP0%2FpnHBj%2BCC5gWZ9BMzUPMtDOassbJlngUWzpBKUwK%2FFSzJEujyBAVZ8czCGxe3LBjqkAeFoC5W%2F8Bbt4bAXBy9soKvoaSkZqMjGWcDzF0tzImBfI7G3m%2FVHFD%2BkCDwVJblqcz0g1E5rpQjEI%2FWPNH0216IClhuY%2Fs0U3ksQSyz8w2s56436Hp9b4OxaFGiMRjfwYdlPbpmOj1vwdsHrPZK6mhW%2Fo5o7FF4Ke3wZDuybypdCmAOwFaCVZARgBr%2Bndk1MatBbXo1UFWejx5ek%2BK7wZhbw5X%2BC&X-Amz-Signature=af8f262728a4d248e8f7a8b697b63084912a310b726c53e02f39dff539670f24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U5QD7ULE%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T134935Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBW%2BHj5d%2FzDIyNZspl9k%2FiWj3m3XFkVHlpTDyT8bxnm4AiBbb4gsIWUjFqb1Ghzl%2FUIJFdZMxdJoEvLxXTVtaXwylyqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMGjbsVXA4pEEKqawSKtwDTmnsyYW3xZBEWkyGRmCnEtPXp%2Fk6K60hd%2FotvnJ5ocaAHEC5m%2FS4Cnh9D%2BRPKAH0TcKcdf2gaCCvuidNTdBxpMDyTisKssWcJCpugXMPLPozots8WZSDMeUJmGUnj3N2r1hnjBKBtimt85YhJivhHnYK%2BwbDipgxrpFntUgXmh6Cjzlaqj40nb7tncsP%2F7jX%2Bvsg%2FLzPsNOj%2FYPudsenH6rEzMmthDj3Ha8VRvzYpfeYzxDrG5pbbWK4p7E5QQnQP%2BoDTnXHlFXPjpgYBeyZUUaUP0LQald8OtvRCmmDYD%2BwIHO5f0ZX%2FLzz7NIVGafDNZcu4E5zrsZWHb%2BFqQkhnyTaa4n9VH4QnEfiMFSKMLvWpJB4QTc6MvoxyKq%2FyPsCcxetyF59xRwhTpgehxN8oa%2FpOL2c9%2FAheiWd%2B3Yl4PAPFYSNj%2By1qebSUT1HdJnZVU5Ub1JRFmLrE5BRJB0Fr8oYFJ82QxK6ke2XCeNiQviH32xVRfQC7zm5lFvVjQdAVjx4a3ZhEOrc60SCspvz1Rwmw%2B0GtWC%2FRG3nkxR%2Bsm9diMXs9JIkYeUdemM3Mrz9VP7ByT0EN%2BBoIYlmomCbzUtG4aB5%2B%2FMaBFQkbaSsvU2qvMBBGWVFC6WwBpgw5cTtywY6pgF4s0WCcGxu8UlW0c0syZi1Qkg%2FtLuMKaLOFPbN2IVuXP1gxDp1HfQUQG8UyV9g5EbrGQSCPUk08hyhG%2F03lxdcXU4KGYtKQQPdQmGSG8BhNi5Ckz0cquLcZr8zJIDwTfPr55yxMBFQYI9H3qo6n73WsPOCYXhKMxkgIbJaMRd%2BTUs7XuWBQvQG20YDg5fg0UsD35wFrSIN%2FfKOUiVTa%2Bb9d3XKZlE8&X-Amz-Signature=3da43f7e8937d7d7b94dac0887574816a18448d52848fc6a6f9e7b1f6bb33e11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U5QD7ULE%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T134935Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBW%2BHj5d%2FzDIyNZspl9k%2FiWj3m3XFkVHlpTDyT8bxnm4AiBbb4gsIWUjFqb1Ghzl%2FUIJFdZMxdJoEvLxXTVtaXwylyqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMGjbsVXA4pEEKqawSKtwDTmnsyYW3xZBEWkyGRmCnEtPXp%2Fk6K60hd%2FotvnJ5ocaAHEC5m%2FS4Cnh9D%2BRPKAH0TcKcdf2gaCCvuidNTdBxpMDyTisKssWcJCpugXMPLPozots8WZSDMeUJmGUnj3N2r1hnjBKBtimt85YhJivhHnYK%2BwbDipgxrpFntUgXmh6Cjzlaqj40nb7tncsP%2F7jX%2Bvsg%2FLzPsNOj%2FYPudsenH6rEzMmthDj3Ha8VRvzYpfeYzxDrG5pbbWK4p7E5QQnQP%2BoDTnXHlFXPjpgYBeyZUUaUP0LQald8OtvRCmmDYD%2BwIHO5f0ZX%2FLzz7NIVGafDNZcu4E5zrsZWHb%2BFqQkhnyTaa4n9VH4QnEfiMFSKMLvWpJB4QTc6MvoxyKq%2FyPsCcxetyF59xRwhTpgehxN8oa%2FpOL2c9%2FAheiWd%2B3Yl4PAPFYSNj%2By1qebSUT1HdJnZVU5Ub1JRFmLrE5BRJB0Fr8oYFJ82QxK6ke2XCeNiQviH32xVRfQC7zm5lFvVjQdAVjx4a3ZhEOrc60SCspvz1Rwmw%2B0GtWC%2FRG3nkxR%2Bsm9diMXs9JIkYeUdemM3Mrz9VP7ByT0EN%2BBoIYlmomCbzUtG4aB5%2B%2FMaBFQkbaSsvU2qvMBBGWVFC6WwBpgw5cTtywY6pgF4s0WCcGxu8UlW0c0syZi1Qkg%2FtLuMKaLOFPbN2IVuXP1gxDp1HfQUQG8UyV9g5EbrGQSCPUk08hyhG%2F03lxdcXU4KGYtKQQPdQmGSG8BhNi5Ckz0cquLcZr8zJIDwTfPr55yxMBFQYI9H3qo6n73WsPOCYXhKMxkgIbJaMRd%2BTUs7XuWBQvQG20YDg5fg0UsD35wFrSIN%2FfKOUiVTa%2Bb9d3XKZlE8&X-Amz-Signature=0bb0b13ecd8fc39ec1f315da84d8f025c08b0db9a3913c6a7df0d0461248ccce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKETPWL7%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T134935Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCpf57HKTwbUgnShCRPQY7fxTsaUnKCIW9CaGziqwE1jQIgQh%2F78cGQWlO0NrRpQMQAL4s75ne7SZ6DFZP2TKd%2F3lwqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLmbmZK31sLcFNnscircA5A9%2FWOMjsJzYlpAUV4vdLYfjJaXPoQVM335xpqXSMWlamHddWo%2FzLl85gq6xlJ7XLSjITUlrXt9CWxjSG5D0egonZrHCB2WEpzxzNIW8acCeb9YdoznGHyz85KNFhGwz3r5NXSAso%2Fxnfux57BS99cBEUzkpqhy0gU23gRiGA2koC1mNc9pscWDh0Vi4ik3gnSXr%2B6Z4pqmKPeuk2B2uPzfohq3F4YA87jSsXFPmOIGZvfrgMcynLPX4C4nviucJZ8i%2BzLCnakIxi1BoVVTYdKDLEyInGW4i%2Fyh9EG5gZ3581U2F9Z9bFOv4hPfHNzf1u5x9g6QcO3b91IzhVJHr5xnN43Yr0ADOXoquf1%2BHIvY%2F5Oj5hDYij%2FwATXS31ubtNdlD5Pgf6iD6ilERRxiUUPeipMwaRfW8Lzhkz6pITnDFEVxkrAHONAX9WhzyUmi6b%2FFTK%2FpHeRlitz7WLVbCzipro%2BYHmnG3JCRuUrHtuNRAX5lHdwjO3LoA9CbixBnsbeCK59LunFOGBhngm5xFAgv%2FskRdC%2BOPvlrnhyZf447G0PQ%2BmPpr%2B5LPtEMSdtVEJ6nqb5wf%2Fu%2FzHRGSimaI3QzRNLTQcx7dY1MtNWxJc9AJv9lz%2BBYqC%2Faqx%2FkMIjF7csGOqUBk5lXOKLEJBT1N%2BS9NfOgEhYcbtzpBigJlTECGNMYaL3WolH7CErtA61Ihl1X1t6XyY33bOUmPeoAx40O%2F%2BqJdI3hPnEwNZWQpANWoFC1jI074m8MBj3kuI6k7%2BSw0wT2jFhrL02Ak2y96vWJV04aLaNQUGmWrnfCPSDIv5j3kCJMdZQXmLiIG2MgTBBnZQSQOgvGbhumvvYgpn0vrEiMc4j4sh8x&X-Amz-Signature=684f808bd9092746397ce45dc5cac697eb5344e3b28d8c89f704a5a968bb4e80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652ZUFGMX%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T134936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCv66zgXL2nDC%2FtA6CvLMzcUcDLefwSZKPdJdi1xM%2FdkQIhAJwGO8fc8p%2Fqrerbppob%2FuuBMObetZeIe7uBQeG%2FFnh1KogECIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy97iaS8sn9ROzVFg0q3AMBy7L%2BJplgVPEelggZXvRtMatDQkqp7EaBWT1Bm1HLc377sR6Lv20SH58LjevqCyccsmk74PPlHh1ArfJm2H427uI1gETIV%2BDc5AXvWEYLB1b40qtoeOBpYMc5hJDtR9uequ0pNJ0fnyb8pITazDr9bNuxMq3KSLnrLiRVdRuBKaKBW0KZimmlWaw6kcdoQ8uXrqwVCgut6%2FHDcYJUL5RpYFU2vkMihLyjn8IKx43S7lGTVtOHjEDl%2FGPaPVlCZ3rQxDsp3%2B%2BZ63Z8UZHEt2aahTapttSk7Z50zHrO8CjbLorWeXrLVr2DJJMfSoHwSUcaNr5KfhdbTzAHX%2B0ZBjthy1kJoCOoFCck3wi%2F%2BEu6kGVsjcZt82zVy%2FgaDRyJxj4nSZanIj35xt92RmHkKaNn4wGWckVn9NsyLZqx7C0y%2BH8mbKpDytvuALzbaE24S88qYT1hVpxA7Lgf7DxOrPRmilyPsdDVaecUxm4ZHSvm7d4pYpL4i%2FdsapTMO8Kwzk6RNFLnyU0vVgIvk7eUrPe2%2BH3JphRkGjnaocThMDLuN4Y%2F9PU0HIc9ev%2F52sW%2FxQRsxNHBMIuupl1kITQDsZlW1LXTMsP6%2FZBDwG%2FjfQQPioFfHWTKHXHTLrbQIzDjxe3LBjqkAbNKpIkmCzjXBBBQBbb9AnUFbThOkzaG96WPEt87VE9xMlv9E9eHXV7yugNN245a%2B%2B6bqF6cCfusPSDWn8qytQ4IZ02FBdGk0kuWf6xSfL2F4lKnnyHagirwMhMGRkL6SuaAxvvVMFDuRpWOuaz%2BYdnrTZZBx4G86uDSDlhTxFSNHy%2FkCoWX5o1loSpMq%2FjpW9exerFm7UTtQJrYqZGIS7tHZm%2FK&X-Amz-Signature=201e6cf8f50d25eeb6bc1118f25e526cd68c6b0eb22d23454b38d2521f124296&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646SMFAGB%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T134938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGCQFY71MICn0xncnWfRt6ffZ7%2FG4kxg9ZCenIbnbA%2B8AiEAnUt7MAm2NbXaF5P1HwztDvuBgDFPVXMKeF5F%2FUMxtWMqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBxPZybn6oUKW%2FND4ircA6O29VbdkDT8ka4RsiwOf5UnR9na497B0BG2np0JaOBbrHX200MLfIbCdr0Pa9CK%2Fcpo3pqJs9ntWrKCrHxeVw6fDGeUI9NVtbf9hz95Flq7vWckMIw7H%2FEoQGyx%2FDBlEYgqYAHFmd8P1xWTnFniarBPe%2FM%2FqB91CbWrVh%2BLHWr2I8LJn4CVlJkg8S%2BIjNlR84eac%2FOWqhq6lZCr%2FU%2FLmglltK7ulbMClU%2FUvQzhXSmrc%2FvezYYSeUonTGO7xwSIWm2reivoP7LNMvLm5aRL5pUKkVp0sbPZmbj4ZS6KDFSNFH323NkIL5gEPar%2FyCzJIytQQ79EKV2emzs9786kaBvV84t3sKykyuxK%2FBdto%2Ff5fWHf25zFnvRsm30HXDtibKWT8ZlDYQ%2FUXgpeYYPz%2Ff6YJqxegqEPI1Q3IgI9EKdGZwHkn0RswFgdI0rY5Ejy4V9EEd3MXafiwEmNohDJ%2BYdloTCKprx6SgKz5LiuaZ%2BPXk6iAfhfHtYGcinJzJztEZ2r2BEPHZFzLKUydtNJurUGqiz1lehySI7TFvaWR%2FdxFb24raw3m%2BmfTmMSdkyFCchCk3vVJAjSwC17J8T9lyJrod0mT0Ew%2F%2FRpzMUJ0jHsAsZuocaeOg%2BcVOk9MOfG7csGOqUBOhJggVmg0Rz%2BOKXEvMsK5iSBCbOq%2FGhK3Q%2BOizC25W%2FHM7hfrZ%2Bnq8pMwDTmFezJjdhZ5H%2F0NoVYRMluD0VImztbZyZO%2FkI5%2BT3xtoB9L3z7PJ6cc6qUZuNmU%2BGl3zSUjKJkCwBaCKOoNK6xr98dsOrvNiYRQ9JAHvp0GjKQdrUj0W3ciILoTTTIqsV74Ds5qCe5WXEJWlxdTCP6UhakMzmcb0PF&X-Amz-Signature=63a0c2dca7a224d5d6ba9b03d9586693e25bfd574d2db8c221edc88d5ffd4366&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663Z4WCM3D%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T134940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDW2DRbRnCMHt%2BTcQfkIovz8x%2Bgv6AfkA9bonutEiDJJwIgCRH8MyNPxPgxNEHqVKmClh8%2BJWn8Pq3YJbei5zWKTk0qiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMKfVImWVwxFBhe8VircAwmbBsTizUii%2BWsNOgZD4Wk6wkezjR04c0eq6qj2mXq3HBSjJ9EN%2BRhRXDVB1zaDQzV7Ie7Tbpmq40l0uYRRPwbKIBfe3sbN%2FRfcTgG9yV5Nn5vYx14JHk8MFaR%2BOtkM5EukGo0Z5LhcP6zJ5CFcTLTfRdMhBD6hnoQBVRDVSaaQvRwKJ%2Be9MyHVLzkKtSvl0u8I10dKCTQM1x%2FzqqmJx%2BVdyDRbbC7b61TdG%2FeDJmOiOhT3hhWF1hSQcqhscT8iDjMTHIQ7lkIHARsefLUIGCAzcNOIcVrlUza%2F43YkdEq3hyUXzEXfV1hp7HmPI8mZjtLFDskkreiHSPXaoM8aUbuirAij5aJrueMOKCScke9Yz2XaeujC2lVhlsMu8L0bBhCZ1I07eInZ9VYt11QLKZl3l3YSP1d8XSipgthPStQubvEKEzSLmrGCn1mlZ8EaSXYJyNz8O0U0%2Bc9tSgvlxWfQMzrDfS%2Bd7iQ4KcI6RL5QwPMTMfUAJkZNbToAm8LCTto1z7%2FTcQC46mCpN7hznTiw5fDtwmjz7ktpUJxPWZPixPCFeQ9VPwMO%2B%2FCv%2FZVjNzRbXYoHBd5cwdTR4qvcj2Zqgj9BtPcfm7BEtSc1LUekOXUo%2FsR2e3lpPnxgMO3E7csGOqUBXbL1ow%2FtvLYx5zXVzh3a%2BhngFJzYCt22V81mdihnDOflUccU8P5IvV6R0PYtuBjN4Fjd6shHBxtXWPFdraoZsyXukZjHWU1rH%2FEselN7bRtHorXuFzOB8xWuGnb6Y7jjeEv0I1N4drQojnqG%2BVe5tCkYf%2FLGdxRcPAH2B2kGk3HdUn%2F06q91%2FAHEMLw8DrqVW9C4PG%2FZ1isAB5lUtIacCRtBJnWs&X-Amz-Signature=0deee4923b88528fd9d2ed21beb2ef0eb74dea9e6c214ed9d9f1fc1f669581ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663Z4WCM3D%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T134940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDW2DRbRnCMHt%2BTcQfkIovz8x%2Bgv6AfkA9bonutEiDJJwIgCRH8MyNPxPgxNEHqVKmClh8%2BJWn8Pq3YJbei5zWKTk0qiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMKfVImWVwxFBhe8VircAwmbBsTizUii%2BWsNOgZD4Wk6wkezjR04c0eq6qj2mXq3HBSjJ9EN%2BRhRXDVB1zaDQzV7Ie7Tbpmq40l0uYRRPwbKIBfe3sbN%2FRfcTgG9yV5Nn5vYx14JHk8MFaR%2BOtkM5EukGo0Z5LhcP6zJ5CFcTLTfRdMhBD6hnoQBVRDVSaaQvRwKJ%2Be9MyHVLzkKtSvl0u8I10dKCTQM1x%2FzqqmJx%2BVdyDRbbC7b61TdG%2FeDJmOiOhT3hhWF1hSQcqhscT8iDjMTHIQ7lkIHARsefLUIGCAzcNOIcVrlUza%2F43YkdEq3hyUXzEXfV1hp7HmPI8mZjtLFDskkreiHSPXaoM8aUbuirAij5aJrueMOKCScke9Yz2XaeujC2lVhlsMu8L0bBhCZ1I07eInZ9VYt11QLKZl3l3YSP1d8XSipgthPStQubvEKEzSLmrGCn1mlZ8EaSXYJyNz8O0U0%2Bc9tSgvlxWfQMzrDfS%2Bd7iQ4KcI6RL5QwPMTMfUAJkZNbToAm8LCTto1z7%2FTcQC46mCpN7hznTiw5fDtwmjz7ktpUJxPWZPixPCFeQ9VPwMO%2B%2FCv%2FZVjNzRbXYoHBd5cwdTR4qvcj2Zqgj9BtPcfm7BEtSc1LUekOXUo%2FsR2e3lpPnxgMO3E7csGOqUBXbL1ow%2FtvLYx5zXVzh3a%2BhngFJzYCt22V81mdihnDOflUccU8P5IvV6R0PYtuBjN4Fjd6shHBxtXWPFdraoZsyXukZjHWU1rH%2FEselN7bRtHorXuFzOB8xWuGnb6Y7jjeEv0I1N4drQojnqG%2BVe5tCkYf%2FLGdxRcPAH2B2kGk3HdUn%2F06q91%2FAHEMLw8DrqVW9C4PG%2FZ1isAB5lUtIacCRtBJnWs&X-Amz-Signature=15de8d781e1a0c53ea14d2f64d451dc42f0327e30e239a503eb05bbd1dc85bd3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664N6TF63W%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T134925Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCwGyj9sMft4Zoqgx5bAQHXFHjOVv360EjsivNeA1JjeQIgRy0adjBUNGFDKtR%2BYy26nG2MuG0xTflwm%2FfqYguUP58qiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB9PlFtRb%2Bn3sDgHKCrcAwDGnGZRnP3B3wzMC%2BUyIdH57g1Rqig%2FMy8vSPamryjBQP5pYy2M6S2GemMbOLJh%2F8BDyYD8D%2B0kRCkqirmokxA07Mkn9eumf4oepXjtQLHb0RDmifC9RR%2F6AudOnpeeKTjoFEOaEfYVHWGj6IV8RnvAGGlGEBowQ4BksJG3prJxRMFXQOS7j6Yz%2FxVt6LwbP0Vc8YqC6xQOl9Ug1rad1Tvu%2Fwh7c8Tve29oNOOjgLKKS6ZzUcDv641st0PcygcvOUeTTZnXzWSdST6NmF9V7DaKbGA%2BSGB68Kmubz%2FVACt6s2vjZEQZzAhdMPzDVb3V3rLXatD14zCKyc3XFAwsVtmAvFJ8LHFbrltEfGwDL2Xch5VUVS52X8%2BnEOD52R%2F1o9CzTsABAi4%2BvJJfMMUxIq8oabaH6AmFkNI7umeOb2Y9utdT3adKU9rvsB8Z6hxXU2bFbhxqGgktUnhxOcrg54LlO3HKwDKPHwFtTeb%2FDNUmxZBO6vMilrlAuT2GUObpDdiwRilZCou9c6PiNQhxSz2CbaT5JHt%2F5j9fOJBIspz78Kp3iVNFvKDJM0mOxFEIXBFBKTdu%2BObD6jbwhi8LVI1zPMymmzq570wp1UaFwWASPD%2B%2BBcht1t4k0A2%2BMLzF7csGOqUBGTuFEjdjY5R8f3vvw44uLZsS9l9T5sNWxFsvX5xW9KYh9OOeHP5Sb7cLBzh0xyovKR1cghXm%2B7Mbn51ywJnbuYtJkkC%2Fz9eTctmi7V4rCX75DLN%2BtveF7bJt6GXBa6Qpd97bwDIf2%2F4C%2BitBf78rfOsHJtFTbqi1YrBYlPfi8tHCWOetadrXCnQrWEt1vxtdfOeztG15PNgRDPVIft75b0R%2BqFHa&X-Amz-Signature=307dcdb95b68bd68813ca3e03683dbc7ed9e817f3c209e2b1e04a8bdbfb4c9e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FU4275L%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T134944Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFkv7sjxewIFu%2B15Nt28saEnRxvJZSFTFVJtTKCc7wucAiBQxVuHz94H6GufA1Q6lqyPM4PxR6Mst%2BYB%2Fg2AC%2FobyCqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrFI10d4xPEx%2Ft%2BXlKtwDkvmziNlzHpc78TaU0ZT0JKdu9L95Yp0jQF0GeOh5bVGOt8PhMD6nj2hNtVyTKQeVzeUQHIXS4lBC79SAC2cQcH%2B7%2BqUjtonBlnPDpBm0nQ1rwPPevTSMzC8s5FWbIHXaa7UpD3F4HVYtcscPUUHyBjVE520qzg%2Bf0Hw8yklGoVuZNK8GfDr4jA4HLwvkz2vJcw6IP479AG9XNg4gHhdlM%2Bhrq53xZDi3aNKyD8rYa26ffcDgMVcgk9g6F6LNImvBJQRS3NNdgzonQchXePRQT6idwVVkK733Q8MpyULDj4pV2vFbq5pskaGAoFsBn%2BG7%2Bbg6%2BPZWMkG26xfbmQgV%2BFpyd45ui9HYCegqPqA3bFeUnxvaDEJh%2F9nSHmvH3kZyvj6F10aW8%2F06sMFH2rTr5ZykcnMN9MfKQthNuE%2Ba%2FW%2BLTXrSalxfWmi1WXYew87ioA7xXZXge6p0zYDhkWbG8cm%2BvrO03w%2F08ptQWv2MylrIZWxsBmxBhDQO3%2FeE46wTQt2GubhNgOsZiq4ME0pzN3dI5BiUlLHDk3jW4rbB6dOhFnQfCrt3Vp9mkAQrrXe0SqN43KAw8OSB1bMaXog5TEvTxfA5yqTDzZx42A9wHnhpR81xvkjPPuRnU0Awv8btywY6pgEBXo6KmWJVN03aG42S%2FhxIabihtEQldTl%2F%2F5b7FR7nskushCLs14q0PDn6BzzA34PZKXsqsvaeVosoYdGyaqFEtqSpdK8HQRdk8SuBbqu3lSEM5wtKfdp3q3BBjCAXC3eQ45hzOYir4CJQI3q8jfVAmKspBUMS39Ftr9deWnWnpwMYZNYZQ2hYsuCOgJ2Uv0XmVi1RayzfSZQ8zjtNPbLTzn%2FZQRv2&X-Amz-Signature=5cdfc8a161c9c07cd5a42796bb5f175cee4986d8fcecd6d38dc005b9f8f4c1cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FU4275L%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T134944Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFkv7sjxewIFu%2B15Nt28saEnRxvJZSFTFVJtTKCc7wucAiBQxVuHz94H6GufA1Q6lqyPM4PxR6Mst%2BYB%2Fg2AC%2FobyCqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrFI10d4xPEx%2Ft%2BXlKtwDkvmziNlzHpc78TaU0ZT0JKdu9L95Yp0jQF0GeOh5bVGOt8PhMD6nj2hNtVyTKQeVzeUQHIXS4lBC79SAC2cQcH%2B7%2BqUjtonBlnPDpBm0nQ1rwPPevTSMzC8s5FWbIHXaa7UpD3F4HVYtcscPUUHyBjVE520qzg%2Bf0Hw8yklGoVuZNK8GfDr4jA4HLwvkz2vJcw6IP479AG9XNg4gHhdlM%2Bhrq53xZDi3aNKyD8rYa26ffcDgMVcgk9g6F6LNImvBJQRS3NNdgzonQchXePRQT6idwVVkK733Q8MpyULDj4pV2vFbq5pskaGAoFsBn%2BG7%2Bbg6%2BPZWMkG26xfbmQgV%2BFpyd45ui9HYCegqPqA3bFeUnxvaDEJh%2F9nSHmvH3kZyvj6F10aW8%2F06sMFH2rTr5ZykcnMN9MfKQthNuE%2Ba%2FW%2BLTXrSalxfWmi1WXYew87ioA7xXZXge6p0zYDhkWbG8cm%2BvrO03w%2F08ptQWv2MylrIZWxsBmxBhDQO3%2FeE46wTQt2GubhNgOsZiq4ME0pzN3dI5BiUlLHDk3jW4rbB6dOhFnQfCrt3Vp9mkAQrrXe0SqN43KAw8OSB1bMaXog5TEvTxfA5yqTDzZx42A9wHnhpR81xvkjPPuRnU0Awv8btywY6pgEBXo6KmWJVN03aG42S%2FhxIabihtEQldTl%2F%2F5b7FR7nskushCLs14q0PDn6BzzA34PZKXsqsvaeVosoYdGyaqFEtqSpdK8HQRdk8SuBbqu3lSEM5wtKfdp3q3BBjCAXC3eQ45hzOYir4CJQI3q8jfVAmKspBUMS39Ftr9deWnWnpwMYZNYZQ2hYsuCOgJ2Uv0XmVi1RayzfSZQ8zjtNPbLTzn%2FZQRv2&X-Amz-Signature=5cdfc8a161c9c07cd5a42796bb5f175cee4986d8fcecd6d38dc005b9f8f4c1cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QV7UXAM4%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T134945Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDwZtFdAVVItqGR2xvnbtD4LIDhFr9mnyAtGvi0HbP2WQIgMmreyvG7Mdyr2MNHnxfLgqrXe518I0bIA5NdHnHrJ%2FUqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGv5skJ174m7hGZC%2FSrcA9IwucUC7giMXi%2BSG5rLmvTRBVp%2BQcp2uT60%2FKmVpUD491gZsZhGW7wvj4oLh7GyRS5fX6KoiOuuVUFN%2Bfy9dYVZUACA3US1lenPAEQZX8gPfItdopuA63OP8mJ3ibpviMu3qP6bP04ugrW4BCJvXilh8NU3lUKTofBD0g32%2B9N%2BXI9jDTvikkkUTL9X5b6ZT5RXBKvl6M%2FJrY9uxlg%2FglaPHcklZAJ8AKB5a%2FcOZx2S1kq5LGubCcNBttbfJAy0xDYPjqEcqsij05jWvgNIUYhjlWLtiKZ9GQ90awqo67qqdrjYQM8ewYxTqwHqZcx4igH3Rut2QMA7CjZJVwbNZ3jeGDVn1sHzvKC1r4VDSCXI1HAVT8yKScjFEa7qlTuCmEeCula8czcbOs%2FMTiX3sHloh035uu%2FpPpRBWeh7R1R2vA%2FZ%2BjLr%2BtWMMMBiGJow1LYU6TEr1gZiOou1aGRF9oVGNdnoNBCI98alHmkcY9ADzr4H39RKcCwoWUh%2B3xFWgROXHjQX6zqDz2Vsp4k%2B%2F9Ut8K3k5ZCV%2BUNm79G7rXFcQgTxX8L%2BaE4jDZtmq9cxnAGhKh9xCQC4CJi65YFel6ZFR1N50ZLCAmfIMiO6Uw9wEYr7ZCUo3rWzRBShMNHF7csGOqUBsBJePStX4LaDKhOkXFtxbViuRJZZBP2xy6y5UCI8GTCt4NiCHx9OQIW2%2F9rWpFh1A%2F6kCzbgdxe%2FzPpQtrv7THpdyvhWZkmd%2FyqQ8rzid11vrcbLum7rJ6uGLwhs5raPF59tcbBxONHAXqMGgsUTawOXrctQfCj%2Frah8k2QzMuDgiEyIk8wuc%2B9GtKI4MmovWN5GYKtHxnVNID37rXotu4HGDxSN&X-Amz-Signature=6a8d75dbab49f47ccb896a9733d19713b33fe9e69908d9fffbb99fd3218b4c8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

