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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JPFELW4%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T202423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCWZEP2Gcs7jkvIQODSEPx6bMYwIA%2FG48dgq36Mn7nxOQIhAIdr1%2BWR%2FHaSK70I4bmK47bt3%2BD19LisTu6Num%2FKvZufKogECLX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzu5i%2Fk7Ov3f3HOm8wq3ANcln5v7UsLlKNzZyGapDJB2YphcnFmcjaCDjipON4%2BzNkJToxT%2BNI2s3EhwIvZRuYO3z%2FR3chsVONK3194aUv5NJ5dNi4CImewvBzvILUnI5NW46YfVTN57nz32VbggXKI7BDBRTCTbwVNyqHlcAgv2naEjBdAhulo1s0i%2Bat9fWFQ8hEEiep87IKAk%2FDLvROUymozSLVC51V8Mucolq2fbYAXaGFxjiEYipec0JEzuK2XxMAoAFY1I3bSKkZe0%2F0LYlf8bBtVo1JUvQnYhI1OzQL55x4D1ImKjxcegIfJRw%2Fw6vq6jDKmedMBiG4kumTd%2B2Lo08inDn4pYFJ66WlXFEBi%2FERsUCvOkv%2FdQ11D4F3bD5ZPUCI1keR0tGqPPcKq7Tt4lf6Q%2F29LYhyr9I1BiSSz2kNruvSKPa9qcLlvCV8OZNmvWwRTDGW8UVKGLg%2F3xkwcM2IwKZviUHsX6eFgH4cBFdFdZ7Coer1ty1ZqN4YEzXgQv4cLXyAq2VFflZ15roqDNyDwqFjKO49SR7H%2Fg%2BxhhmZyFJKK8%2BJo4J4rKxr5Cjxf1C4xaptflklOcPMVDHSlGG3LJge9croVylQFtOCl3rGgY3EtLufS9jUr%2BLeZ82pRmnLHLQo8LTDS1rnPBjqkAT9KEI5T%2BwNyT848RArEQ1mfj2hOiuzQkRT79BO66BmSPqrAFSM47WpDNKqV%2FdL6F1N42%2BDZsfQnAuYc7Wf5lyBvMMjolzSeErB1cggb3gJxwzdhqCMbXzUFaR2jrtCxlHZgbGvzHqjoADJ83OZ7J8OK%2FwsB3dvd0CLOvKTa7MQ173LEhON5HA8RXdkQt0in4fIsRnj7tHd2UVV69XZE6tnqq71m&X-Amz-Signature=6b9b1d95d1a2317844d3a7cbc0f98d5ce8e610b62da0847a82b45f6be92a4146&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JPFELW4%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T202423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCWZEP2Gcs7jkvIQODSEPx6bMYwIA%2FG48dgq36Mn7nxOQIhAIdr1%2BWR%2FHaSK70I4bmK47bt3%2BD19LisTu6Num%2FKvZufKogECLX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzu5i%2Fk7Ov3f3HOm8wq3ANcln5v7UsLlKNzZyGapDJB2YphcnFmcjaCDjipON4%2BzNkJToxT%2BNI2s3EhwIvZRuYO3z%2FR3chsVONK3194aUv5NJ5dNi4CImewvBzvILUnI5NW46YfVTN57nz32VbggXKI7BDBRTCTbwVNyqHlcAgv2naEjBdAhulo1s0i%2Bat9fWFQ8hEEiep87IKAk%2FDLvROUymozSLVC51V8Mucolq2fbYAXaGFxjiEYipec0JEzuK2XxMAoAFY1I3bSKkZe0%2F0LYlf8bBtVo1JUvQnYhI1OzQL55x4D1ImKjxcegIfJRw%2Fw6vq6jDKmedMBiG4kumTd%2B2Lo08inDn4pYFJ66WlXFEBi%2FERsUCvOkv%2FdQ11D4F3bD5ZPUCI1keR0tGqPPcKq7Tt4lf6Q%2F29LYhyr9I1BiSSz2kNruvSKPa9qcLlvCV8OZNmvWwRTDGW8UVKGLg%2F3xkwcM2IwKZviUHsX6eFgH4cBFdFdZ7Coer1ty1ZqN4YEzXgQv4cLXyAq2VFflZ15roqDNyDwqFjKO49SR7H%2Fg%2BxhhmZyFJKK8%2BJo4J4rKxr5Cjxf1C4xaptflklOcPMVDHSlGG3LJge9croVylQFtOCl3rGgY3EtLufS9jUr%2BLeZ82pRmnLHLQo8LTDS1rnPBjqkAT9KEI5T%2BwNyT848RArEQ1mfj2hOiuzQkRT79BO66BmSPqrAFSM47WpDNKqV%2FdL6F1N42%2BDZsfQnAuYc7Wf5lyBvMMjolzSeErB1cggb3gJxwzdhqCMbXzUFaR2jrtCxlHZgbGvzHqjoADJ83OZ7J8OK%2FwsB3dvd0CLOvKTa7MQ173LEhON5HA8RXdkQt0in4fIsRnj7tHd2UVV69XZE6tnqq71m&X-Amz-Signature=6b9b1d95d1a2317844d3a7cbc0f98d5ce8e610b62da0847a82b45f6be92a4146&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HWRSQC6%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T202423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDkwI%2B6fV9OBDpByg815ZetK9Kgn1c63GjW64Ym8hxrdwIhAMsTtG5I0GfG%2BiKvv%2BO0ZpZzMOeBhbx1l%2BI3GJc9L0N3KogECLX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwbVwJstJ4KPPFP2eQq3ANoQ1yV9xGMDLRRPM9I0XN0hd3JCMt04Pot7Ti%2FSTcNPSM03LtG9%2FK9IA6FXMEN0IQd3Ohk4W29SgGxFYLKRgXDE%2B2%2BNqxNbgcA9bn0S35867P1sACX5tXoryY6ilfqnrMgNeQI13eoXGVr9OQ%2FBfjeIta4hIpcXD6w%2FtyVW7AUrepkvKroS%2FSZ0jozUupKyTWMjECVzF4lQ6KwAim68NyhIYAFPYdBBrADbswCWzaCYaPiQm9aueMWJMgbbOucj%2B%2FrSCLwB4FqA0dWwLwsBCYC03rK2QbSzEos9mzEYqe6I%2FVHcHUN%2FvVrFafRG6Vw5jg2UZRIjYYCDlOTCwLI6zQw5z%2BcBcm5Os4RS0wMWjzyFk7LrmDFrQg36LC%2B2jMbWqiNuzJ6o5wT9pWgkh%2BhHObeeTf7kl2qv5SLpwAK3tfnbvp9j70s9rFfcdfWtu1Zs06UtNXamd5sI%2Bxi6id%2F4hilVmFvciQNBlDWZCHmg71JbPIE7mwQMxTq7k%2Bax5Wdqr58CWQ3%2F4IBvh8l0RNOmuZisNJ%2BZdxHuIsJjQgsQVPrpddvgBsQ1XBNrkERzgFwy%2FwiMZG3JgZ5WnxLm83TLvfgYonXz6op2ld8B1ks%2FcsjrZoTmB6lC42zUFtDKTDy1rnPBjqkASfgc94xx9OoKqhUhja5DtGjaEsTIwciF43EnSFLmsi668HlgPfESs2BDHsqq4hWvOZeFtPznrDqp4mdmMQnl0q89Vhdqwm9fwvZXlcaEBIhrDMxGOoUpSpTl%2FTfyQGslzp7Uyyiw6Rv2Y2VuAa8ceB1gDbeKbXF4Su0FnDOlvmfUl1jQ8aIx%2BvzY5OWvXK98NXOkP8H6opBi09bMwH6vhU5yCuR&X-Amz-Signature=cca75b4c6af6078c0d723ac4a7e836a7d62ab0aeab6fdca3f4c2b0fb6b5bcb25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZNP2H7D%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T202425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDC8HjFJvaCzttyVVv83zFB0tiHlDPMIUpd1Doy%2FC%2FuBQIhAIxHuzRpbab9wwQFoo0G5aLifLkHCZ84YR0u0Gt%2BBm9YKogECLX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwiHjHxT2Q1kDL8kWYq3APW9awdkq%2Fzu2USSBA0fAoSqSTZq32Qfrbhs7%2FSOoOEPd0vdRGTfUD9M3f9Iz%2BH6Sn3EjmOfAC7PXsC66rFusTXd9ISBpPJCiISGPpi1wGiaBz5f8W7vluu9g%2FZdoPDuxN5DNLXXvJ2E1DwBBdhFF%2BAWRduaX7y2%2B4bhZ0vr3b5WaZzWmnnEySW1H8ZluVwpnE%2BOnh0nTjEP8Zauqn3jpwyA4XxDv3AieXqBhqipOX1RD6Rjmr7Q96qHxDFYCXWlWfjUeLUhMRL2Cn254o1aKnuC6uAiWboKk8bf5Qbu%2Budo4J7BnK6zeQw9KdSk5ZYbafrmV5HBfcTBtTPtgl6IWUhNERmw2YZNx8GIRMdNa484wm40t99e8rQJ%2FXgcTI0ca1j%2BFPPX2FR61aTOQvoK9lfV7VAY9JqGyjFWHbMtk9pfYytNXZphM%2F5RprmtMgGnQqHjbYBl4AA3USh1dMsuCHCMsDVLv4Ew%2BgbzdjXsMRYNS8%2FHKJUfkqsau%2FebJTLUuu3QKVEqCnLLxBokmsaLFq6gsVZFUTOb4eKC%2B2a48uWIyGn5o6A5Wz3YKzExNi8ASuC%2BXxsjcrTReB2J1q5NEwW51bZI3FrxSYOO0H%2F4T2R%2F4fxdOnXAgiZCLSdBzCq17nPBjqkAeTS4FPVkBZCc0EzoE2uFZOs6a057%2Fiao5PviaGz%2B72dsUIutfUm%2Fw5r%2BLr9V0yI9lCy63XcRkXrFLaY7WG9WSaw6QA7iSiQnwFpox7Z6HUgg8JSzGbiMtA53K7M9PuvyEhG5nW4WlrfFOl6O4oZBrjcx%2FuCeN5OCYYKp8ppExQHOM1KDqAkg6apD0xhFvXRZwLYwovbF%2Fk6Wln8%2FneWB%2FLJEI2f&X-Amz-Signature=503b917a434248347de50d8b2bb009160b61204eaa49aa1eb80b72d9d2b4c4d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZNP2H7D%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T202425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDC8HjFJvaCzttyVVv83zFB0tiHlDPMIUpd1Doy%2FC%2FuBQIhAIxHuzRpbab9wwQFoo0G5aLifLkHCZ84YR0u0Gt%2BBm9YKogECLX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwiHjHxT2Q1kDL8kWYq3APW9awdkq%2Fzu2USSBA0fAoSqSTZq32Qfrbhs7%2FSOoOEPd0vdRGTfUD9M3f9Iz%2BH6Sn3EjmOfAC7PXsC66rFusTXd9ISBpPJCiISGPpi1wGiaBz5f8W7vluu9g%2FZdoPDuxN5DNLXXvJ2E1DwBBdhFF%2BAWRduaX7y2%2B4bhZ0vr3b5WaZzWmnnEySW1H8ZluVwpnE%2BOnh0nTjEP8Zauqn3jpwyA4XxDv3AieXqBhqipOX1RD6Rjmr7Q96qHxDFYCXWlWfjUeLUhMRL2Cn254o1aKnuC6uAiWboKk8bf5Qbu%2Budo4J7BnK6zeQw9KdSk5ZYbafrmV5HBfcTBtTPtgl6IWUhNERmw2YZNx8GIRMdNa484wm40t99e8rQJ%2FXgcTI0ca1j%2BFPPX2FR61aTOQvoK9lfV7VAY9JqGyjFWHbMtk9pfYytNXZphM%2F5RprmtMgGnQqHjbYBl4AA3USh1dMsuCHCMsDVLv4Ew%2BgbzdjXsMRYNS8%2FHKJUfkqsau%2FebJTLUuu3QKVEqCnLLxBokmsaLFq6gsVZFUTOb4eKC%2B2a48uWIyGn5o6A5Wz3YKzExNi8ASuC%2BXxsjcrTReB2J1q5NEwW51bZI3FrxSYOO0H%2F4T2R%2F4fxdOnXAgiZCLSdBzCq17nPBjqkAeTS4FPVkBZCc0EzoE2uFZOs6a057%2Fiao5PviaGz%2B72dsUIutfUm%2Fw5r%2BLr9V0yI9lCy63XcRkXrFLaY7WG9WSaw6QA7iSiQnwFpox7Z6HUgg8JSzGbiMtA53K7M9PuvyEhG5nW4WlrfFOl6O4oZBrjcx%2FuCeN5OCYYKp8ppExQHOM1KDqAkg6apD0xhFvXRZwLYwovbF%2Fk6Wln8%2FneWB%2FLJEI2f&X-Amz-Signature=0ff70e0dc990092bb5499f6ef88f77eef4cdbcc779dc6eb1ba2a34616a108f80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667B5DHXI%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T202426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDsRjp%2Fs3od0RPureN7s1PkSehTvJiDDtVlmjuunKNMoQIhANFIsESxLfpUQh7Qb0uE8WmoCcZapMPq4rW1nurVsk46KogECLX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzT8CWND1UYIxbzYA4q3AMHOSTyycbU%2Fz7ZwQl4nkU7Xk9SLRHv1LSRy6z%2B0wO%2FhIGwm%2BmWHG%2Ffv9sjxPAV3DO4ICkPcg3SpQHynPgctlJpGKl02tqYjr5weQMOH9jvG7EnALD6kH1eRkwmwR2%2BKF2xc7IQo7SCwsLbipAAN%2FYMh4f16oVHUs9%2FIrR5aR3QOiG3sGZ7P5USZXK%2Bj%2BrfJxQHvbYIHgJWsZGgmAcdAz%2BfDagc2BbKfk3Eak%2BP3tUOynCvRqagMm3TBSqfuA%2BcCxjhUYMin3hpDzcJw2QV%2F6Rt3Pvj6gaV2iDwuh9ukMh%2ByOyyzYEUe8Nk%2BESs8TABW2ze4ubZegKhGZL5nV3T6NY8pcHS6I8%2B8daLVHKvq81RcAbXEUY9PwiFyUAL7WOHyI34xQnfwZ22UpHZUbc%2BH%2FD5pI0Axp%2FHo56jNRB%2BNuJ18Ww7xQOjI%2B7i5mjyFBUYbIPY95oC7EA971y%2BmqYhz5NnbrZh67JgLuXe1zjGu0D5Hjhu1kTYxfoS4XEgeHB1fdoSg2xD8S2imx8l1L2NGTSjEV7P4Xlxlnj01H0XByJ8jV0Kaoar4H%2Bx3sDs%2F4R0nnkpMQAkxFNwgqGkhUDqXsTKnE3IVTdH%2FEuXqsIZYoWlsVTUdhfEmKptkAGtCjDX2LnPBjqkAUZyY7Wn2%2F14uNM5We%2FzAlqiF1Mn08QXru7dMc1avm6sBcgwIc%2BbyArUeyaM4aNxKmy2k2VNOvvgBIcOxMCWUaZOimFTNSUhlY1UXuFzz7ncKxLReWGanS1%2F9XrpJUBTLUI%2B%2FBgqUfhjrx518UdlQ6PaBdMzD83Aq0Y2cefufCwEgm9FhZ%2F1Xf9bXd1TVBU289uV%2B8zROTGGUsrVI8%2BuPllvr14F&X-Amz-Signature=fbdc98a985ae31571c4983893d0c4b22c86ffa5984ba79d56c10d9b27f3a6c47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46622FYH2E3%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T202426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDWQXoYs8ynkpGEpx63bxtQo71r%2BI9XcSeN8DrsANs7QgIgbS9xz23RMzW%2FlUBinP3qgWDMNe5ICHOTgNgO3p1q3RYqiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDicHD6VY7WwonGpdircAwVyULbUcZ2LlsMQXgcHSfHDBnFbXX6%2BimEoei8JDvWNzt3qjq%2BA8awUR%2FQEbq9xzene2mCKKUe9wFn6OoQZw8qHR9twkmD7Ar%2BZF6%2BMtkLrrYVQiczG0dozrO%2FisgA3LXZc62S1pQ3Nl9cumZO%2FcubqJH3ww31%2BvvMCguSR3FhOcSTcqHXqUl4oI%2FwP1nIRXLVrQgp1oGdXgVqu3GlfYWsfYToWNSFEK%2Bde9u%2BXB4YxG7A%2Fzi1tJ3919cZUq5WKViYosVMI97CuwAG2KUYwwF3t9EiuwFfDVeNKQVyePgDndgznpGUmq6Qyx79IpylH%2BfMwsSvYSUmxx7SpT6A8gd%2Bw4XNJZyvxCxjVvWTL3D8pa7eld3MsZNVsqxe7F74SGIzFjlIMhzaxRv704M84l%2BgQj0VCR7xow5M9VOHQIy7t%2Bn6BH4UXawwKrTwzd25y4f2BTvGeo4nFYsj8LEi2WE2i5GBeBd9ep%2FM1lGY48L%2BGi%2BTXiLGzxlBZDJoXyOmqgzkYuCzaB%2Fxu6BH7ahlHXxGoyrdBTUkoPhjyRnq%2FDmIcq4YcrE4a1%2FLX2mMFXh7VZnKxkNKdl1qc0i%2F6%2BYovhP9b1SSVu7Rg0KvpiyplOunDRr9ebViHFbf7YcbxMOHWuc8GOqUB8%2BJMLybd62YJiG%2BKvJsAmBfFqkIuPETaqjC7Up5rzdWKF5e8WRENelUz4PCVAFbYaV50mGFjMFfPlemqvwAx1Fd8UGX5dPcuPQcuFpZMc4tGsUUzCBtxrz5DpnCVcNYWfHn9oJX1ypopoH4UAYjOXtYVE2fZ6k36Uo35lwqadOvFAsJCdk8zQW76gZ8iuglnyiUmOo3oTwT3iJDju%2BmCHlhEq3m9&X-Amz-Signature=e98fd77f9d775deb177031032ef108eb864bbe2c58bc74a25f4b3bbefcb74397&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665654HASX%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T202426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDRO%2F3Te5h%2Fg7YWLaG%2FJYqact7gB9RwPi7lgTqiEHmS1AiEA2dvrLVWAKtOaT74uXLPwFNrkZampNrUNN0dq6rEZ2hwqiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGiz3RBstuLQBw03XCrcA1iJAYlAbdeWYeD7qvsf1Ca63NPZZrVb%2Fo9cN7vGjrfYxyIhKTpO6%2B0nej1RlkNM0x5rIQWtF5N7r%2FYSObEwCwu9y6a5YRgnWaqFRlxji6im14vLOf8Miv84HfmZiynLZmHfeMumoPYgqWRKXr8SP6HodEfpHpcVembYAIl5koUxLQBuW3yyTp9FdR7ImYwMvVj2WH%2BhKJHBzzJjLN6y2VLUhmaS%2B6F6f7TkfNmjghI3kU%2BPK3%2BR5QdBOtdbeD8IMlvIYeHtKJdHSo13fknUMLc%2Fbeu1wZ5bt0BNzjEKTkaRzAp5I%2F8OeUmAK4G0HHUXyFr8X3NMUJtzO9SbS76m3J4ckMc45URxw292dlLIsfDQ4vzZbGCNc48A4QE5jRvA7miFTu%2BxvozWJpQjCs8MvN%2FfkCJYtk9Ylu%2B6IIB4hxuqSCpP%2BhH986gm76b%2BL3YQhHe50tVMDReXlitgfxMd2Z4jxBE9m%2FjUo%2FBs%2BcW2UxJVKzD15yz9jthBdmm%2F2WrXGxzzCOfZ6ACkweQOlfF3aMJvWzf9bEnnUy9jJ690XtRrlPI2WmttFAImuQ0uNaGtsvSNcdcF1s6AwiBkf3RoyZ0fnmONBw7j3%2BQDY%2Fahy3tUpcUMBoipEbAM2Z1zMKDWuc8GOqUBDA%2BC%2BfV4JCtCS1Y1ieD9PUP2cg%2Fb0pm3NdgxpqqQCx%2BMZR59IZZzxQeElGWGGATe5%2B5j6TYbZQViNFtxtEAzZTs3h%2BcAKiWa8sXaKrFhgC5KfEXMp%2FhaiPpKwawYTP01rJkD2LKjSo7iYd1Q1UQOBOKAGLxXIY7Nu00EtqgBTgBCZ6y2j7V0SYzOsgoMqejDVvT4QXtrdtX3hVIU37AiFtPn2G36&X-Amz-Signature=7f5d80e297eb9c0855f6c81a76e4c64bba9ee243981ce4c0f9dcaf7bb5b82096&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZGQPGV4%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T202431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDbf34tPqoTl3NQINj0xh0GB%2B8d%2B%2Fn6MLQNBseCFGjKrAIga3N18NXEsXNml3Qp3zYjePQ596gq%2FWEcTDe%2B2hRB9YMqiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP9JsvLCkubhjANFVircAzTAnJeCSQI%2BhjtH6SVXs4IOCwYigshUTW51smqBv6j3cdM%2FhZaRXytiYBE9O34yfQcND3pIMdLc9lkAp79a9E2P2jkD1feES5kcvBKrG2EBxPE1m4uxU1LHHR7aJbI%2F8eFx3V1w8YWCwJowSdahXqBQFvXrZ20EtNYkYXNtMMbcVM%2Foi9CEtRbEAw8qYPX1yBfWC8AodrfTZU0Gq9PjF5z2M5%2Fw1OwwRT7T0D2cdSV6U7fj8h3kI1c8EhW9Mnpqy72ShJTwlOwLrWy0Ck7vSYLPmHnT3%2BAubjBUl89WetTIKOfWtjqFb1oBWVVDehj%2BSqbDosUh2m34M7prOfEXxa7a34QyMUfXWhIRH2iYj4GiofqsIsHXlQyzWYJi1AsXVBPpsZmvuy6Fps0GyU51f5lJdPsMDlZNwdC1ypT0ANQ5zuM2znTzSeXMoEH8v9xMONqCN6NuOrUZY3wbBti1FE%2BcS66GTbfawBJQfJ7UTggBBFOhleZtLrnCrmy5G%2BmUXug1LK4SVoT2bBdtczG4h2%2BE2FCiUEujeyiDMIWfwYapNFonOEXJWBQ6cd%2BuUqfR2iySW6xc02sW3KtQaXMAhUXdrRvJijNPd%2BVasPDqnBHyNfj1rzcwGhxVLvExMI7Wuc8GOqUBPv5m8xYoIgPVJn5tWySNhYYIX7a3OQLLr1IqB%2Fbzmw4jFZDNGanmRWDn%2ByC7Jb4mUamKuunfDMl9%2F0rIWiyOFzQ7ARZUazhSX%2FylzzGLgj8ku8JLkloiiIE5mR2G9zqcV1V0SyKEXLeSWvvxAn9xzK%2B4b0eEhP46vkulUqjIRk9ijfm%2FvqIbbTQ5RWjjf9qoD9K9hn%2FQPb%2BkSY3vEFE4ut47JEIe&X-Amz-Signature=9846fab52cbec2b4a03a965955d7d8367646b006316215fa4cc3f293785bff1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZGQPGV4%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T202431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDbf34tPqoTl3NQINj0xh0GB%2B8d%2B%2Fn6MLQNBseCFGjKrAIga3N18NXEsXNml3Qp3zYjePQ596gq%2FWEcTDe%2B2hRB9YMqiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP9JsvLCkubhjANFVircAzTAnJeCSQI%2BhjtH6SVXs4IOCwYigshUTW51smqBv6j3cdM%2FhZaRXytiYBE9O34yfQcND3pIMdLc9lkAp79a9E2P2jkD1feES5kcvBKrG2EBxPE1m4uxU1LHHR7aJbI%2F8eFx3V1w8YWCwJowSdahXqBQFvXrZ20EtNYkYXNtMMbcVM%2Foi9CEtRbEAw8qYPX1yBfWC8AodrfTZU0Gq9PjF5z2M5%2Fw1OwwRT7T0D2cdSV6U7fj8h3kI1c8EhW9Mnpqy72ShJTwlOwLrWy0Ck7vSYLPmHnT3%2BAubjBUl89WetTIKOfWtjqFb1oBWVVDehj%2BSqbDosUh2m34M7prOfEXxa7a34QyMUfXWhIRH2iYj4GiofqsIsHXlQyzWYJi1AsXVBPpsZmvuy6Fps0GyU51f5lJdPsMDlZNwdC1ypT0ANQ5zuM2znTzSeXMoEH8v9xMONqCN6NuOrUZY3wbBti1FE%2BcS66GTbfawBJQfJ7UTggBBFOhleZtLrnCrmy5G%2BmUXug1LK4SVoT2bBdtczG4h2%2BE2FCiUEujeyiDMIWfwYapNFonOEXJWBQ6cd%2BuUqfR2iySW6xc02sW3KtQaXMAhUXdrRvJijNPd%2BVasPDqnBHyNfj1rzcwGhxVLvExMI7Wuc8GOqUBPv5m8xYoIgPVJn5tWySNhYYIX7a3OQLLr1IqB%2Fbzmw4jFZDNGanmRWDn%2ByC7Jb4mUamKuunfDMl9%2F0rIWiyOFzQ7ARZUazhSX%2FylzzGLgj8ku8JLkloiiIE5mR2G9zqcV1V0SyKEXLeSWvvxAn9xzK%2B4b0eEhP46vkulUqjIRk9ijfm%2FvqIbbTQ5RWjjf9qoD9K9hn%2FQPb%2BkSY3vEFE4ut47JEIe&X-Amz-Signature=6b84a44916840e2c4749442ad26267499b22fc0508bc3c1eabf8914f0010d41e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666YXITLKE%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T202422Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDx3R5eqgMc78Znr06fZ%2BZuVZFWXUz4P44i%2FEAMusoZRAIhAM1hFmQcckbGKhrD30ZBukFdJffOVYK091aHafPt0%2FoGKogECLX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzOFoXV9ataE%2BHFkdoq3AMPm61g0SEvqZSzb5Z9aCvW7dUfp55gCJxRMfCN%2B4KMfyv2tC%2FdH%2F9p1TZiVjvHiCQ1rlRNzpGYgLkntaLMEOdQCPQzzRyI5xAVkqJMZNt5P1jKOdSH8DKzlSXtqlWmpN7PiUJOi1O5IdLSO4%2Fuf%2Bz%2FPOUr97ZJ5fWqrLRhV2ci7qOqA6e4aSpg5GTSq7mipB%2FF8KypU54BouxOsq69W%2FBCoy3KJwHMu5xAZburA4ReqBxPIcTbDeFF1FSav%2BSbgeTM%2BN94JCKMu4o6R%2FAqdoOIfwPrnbQXuG3OV4bl7GB6wSvX6q8VKkpmQCZn6Tn8cSKU8GEewidoVX%2FS2SkkisqzlT5JtQBx6mh%2B3hj%2FqGQU1v6vvfAlGlbOFkwruQJjpKpaijMbU0eS5lDUZzMryp8lDOD9uS%2BneQumZ0SfMTrKDbCChvQOy4OFLrDTQp%2FNZkmwXxi94Oxo3I0fmY9E15yMI%2BdMgMkCtkJfw5o44rEY4cVAQN0TVtNSNL2tWr6Y0vVNo0l0bHD5MvpVKWzaNP8C%2FCPyWHjl7bIu1%2FimLEdHgCOZ3TG0TKfVIoQInsUTwb2jOphu2a4e4utx8sqLP3LP6x%2F1rNDrXFQRDcd2V%2B7PpZi4wb%2BWQbNTG%2BP1pzDh1rnPBjqkAa%2BT7Mpzbi2%2FPdqiUm7LQRet5DYeVJwmTC3hyRzzRpJVWU5yqv8uybkrmiTmK2%2Fwds8038fXCbMcNs8xnxqGkhDX77cPyscOyq4Kgk5NSSizO5N5ed2GPuZx2IIjqpavm4Zq4pPCs8CHzMLnsYJXyUkl8dzAYkiOL82xKyfuL%2Fanjgly5b7nU4IwyCF0YZM9Se3ct36LONWmpWL0%2BaZhheQ7ck4r&X-Amz-Signature=8be66d03779d25079b891792eee947cffc385e31e6e9dc9abfb3b6260130db1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2CEPSSV%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T202432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDL0CWX3%2BHEkecMwT4PTJMfXrYIsasQtL7%2FrLo4QXJF0QIgG5BYfRtP7Ti6%2BxbaVnwc5KpCQYxK3rextbHEvm%2FeZnwqiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMigJagWXseumV2FlCrcA5wJaF3MLjgUk7qSV0CeJV5gqJGHtojt1oMbRMDopugCQ8aL%2Fjhoryp5vFIV7Hzysw6GMBgkLF06iYb62Kcmn7pJgYc83YpXZ2zFowJKdv4u6Ww8uar6vPrr5bYe8L%2FyPXqK3co94rO%2FdFDmSs4SlePbON75S3HNvOjdH7nIV7x%2FkhF2ndg%2F0mdVLD3dRE5jUlVTXajXYYn4bQPO4J5j5XxLb8xcCKjfp5K9hzb6O0nFIG6A82RF4JzmMErLlP78SR0FE66h2%2FNQMTKCJ3Q8O3pF7XA%2FqGEa2Cs3K5%2FtZpbX%2FdLR1Pr2KS0v%2FjnL31sQGB1RosCvWJP8408U7ejobopTq%2FTgLzrtt3UADGWmtX9HoQ7h8vuUgnjc3vf9Za3XFoQ0lAB%2BIJrehzdIQxi%2FGMgkiVs9142u7n%2F3niQkVlRLXU%2Bwu5NMw2b6Zb03BDkmUS9sQrbwZIVFZgSrEDg4%2F%2F0KyxQTkHMHeYUfbK8bCd4%2BfVGfVhyXDz4mLSkBdIhQPs793NG0C%2B3BeqfC4O%2BxgF4BmVvZTNOAE69FMUEjeKLETy1DvmYj3OREsJbh8bwvTGSamt9%2F6znUt%2FjmMcq8cZq4NAyKAObrHQ2SNktmqkM%2BD%2B539g646XUdoKchMJLYuc8GOqUBW4dn2m3R0njPOY%2BA9WjcqNB9nLCVS86%2B%2FNkdGSsD2QMtyUat0eBvH391%2Fg6BaAC4VPxzkbDej9ztJfcfZHnOPbybpkOAQSEbq8buhqX7y43%2B8bJA5eDOjLsBDAsuAkf2pJDTb1D1NFDyUL6cSm99rN1ROgIDAzHLYpm5xhRoagZrBQAO5%2FsfDjusYtBv4iiflSTu9XR5JlRl1nPkR79H35Ql7Svw&X-Amz-Signature=6b7784ecc6bdbce811169ea5827ba3f85b3c2ca87387ec904f0c797396f6e2a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2CEPSSV%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T202432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDL0CWX3%2BHEkecMwT4PTJMfXrYIsasQtL7%2FrLo4QXJF0QIgG5BYfRtP7Ti6%2BxbaVnwc5KpCQYxK3rextbHEvm%2FeZnwqiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMigJagWXseumV2FlCrcA5wJaF3MLjgUk7qSV0CeJV5gqJGHtojt1oMbRMDopugCQ8aL%2Fjhoryp5vFIV7Hzysw6GMBgkLF06iYb62Kcmn7pJgYc83YpXZ2zFowJKdv4u6Ww8uar6vPrr5bYe8L%2FyPXqK3co94rO%2FdFDmSs4SlePbON75S3HNvOjdH7nIV7x%2FkhF2ndg%2F0mdVLD3dRE5jUlVTXajXYYn4bQPO4J5j5XxLb8xcCKjfp5K9hzb6O0nFIG6A82RF4JzmMErLlP78SR0FE66h2%2FNQMTKCJ3Q8O3pF7XA%2FqGEa2Cs3K5%2FtZpbX%2FdLR1Pr2KS0v%2FjnL31sQGB1RosCvWJP8408U7ejobopTq%2FTgLzrtt3UADGWmtX9HoQ7h8vuUgnjc3vf9Za3XFoQ0lAB%2BIJrehzdIQxi%2FGMgkiVs9142u7n%2F3niQkVlRLXU%2Bwu5NMw2b6Zb03BDkmUS9sQrbwZIVFZgSrEDg4%2F%2F0KyxQTkHMHeYUfbK8bCd4%2BfVGfVhyXDz4mLSkBdIhQPs793NG0C%2B3BeqfC4O%2BxgF4BmVvZTNOAE69FMUEjeKLETy1DvmYj3OREsJbh8bwvTGSamt9%2F6znUt%2FjmMcq8cZq4NAyKAObrHQ2SNktmqkM%2BD%2B539g646XUdoKchMJLYuc8GOqUBW4dn2m3R0njPOY%2BA9WjcqNB9nLCVS86%2B%2FNkdGSsD2QMtyUat0eBvH391%2Fg6BaAC4VPxzkbDej9ztJfcfZHnOPbybpkOAQSEbq8buhqX7y43%2B8bJA5eDOjLsBDAsuAkf2pJDTb1D1NFDyUL6cSm99rN1ROgIDAzHLYpm5xhRoagZrBQAO5%2FsfDjusYtBv4iiflSTu9XR5JlRl1nPkR79H35Ql7Svw&X-Amz-Signature=6b7784ecc6bdbce811169ea5827ba3f85b3c2ca87387ec904f0c797396f6e2a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7SZ7PHY%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T202432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDjPymil84kI5KvxdGbAF4m3MWPDZB35lUNlioMT%2B34QwIhALEpTbCE4rE5laiDrXXHNyGRbeo0Qx2P3htesX%2F1lKfWKogECLX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxFCn%2B7bLUNJHH0yxYq3AOjasCCio0WhwnJAOL%2Faj0rxStsCuNXep%2FHFhUyoBWY0UYJqwnDPwCAbGrnHJ%2BYOboajpMenFxo22A%2B3VBaume5Ie%2BqM0WRwwY7IbnzvVvRMDHrp1OFuCvjRXjcXiT59Uk73iXDWQZxDR379J6YkhqdPfzzovQEtCJnVMPykVGLE0QAbCE9OTwSGc5xsdxbCeKYTl50gq2LaMLbW47j3%2BGw4%2FvElsBg9a9x0YCUkxKzkGFFbhidOejEkqRKIHkiUR1TvvzUmL4BNTlkISsILjUE7eDcBepr%2FKNabkUerckeQ5Zg46L7jIjwJ7VT0lK2SEACdaqw9qd%2BKh3ggv8oMK4YjrZa25T6dCA6WmzTSlEsT4%2FqzCpwd6q%2BBFpLegrkCZPUDSLS9mbCLQxe1cvx2Jxm2vHXe%2FOSxuqjtw6GFMDav4p7ZgBZeyTBBGVyarEZS%2FXvzrWhBwoPgCAAKUVjfYebEKKG0yho5FL1bSxF4b8VHZy1dANWi26c%2FDsea2cCeoIYFcI%2BGHAlQdt6xAv43c%2FkzIXu8nhrljY4EmpUhw5ZAOB3BH%2FA69hqUZfQb61XS8gvt1RSBcV9mLuPKs5oZFrJ6Vjo2whmLAbfFquZOzaAkZJ3fSLyUuOkT04xbjDz1rnPBjqkAcDARoSFxL2xLORyRSr5Us8nqXOEFCWoTtaBvm3X3Sjqe18DR5xszMI3ZGzn%2BNDcTPZMhJCqJGC4UJZcmNakO%2FOtFzT7Slv4OEDtHzQCmcviHJUK0Di0nluYaeeb3ZvxZtD%2F0ltLW%2FrEbz%2FZr7UqtPLO4nW1mOL54BpJEa9xAP%2FDZNZbVDvig311U9kLuJeI1tfiumaH%2B1%2FMLB5h%2FxV9d2D1fYsz&X-Amz-Signature=9ca84caad6a35056868097e88e9b67053787b014e0c4dfdba8ec2b3c28bfe8ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

