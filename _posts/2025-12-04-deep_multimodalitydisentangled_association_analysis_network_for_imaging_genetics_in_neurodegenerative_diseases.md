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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KKQ6ZQD%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T100052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCTW3rxUlmA7SbALOjSGDvVPNIXt2j2auXkFlBUslk7lQIhAJ7peL5u9oRefEAXE8exVeYfhOPI%2FvKVxFF1VHn%2BtY5MKv8DCFIQABoMNjM3NDIzMTgzODA1IgxeNkGH3%2BflKFlnh7gq3AN7f5LD1s0%2BMjelq%2FU%2Bk%2BkHIRVK7N3ZgsuTZtJRppRfzoOWLtF1t0RYP4xqWla7d%2B%2BnvfzFJGVaXpL%2BUe0EU0EF%2Fgowxrdf2W1OAVZR0KKYFn6G%2BL5ZPprQSqIOLulxKfkQEGtUBFvHYuRsh%2Fu7w8B6Zjmzy4rqzvSMA1%2B3yuZnMXb9AhW%2BDMFYb%2F1%2FQKXoj6ikhimF7Z%2Fz6PbRXTXsb5jRDQBT6hOO6GLRUpbNL9eirXnoWzySaXRyiKs9qXHXN2JHJ68bZkGd3Q5%2BQfAj4ttF31%2FNdBvOyFWl3OTsu8Hr%2FF1B9%2BZNa0gr29BmusdjjeQbZMjxPLfB3104iRB%2B5VJn1TnwiAbWXfwMe%2B2lhzFZLnu4OqY7uCAwOgySA2vjIrIXuFeP5Mw%2FatDiDnsz9RpElCIKtQxETaHO5dTJ37SLYY0aetOf3Bqm9dbcv44d0gO56lYYOPBXRUwd4PZ5WiESU4FR%2Fc0oJylTDfwxk24KhA0etrcO406qidcL%2FbI8JP4j1oI1BPe%2F29COaUlOros8Bnolcl2NXQGE0PtfNDELkWriPxe7usv%2BMYL%2F1hCPGy9K65OUtGeMfPOsdIJiv5bm4%2BDorDhUvt9lqvc4y5JNKFYnr8Tliw8RP0RGNjD%2F5IrNBjqkAYGNFSMB8KgnRS9nvX0JMtIVc%2F24JS%2BrhG33YMAZUdBgzqi%2Bk7k%2Fcl37N21YRZc2XbGSfVMGVLaFNt2r5w%2BZQfyL0si42GCSUZ97e1QXC9PfdxnS9XMZyKLb2CjemNDPUKbMf3u6PS4%2FojX1mtuPC1sf%2FmtmB2zmgMQlgZMUBcH289XAu0GenyOS84WaGqMNPi01%2B5vqqUwT9n9k9u3dY4mMrZcz&X-Amz-Signature=dd516265d8b5548a1bba6c40fe317d5e4e8ed9a528299d723246c47a7018532a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KKQ6ZQD%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T100052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCTW3rxUlmA7SbALOjSGDvVPNIXt2j2auXkFlBUslk7lQIhAJ7peL5u9oRefEAXE8exVeYfhOPI%2FvKVxFF1VHn%2BtY5MKv8DCFIQABoMNjM3NDIzMTgzODA1IgxeNkGH3%2BflKFlnh7gq3AN7f5LD1s0%2BMjelq%2FU%2Bk%2BkHIRVK7N3ZgsuTZtJRppRfzoOWLtF1t0RYP4xqWla7d%2B%2BnvfzFJGVaXpL%2BUe0EU0EF%2Fgowxrdf2W1OAVZR0KKYFn6G%2BL5ZPprQSqIOLulxKfkQEGtUBFvHYuRsh%2Fu7w8B6Zjmzy4rqzvSMA1%2B3yuZnMXb9AhW%2BDMFYb%2F1%2FQKXoj6ikhimF7Z%2Fz6PbRXTXsb5jRDQBT6hOO6GLRUpbNL9eirXnoWzySaXRyiKs9qXHXN2JHJ68bZkGd3Q5%2BQfAj4ttF31%2FNdBvOyFWl3OTsu8Hr%2FF1B9%2BZNa0gr29BmusdjjeQbZMjxPLfB3104iRB%2B5VJn1TnwiAbWXfwMe%2B2lhzFZLnu4OqY7uCAwOgySA2vjIrIXuFeP5Mw%2FatDiDnsz9RpElCIKtQxETaHO5dTJ37SLYY0aetOf3Bqm9dbcv44d0gO56lYYOPBXRUwd4PZ5WiESU4FR%2Fc0oJylTDfwxk24KhA0etrcO406qidcL%2FbI8JP4j1oI1BPe%2F29COaUlOros8Bnolcl2NXQGE0PtfNDELkWriPxe7usv%2BMYL%2F1hCPGy9K65OUtGeMfPOsdIJiv5bm4%2BDorDhUvt9lqvc4y5JNKFYnr8Tliw8RP0RGNjD%2F5IrNBjqkAYGNFSMB8KgnRS9nvX0JMtIVc%2F24JS%2BrhG33YMAZUdBgzqi%2Bk7k%2Fcl37N21YRZc2XbGSfVMGVLaFNt2r5w%2BZQfyL0si42GCSUZ97e1QXC9PfdxnS9XMZyKLb2CjemNDPUKbMf3u6PS4%2FojX1mtuPC1sf%2FmtmB2zmgMQlgZMUBcH289XAu0GenyOS84WaGqMNPi01%2B5vqqUwT9n9k9u3dY4mMrZcz&X-Amz-Signature=dd516265d8b5548a1bba6c40fe317d5e4e8ed9a528299d723246c47a7018532a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSM2SVZO%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T100053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGcSljOlM9K9hXN3ZNdmE%2F3dMl0NM8Nr7s7UcMrTm6EuAiAsH%2FqZ%2FHCj%2FVvBbgsZYLNzjiha7Uz2h%2BHj3oNEW8P%2B%2BSr%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIMv1oiK5K%2FSUXaE4s3KtwDVlPhIiLToZyqvpaBKlYGpk6jP7mm6PHgcbUgQhvd6nNEoCn%2BsJ1nSk8UAkO8SlrTLvkWipDG3z%2BZFs1PtF0vxi5DA2Qf70YIFXwypWFFZCEkmOG%2BA4TmxJhBczU6gdN7YNTpZseIIoTZAzV3umIMVVJsIzoaYdV6LM3n2lWbwr5rzso0WOn2GorRc8AocxvaDfkuJJFiIbfMJ9NixJQsO5qHGe4q4G6rCE1moRxgN2OIbjnU915PvFz3cEUq3%2FUkbJZHuoYLswfjWZURcOSeiQa8QMIzavzHDC7ZZb5vSctNJyZLM5PHHRfUX2EdbvGOXzqomWDCAWGs3fNtSmUVBboLJTcCh7TSD0yWRCqURZvxTprJtZ14XISBeq51h3XTdJ8VSMMUgo7d34%2FwBRQIAezDvmtet14p12r4DwnBIlQpj67oeT8oKNJdfFE1V3RXkGCETyh6kqHsBnnP2ZafgkKz%2B5%2FeWSqZ2B58o6i5b%2BG7KGLh0NsZppuddnb2jJDgwCZaqTLM05Jm7jSVMhMbu41qYSwhABvAnbxYK4CjRcP0wktC4o6NbGXd%2FdGJ0KkPGdcxXPfjrEjv9HH6hEW52YL9Oj6Vi1KDbgVBKgCx9AQ3%2FOH8fgCvE30%2F6zYwo%2BSKzQY6pgHSXs%2BhrLrWNB0kdaT9qkGxrrQMa8XfJ5K%2FPguCvhAo0U9W4Am4MQRbAjpoU0VHo9BY6kARN3w%2Fd3ucQ453ptnHGQAm0bxjzTbCmtf%2BDpdlxQEitIsm8TtQCBobhisauM1UYYIUZYDqaSin0BU6W4UymNncmXXlPyAJ1W5vffUVwQQthn5BKpCmCvmrGFmhsujSqpTGusseOT7RgQ%2FVK42v8%2Bi6%2Fveq&X-Amz-Signature=8971203a1c579b55860bc2e79a20569141024cd2d800d818370e42410d7eb1f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RMQKRRP%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T100057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD5MiStchH6upbp8NfwIrsmfGBJyP9jzM80uUJGwnxZbAIhAN5h0TnQhmwE3r2IFo3ODof4c4jKK8HtOTwpyUKBtFKAKv8DCFIQABoMNjM3NDIzMTgzODA1Igz93fMWdswOHfpQLzMq3AP21tUpzn%2BwFoCQeZuDDWCUFrG3tDQb3CPkTWNvsI%2BOanXQQL5keGjlzNnk19OJFPiMhWGFGUadYvEInK03hqyh7Fgu4dhbR7JXhi84xLxvBYExn2n%2FlnhicXDuzAHosMObpgUaulemH2IJ9dr%2BTTEkSZM7pxfeVbOJpX8bji%2B1Fd3fmh09NG3B1EFg8zW9WcnGvf1PVFb4klIjLh3yESv%2BouSgiiiCGlwbbwxe3NinTW7OgFM19mzJ6gX8ySi2KOHTZCDULtfWjauJ9yiC8BevlnBCsI4KIxeD0R2MMquE%2Fa3fPi0W1GXwOMHqWIZgUL223HFtW7KYwtAIEybEf4rp9S1nMZvjryGM2klQt%2B6pNUgyp4MAXZghKL8RQ2HQvYqAVZhIO%2FIIMmFCglU4EQhrALgyrNsts6twPEJcx2%2FWlOts9wQDns2ygukkqxHNhTjv2631wv9qx2WjgTT881BA5g7z77lG%2FZ4pqR2Mio%2F%2FQdtOJzH7Bfivj3bjZxjrLZUrVkqYTF%2FURBgaxn6Y0dJFc%2Bbjw%2FVzY1RtsNa%2FWN%2FUXjg4o2IG9o1%2F%2FhfpNOU9qMgFHJKFfkP8I%2FiCDFbOs%2FTJqQt2KznO8uXU8O21%2F9kY4SrRIPdgB%2BlVgNkDiTCr5YrNBjqkATMWYV0X2Phfkf04%2B1DG8%2BMZ83VK9cEF9%2FCxbaWRr6CxHwynagWVffQYWsfsP%2FGE2WVFw%2By%2FcrwoGdOfBLL5F2ZMeSu%2B19dBtrQ%2B1VwBdGgQsH%2FHWX2mMfcLwBXuO95lThgz1BYj5fblJNERLBubZtbYTw3VjBXjjTzgWgxLzXJYD%2FlNNFsMR9CBXS2L1riQ55vUfG5C1nPYqo7Rc45TPecEBxO9&X-Amz-Signature=51d75f6e5c23dcd048468ae4719f70127e95969e4e7c84bdbeed524a0b8d68e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RMQKRRP%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T100057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD5MiStchH6upbp8NfwIrsmfGBJyP9jzM80uUJGwnxZbAIhAN5h0TnQhmwE3r2IFo3ODof4c4jKK8HtOTwpyUKBtFKAKv8DCFIQABoMNjM3NDIzMTgzODA1Igz93fMWdswOHfpQLzMq3AP21tUpzn%2BwFoCQeZuDDWCUFrG3tDQb3CPkTWNvsI%2BOanXQQL5keGjlzNnk19OJFPiMhWGFGUadYvEInK03hqyh7Fgu4dhbR7JXhi84xLxvBYExn2n%2FlnhicXDuzAHosMObpgUaulemH2IJ9dr%2BTTEkSZM7pxfeVbOJpX8bji%2B1Fd3fmh09NG3B1EFg8zW9WcnGvf1PVFb4klIjLh3yESv%2BouSgiiiCGlwbbwxe3NinTW7OgFM19mzJ6gX8ySi2KOHTZCDULtfWjauJ9yiC8BevlnBCsI4KIxeD0R2MMquE%2Fa3fPi0W1GXwOMHqWIZgUL223HFtW7KYwtAIEybEf4rp9S1nMZvjryGM2klQt%2B6pNUgyp4MAXZghKL8RQ2HQvYqAVZhIO%2FIIMmFCglU4EQhrALgyrNsts6twPEJcx2%2FWlOts9wQDns2ygukkqxHNhTjv2631wv9qx2WjgTT881BA5g7z77lG%2FZ4pqR2Mio%2F%2FQdtOJzH7Bfivj3bjZxjrLZUrVkqYTF%2FURBgaxn6Y0dJFc%2Bbjw%2FVzY1RtsNa%2FWN%2FUXjg4o2IG9o1%2F%2FhfpNOU9qMgFHJKFfkP8I%2FiCDFbOs%2FTJqQt2KznO8uXU8O21%2F9kY4SrRIPdgB%2BlVgNkDiTCr5YrNBjqkATMWYV0X2Phfkf04%2B1DG8%2BMZ83VK9cEF9%2FCxbaWRr6CxHwynagWVffQYWsfsP%2FGE2WVFw%2By%2FcrwoGdOfBLL5F2ZMeSu%2B19dBtrQ%2B1VwBdGgQsH%2FHWX2mMfcLwBXuO95lThgz1BYj5fblJNERLBubZtbYTw3VjBXjjTzgWgxLzXJYD%2FlNNFsMR9CBXS2L1riQ55vUfG5C1nPYqo7Rc45TPecEBxO9&X-Amz-Signature=c9edd1ccd9a678a1f87ffe9bd585ed8afb36fccd61cec04902bdea901654cb57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPKF5V4V%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T100057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICC6YEXLheDaklvnCH%2BaXLXVLiajh6WQy790vZL8YYJ3AiEAg%2B%2FUVt%2BYUDn4hS3OAl1uPtJXFpXOLsi%2FCBvRDv%2Fv0oUq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDLKzOk%2Fz8o%2F24gi3KCrcA1Lp8qFDEWevngJC22bVy63O7nMNcOjjPJTWXa%2FwAh9rMVNPmFXbUIzPQpo0UkkNIdH0W%2FniKlN41LAf7SctmFMz75Vm%2BHmNdUJN1xqPBqOdzn5gTZVKeeKjObDau0i%2BtiZq%2B12ztupbigHYl0Dx6seiyDuQUrsjTNKpIaFvBKHu9PzyWUkzVrTrZ8CRpucaFjBOtVYWnsuRkmR8vO6Dr4X7Ws5SRmQ7vaBMXUxW81PZhb1oniHPpE9DZM%2B4MOaQLHPnmTZ2npJlJY5k%2FJy1PfOlXLTv5cRyUhG2O5CQ0inwXtErhIDAXu4RMs3rtRzaSSB2BF2xoUJMv%2F7XL8aEV50gf6BytIKeYM2cQTvP05cOFsfXKD6rpkFMVbOl4TfGGtGF48bjE5iYdzk0ljuKSviw6MIJjf2vaHTeU2SHbb4oy0H9kZoBoJsT7KBSztEpEHa2%2FgPULcbSU8a%2FjrP348%2FVlC59S5LdLjWwWY17de5C31PeawtgnEeNC6qfm8mjaym0DK7v0AKy22KfEeeCKQWUXgvYkBV18J13EnBlxKYt9qGoXVhpy31GOH93rXW7bz5JdtNsOtMvGLmybG%2BxZKQQHVCC5xUOkvFqAPZWBICc60waLbo7HhjT8I%2B%2FMIDlis0GOqUB%2BMpmN64tIo%2F5IHkOcodyzZ4BBRKH2A9mbUY621oYfAuy9pjOgDrChz1oYDSmDPWFrnlyCtNu8bOr%2B2SlRH5nHjoienN7n6cifHNQ952JevEBFjdj7CvVDwaNzsaRvSgYq8iDlAe2abCkLUOA1s0l2sXEbFsIvyOPe4aiTCOor55G4GIjtBryycqbifaIreTEChE%2F0oskNYU1OtRgz94fkkHBWTlO&X-Amz-Signature=499f8f1ed411def317c9a091a44dec32bdf1682810af5d95d7b9efd42162f3f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZR4B2W3%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T100057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF5kartnUT%2Ffi9gDFrdN9sotvaPOG75bNmSot2GETGxCAiApa3EMYtIuBhL1%2BNg7x%2F4W0CeO5z11FkdPSf4%2B3sGyHir%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIMPUUCLWhPvHvLOD2YKtwDyc%2FPg33Xyx6FipOpswXfUlfrVnkrWJB%2F6tE5urn0kpWmmyuTKH5K32XB8IP7bTf9aylmlk9%2F9XsxliXdfRSpmNuNdC6BLyg7R138hYdyciI5KhpZ7XqHDHK%2F2ZHgeFgvlItaCLrFi%2BeQpkgxXzMkZReOhMUy5tqBcLkCsKSVMGVkdmi2HhPmavRGXkcJncsw9MPgytURtFmLZKbg23bMZqfSJIAVTAZlVu63AeAzKJTj5lvuod%2FsRl5TNYlWzrcweaKPDqbYrx%2Bh1CSHgohqHnE3lHG%2FgSMwDpjcrKI3RIoS1bhKlrbVtTQDQiPkZhDwU6hZMoR3LM29Fd00EfFJIAQ02vCyq0NkAt1rt%2FHAA8QVBW3HAm%2B%2Ffg%2FDkkepKqfm7IvrImYy8ipFovxpL4KH5jig3DkpJBnRIbOxcc0dzkW5MxaMAKV0h11fDAg%2F7E%2FWb61Rtwp4rhWN%2FD7Uagc9irXQuHe%2BU6CseLlXrG67ZiaemYVonQvyySfzaBV6KYT%2Fmvv7QemI5rSgiwUTZbFDH%2BmwgwSeJ56Biebai9PGr6Vsvn4Ba95wpQ18BYTvZmXBVn4NPq%2Fp0%2FM3zXuZlfIko%2F8JvGBqpn4g9QjDrEM8ztMogoAngnP%2BYFNZHlgwuOWKzQY6pgE%2FI8udkG%2Fi71DUL4uIZZCgOhElej5Agw87%2BE8TBmntfYN5bI1X8VOCRd6d%2BGH24QxsvitbNMT6KAhn1rAM%2FVL%2FXnbpiSfNE%2B8sdRIJLCj9Y7btzc9gZM1YxF%2BKaUmKs7o7WuOzAqZ%2B60sIZeiWIrPOkfvEpOLHmMnWLO0pzhLi7xbcH4BWRIC%2FKDMZPTYbfNTDtItDT%2FvDaB%2F36IVmejtnaIPi5pOW&X-Amz-Signature=822b1081a638e4153815fdb86db1c687d55d83e80686dafd9d4f8dd94966ef0a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KHL7BYU%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T100059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDT3dFCkiLVgTQcs8VNSxDcJC1Ppm2Zj2OjtwMYOIN3hQIhALpNcic8YgqBrHimwlEC%2FntcDXCTGQdMV6fP01CGXA%2FvKv8DCFIQABoMNjM3NDIzMTgzODA1IgxqoKxHRKFv2tgHxGQq3AMAzdVfOKZMn%2B%2F1K9fCzet6dILjXiJ7atmYKBgyXJco6x7%2Fh8qYmSUU1FjCHNZd2G1JfxzUj1tmV6lS%2Bygda1IVGBuNF0Ieems8JMFiecqlg2vJYD6NVj1E9lVeTrYznqFGgP0nw41RdCnmXg100AY35DGhcjdiGb4abJ%2BpQaGgF1UmrLcrheCtHXb2Mp211wk25HmaPv%2B2JtbqziQcSRAOf5tFFFK3LX4g69mOWafE0s%2FpRejDxcfdmBPc8bi%2F8qkL1qsUAn%2BnjziudZxrRP8XmhGH%2B%2FvPEqFvrt7sYPJEOkGyA4arzs5Tv%2BejyjpA9K6iMSy447APq4nSKKyGCaktGU1aT2%2BFZKnLbDGhPcPTcznmDxdoaFAg%2BTVk89ULwvrOXnbXL0z%2BmpbhPt3yvM5ZnyJ4C16hEd9MGmVesVt2LfHoTyNIdAK1JPq%2F3LU43UTpoMvmNLvYnMj3HZcBNbWp0I8W20mDpdRpczozzXWlJE%2Fu6QHWsYKIkylCmugnBv4BWYfYAIBD01PZtiWI9VuyOnxv5%2FrKpOWlX4nEPGFJkc%2BOgykF%2FyFBGLbVgkGNs9b%2F5ZpjZUNLFJDE996vh1vvULy9JHDQWMBR2o52injDyvnMazhYsIfZabTurzCJ5IrNBjqkAdqy9O5Y8%2Fx67FQFc74BB4FrRetytL%2B%2FqS9pZqYDWacWKY0G08E3egNL2%2BrUeR2ZWiZk1j7Q4%2FTICyWT1JGTtOOOyJ06mpmRSTjhUKqVtkNCW3UeJcQKE30fFnjzliy8dBsNE0XaTEMG5mGO91AaQthW9xu%2FNEquRdxcbNFjv1gTVzzPwEFEUs9Tb%2BcG01qo%2FSVfzUWq0x0F9SOWclaUb5Tw3G5k&X-Amz-Signature=9f9511158cb720ab2a6f6ef3855774a41b8f752d160fd5cd63384184a24fcfe3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632AJKMFV%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T100100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDdsXuHRu0DHMiU5cTzX%2FcU8oC468muQXqq2OsTprYtagIgW64%2FKG6GXGjVrEvswBM0H%2FvyW0BuRoXMuLPs8FwEggYq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDDm4EfHN4xT6CgybdSrcA3ZB4s9N5NjfG1XaRi5NmzWSvyHvKHTZB%2BkSBg%2BC%2Bq84iknVnZQB0H7P7Tj8GU6gAhROrH8%2BhggXTLk3vAO6SbPTTI5v%2FmS123TPJcL7nscI4Y3DuSBSXsDhqpIKcg4jUyhfrFjcz8%2FTgJuUWiHTFAtE%2Bw%2F0U058ngUd%2FsSy4szpisRi3wuv06iORyCIqFGqCvsMaTqixYJNWGa9yOJIGiMU9Tquc5dMVXcsrBRHElVPHpMTp1sdTTmXpjGwVPJE9cvu4njleKzqftnnxusUV4pYPaH7YR90Mp5SRefCAPjSpA4iGDmT7OJSeeLkj%2BJpP%2BS7T6SmdWhSrii4%2FzVSkCR3Inzug4kpjbCT5%2F0tEXG7fqX13cGxNl7QZn9kf0CTcfyVreeh7vdDnV0z7Uu6D4QKocVwvc5RwgHjAR5K67m5jT9NkI5hjUQdhawWz6x3836ugU4iyvB5sWlmKFg4nU%2BC3a0bxjXcr3PeJc1OcFMrHig1gl2TAMRnFmW3YttdBfcBD63kNcwQc4pXQ%2FxWAvIeCbJrs1hFSHHrXz%2BQt%2BHpkQhCwCyuASrCUj%2B7zstP6%2FQkxLKGx7HPCjMO1OQbDtSZG%2FgNHNE%2F3wR6btxYGBq2ebxDOp%2Bskglxt6pyMPzjis0GOqUBdaqPFG6O0Pi5%2Fd1VZSaPUAnXrPwhLpuUoBejpQFKl4uBYq7pPwbLhhA0a8luEYR3NJt4aEB6xtsup3KuNXhwqhJuoEwsUviMuiBG2LD69e%2FN4%2FDZmvp7YpZdbuRIhqm7UvM%2FiE%2FkO6ZT0HyHQHp54I7Zn7blcrIpaJfIw4IeITy%2FKoazYFSqy7UgI3KtDjFX4FyKVVSxlDirg2MxoKXwNmpd6y1c&X-Amz-Signature=ab29dbb731be4360b295f3d66f24eacb7bbaef1343996f5148e1e88841c82a84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632AJKMFV%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T100100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDdsXuHRu0DHMiU5cTzX%2FcU8oC468muQXqq2OsTprYtagIgW64%2FKG6GXGjVrEvswBM0H%2FvyW0BuRoXMuLPs8FwEggYq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDDm4EfHN4xT6CgybdSrcA3ZB4s9N5NjfG1XaRi5NmzWSvyHvKHTZB%2BkSBg%2BC%2Bq84iknVnZQB0H7P7Tj8GU6gAhROrH8%2BhggXTLk3vAO6SbPTTI5v%2FmS123TPJcL7nscI4Y3DuSBSXsDhqpIKcg4jUyhfrFjcz8%2FTgJuUWiHTFAtE%2Bw%2F0U058ngUd%2FsSy4szpisRi3wuv06iORyCIqFGqCvsMaTqixYJNWGa9yOJIGiMU9Tquc5dMVXcsrBRHElVPHpMTp1sdTTmXpjGwVPJE9cvu4njleKzqftnnxusUV4pYPaH7YR90Mp5SRefCAPjSpA4iGDmT7OJSeeLkj%2BJpP%2BS7T6SmdWhSrii4%2FzVSkCR3Inzug4kpjbCT5%2F0tEXG7fqX13cGxNl7QZn9kf0CTcfyVreeh7vdDnV0z7Uu6D4QKocVwvc5RwgHjAR5K67m5jT9NkI5hjUQdhawWz6x3836ugU4iyvB5sWlmKFg4nU%2BC3a0bxjXcr3PeJc1OcFMrHig1gl2TAMRnFmW3YttdBfcBD63kNcwQc4pXQ%2FxWAvIeCbJrs1hFSHHrXz%2BQt%2BHpkQhCwCyuASrCUj%2B7zstP6%2FQkxLKGx7HPCjMO1OQbDtSZG%2FgNHNE%2F3wR6btxYGBq2ebxDOp%2Bskglxt6pyMPzjis0GOqUBdaqPFG6O0Pi5%2Fd1VZSaPUAnXrPwhLpuUoBejpQFKl4uBYq7pPwbLhhA0a8luEYR3NJt4aEB6xtsup3KuNXhwqhJuoEwsUviMuiBG2LD69e%2FN4%2FDZmvp7YpZdbuRIhqm7UvM%2FiE%2FkO6ZT0HyHQHp54I7Zn7blcrIpaJfIw4IeITy%2FKoazYFSqy7UgI3KtDjFX4FyKVVSxlDirg2MxoKXwNmpd6y1c&X-Amz-Signature=9a1bc6784308918172a35bbd9c7b5f97a2b3457e61e9cf6e7a58a7df5cd2baa3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SP3C6324%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T100051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6b%2FsDo2pKXROXYCX99u9tEQQ%2BkGrm1nJb13Qxra5V3AIhAOkh695MtynEU3XjD6RbJp3rtxHtrwXZrNd7Z%2BHZyouMKv8DCFIQABoMNjM3NDIzMTgzODA1IgzXkYLMY9rEfPpN4YEq3AOa56609CzTuVo22Yo265CI3KBUhRaCQROtvUldW12h5V1dJCip5WFUIBZ8TwYOtz7ou4%2FPKsyPkzeDSQLOme8n4OvgjLPoHERFVVPIY3nZR0JWN8vhPTa0Xoi74QFsXSZ2YtafQLWOyBjanTYvJ7rIRuC5Nr3QBdSHyG%2Ba68Gcb9UDfa%2BIjVRArQHWnOx47r7w1wm9QzM%2BUO%2BqDjOYwgYLXkD2iShc2IyGjnvtIewT%2BIiqxfcWDdCVIxdWQb5an1bfkASCvcD7yGmjhx2qsE%2F8BzHlhm0jlSKnMoFgHQCh9SupVsnASjS7BFj%2BF6TOJx2F2QGymyimJnPj4l2cBrac1tzAZFiRxUNJn0hhChrB8nSc6m9pEKOwlvNdbfxjyTCcp7Jqff6L0dygaQvz6eTNcirXWnhHRZJqkxBcIhZf9uK31D4sCgFAGeRkaayZRBdmdAZp1472dv1rX9Ui5b65UpNP2BTBOqJ0Tf7IbqyFwGWY3o60yYX1sFTQs8ID1ztGzS%2FJ4buFFLA1ABhlpH1fOP9YaP1IBFO4yKzw3ySjcA5Kk4hzGd3vR%2B2Q2Z1WNdR6V%2FZzvomXI2NUns%2BEmVQAwsIp0Svvi%2BKFM95paL8gq1AaovDF3YB%2FWslMuDDK5IrNBjqkARBp8NKaWN4C%2BLjJWwOiRyqwV6RcC5TWkG2APLWdw8G78Jb%2B2B3LzrhcWl5%2FpxGsYUADu0Uwp52XBIZFrT%2BbMhdFzLLE7ciivvZU99pephNE%2FSCfDipfZ6keCq1MoU0OX4c0nxAiDtVcXrrfbtc0hlMDj7hB%2B6BODDNlC3p0L9nuGy0tQpZddZUqnfnzSNUbJpAAGux9YfME0GAjQhl8wHWURTG1&X-Amz-Signature=99f950c9d76eea8a72892f8db3f34bda295b57f0dccdea2356424597edc014b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNNOPRDM%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T100103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFHBLhTmbhf8l%2Bi5XzyKAmAFcG8C0teQS%2FG8%2FYoOrsOiAiAEQdofzVeuJpRfBH25hloAH5ewW0X%2BwMiHly7pnVU4Jir%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIMoWdS3lZb1isvWhnCKtwDncwu2YOCnwUf2x7VEt00e2zl%2FA6nYgJXRTjuR6hK6p0juiU64BB3JH3wsShcRn03kD0OI5MNo9mp2C71W6nzd0wufmemQBsISMwDMr%2FOV%2F1IQAfF95TV4nVMiS%2Bl2ruIG2F9EAYfZx5SRHwvqyWHbriS7Tv8StyFKF7R73ach%2B4yZ2g%2By3Aj40b7znSWaZL3A2J3s050mErPlcUCHJ2Cdx0JG42ffExPJoHyOQc4dRdtb2ztZymMclZLZmQ%2FxymOcXEeSmrdceL9QM900MIYaYpyRyss%2FMukyODr%2BlEfJWFYJcLu6VJohhAcAsXuF%2FKnpP9s8HJRXJuRISiS%2FTagWfetiez82c6g%2Bmo2bxH42szurq%2FfUk8cNxjRuxpxUgNRsb2bg%2BZLL%2Fuzw%2Ff%2FVzRROwkzEYiDZjpnsEEsNjVLsxB94fyNDG4JwHaLChmPTlW3qtzfo2bAee9OtYt%2Bse00iOT1zmL3xW8vzzZM0ssB2rCAj%2FwyUUqfHVp42BhfCEKpd5ZAUN9zl%2Btp9ANSkMxHKFPY97M6oJU5O5Br1IOgHJm6RJ%2FljxoPc3CRfLuLHRCSQxNgSGpJQBwWhz9HAhJpRGJkaNrZm474dSRSN8EVzgG00Rq3AYi7eymIzFgwhuSKzQY6pgGo%2BU6VFh6SthrClKSU8abdRz2MVyIn8fxz1KhzfFWuJ8SiEdlU9SNmdx4OcYk3pM1d6W516iIvSV1yZm0g2IL%2B%2B96jUF%2FKgRkwVFlcw8xcqTDAvqsqG2Xysno3%2FK9LfBKW2WMp7jpAU8BPBGBomItHMseRwp48jaozyol%2BLmnlqcsSE0McrH0RdFr8wg6xzMgJHBC3tyf3tsA9VRfWkug2d6wOYXe5&X-Amz-Signature=39f3e53efcd2bf6d8abb034a5dc7b998da23600bf69145ab9a4f753b48a0f952&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNNOPRDM%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T100103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFHBLhTmbhf8l%2Bi5XzyKAmAFcG8C0teQS%2FG8%2FYoOrsOiAiAEQdofzVeuJpRfBH25hloAH5ewW0X%2BwMiHly7pnVU4Jir%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIMoWdS3lZb1isvWhnCKtwDncwu2YOCnwUf2x7VEt00e2zl%2FA6nYgJXRTjuR6hK6p0juiU64BB3JH3wsShcRn03kD0OI5MNo9mp2C71W6nzd0wufmemQBsISMwDMr%2FOV%2F1IQAfF95TV4nVMiS%2Bl2ruIG2F9EAYfZx5SRHwvqyWHbriS7Tv8StyFKF7R73ach%2B4yZ2g%2By3Aj40b7znSWaZL3A2J3s050mErPlcUCHJ2Cdx0JG42ffExPJoHyOQc4dRdtb2ztZymMclZLZmQ%2FxymOcXEeSmrdceL9QM900MIYaYpyRyss%2FMukyODr%2BlEfJWFYJcLu6VJohhAcAsXuF%2FKnpP9s8HJRXJuRISiS%2FTagWfetiez82c6g%2Bmo2bxH42szurq%2FfUk8cNxjRuxpxUgNRsb2bg%2BZLL%2Fuzw%2Ff%2FVzRROwkzEYiDZjpnsEEsNjVLsxB94fyNDG4JwHaLChmPTlW3qtzfo2bAee9OtYt%2Bse00iOT1zmL3xW8vzzZM0ssB2rCAj%2FwyUUqfHVp42BhfCEKpd5ZAUN9zl%2Btp9ANSkMxHKFPY97M6oJU5O5Br1IOgHJm6RJ%2FljxoPc3CRfLuLHRCSQxNgSGpJQBwWhz9HAhJpRGJkaNrZm474dSRSN8EVzgG00Rq3AYi7eymIzFgwhuSKzQY6pgGo%2BU6VFh6SthrClKSU8abdRz2MVyIn8fxz1KhzfFWuJ8SiEdlU9SNmdx4OcYk3pM1d6W516iIvSV1yZm0g2IL%2B%2B96jUF%2FKgRkwVFlcw8xcqTDAvqsqG2Xysno3%2FK9LfBKW2WMp7jpAU8BPBGBomItHMseRwp48jaozyol%2BLmnlqcsSE0McrH0RdFr8wg6xzMgJHBC3tyf3tsA9VRfWkug2d6wOYXe5&X-Amz-Signature=39f3e53efcd2bf6d8abb034a5dc7b998da23600bf69145ab9a4f753b48a0f952&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666COSB467%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T100103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2BcbtNlXd9UXA4R8rkVk5qB7BEdlH9S5gpz1WPfpIX4gIgUyaots6TFinwqjZnJqaHxqOpYhg1yUKwQ4nNTiRbzY4q%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDEToiCpA17LIrqLICircA4woxHH6ZnhSrmOQjno26HlYsTln2cr6nKudIfzgUPiueXEP7Lw6opz%2FDjhoor1Lqp9LvGlx6B23KDqNRUr8mJuwdK58bpn7fX4oRe3LttW%2BA5xYcs5BA6eErxkZsj5a58jEK0Be%2F%2FC2phySIwQo%2B7rawp5yi1FrQ077ydW7yyfWcXOc1rz3SEeT%2BVkBa%2BFUqlbfkqBfbqToi11JS%2BYmBI5Bvt6j%2FdLRwvHkfFGe6E1Qfm4qoKGuHbz0FRuaMK3Cdr92luNdQMLe71p4pae5dJ7KTB9DILpQGCvu0e668M9CIlvuSm96TQkvdL9RKAeF8gxRNemkNnjkqBkC%2FFvpSD1WuBBhkERMfOhH6TXJMBX%2B3YvVPbbSbgtsgkvtljsiWdGkPDqPBdjpK1ddTURMPx099zfcntTCHUSE1LiyLbyCw7K5DrgvsDuPjNO7csUskT3BNxYjhlU6RBUrTHYN4UpN9FEmx8PAbJjVsqaSC6GpAuejbY6QQn6qLUMB1ynKcyuO9itYoOXOkJrvJE9mHkliY0RsT79CvlsgLouTLIfKSM0ajd8By5CLUABevyWVIRofJ5r1HBp1DS7EmBYvXksw43jBsQgOh4yySc9KROf1vpzyKyOZNaObzwA4MLXkis0GOqUBqddGCedMnodjFs1KCZCafRJWKulhMHOpqipTj2MQZSD7pWd1gxCx6uBKrwE0zwhQ4CpP3fMFtfYxQ4lLPW87Zus1McUfQ%2BLRQ7Awomuz9AgefNOp%2B1Au6jLNTtEGehIf8RTelOHM36xpY5iPsWIzoek3XnAA1Q4HnVoBhOBnoSygmvenCKzl03%2Bgb0Kvau9KtmhI81yxRaY%2FMGxMtm9DCQMQx92%2B&X-Amz-Signature=1c869ef93297d88cd80d49d7a10e22f065114e18633679f327aab02067ff0882&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

