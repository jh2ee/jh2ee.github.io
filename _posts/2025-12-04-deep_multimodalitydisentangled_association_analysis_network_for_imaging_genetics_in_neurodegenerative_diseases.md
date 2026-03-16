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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMT6EWYB%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T085225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCID%2FlWQAQtsQ5g2%2FMMVXoIQidcXOSL2ZnVosXWyeYUuNoAiEAts2rb%2Bplof4tPb6RnGtQ3SqYqFXJD88oqq9lFfBuhxEqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCZnClDcXcNbo5xXmircA8P9ue11tTwQivssq4S3rt9lAa2H4ULnJfnz2nroHjANaiALPHezjFAKt5jk2e2r5Oc4SNweOwbecYmWKOfg2AEag6GJQLcIwXKWcAJ2gNpOutWZNVxq2KJRugxh5%2BoVVnqIS4E6Zn7BaRfRH7sX8EunGUS%2BkyXG7qdfEYANR8SzKt1i%2B0Vth7cQ7pO8kqSlFTblXYhQIiGOmKjz9r2vy5xLrrJTVHK3qPI9dkT%2F4vX6H3uBODMVJK%2BM%2FAsQ2TF0zAU5nW5BoxH3dR%2BvfBp2QCN5om3H9A2%2B6gzUAVrQSlNBm%2BxtV51pi6CEuCTWOZrZjZsbQRvU1dE5cIbVE9KNz%2F%2F7MGVDG6qbnURKIdabZNa%2FpvzgZ%2Bdwuoij3SPcJFEM5L0NbCX4LZNfHkGd1rZy1jY6GAGjWoeYrKJ0amXRykSyueGzMURQnXWSzAy1tDd3KQawY9%2FlBXNw3rdg1VvYdLqgagJdj9153i7BC20gfMCo9ciaRUvihtrRZb0xmX0MdAJ0h7cu63tjjg2dJAGY5WswHiD2QX9a%2BIg3HNXtNu7l8MefxlMs3vLV0D%2BE7mMz8IAbQx4D7vkIJ11998Q68KLG6BgNSKeEH4IpiScrH0Vplca3jiAQAnusaSMCMMP03s0GOqUBQ5pZHBAHQGW0Qv62%2BKqHYNRGZpeS%2BdIOsxQ7U80EIt8Ue6Z024epzqZnV7zVTGhCZqOO7siRH371%2F0owR%2B%2FL9CZPF9Wn1ITsZ5QERhZGpODmpT%2FLZ610OXckVV6z3t4kEyaVQU7XqaB%2FvtghKyYu84it70fkyLz8U%2Fgwf7M0BVGUUDUf%2BIZO0xnlzPDj0TB2EeMUb%2B%2F7eSMzy4LTFoXY72nYvG68&X-Amz-Signature=0e6ff9a0b309bac634701849ae8536c95a8d2c41cea5dcecfb7d9b75bdc1712e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMT6EWYB%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T085225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCID%2FlWQAQtsQ5g2%2FMMVXoIQidcXOSL2ZnVosXWyeYUuNoAiEAts2rb%2Bplof4tPb6RnGtQ3SqYqFXJD88oqq9lFfBuhxEqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCZnClDcXcNbo5xXmircA8P9ue11tTwQivssq4S3rt9lAa2H4ULnJfnz2nroHjANaiALPHezjFAKt5jk2e2r5Oc4SNweOwbecYmWKOfg2AEag6GJQLcIwXKWcAJ2gNpOutWZNVxq2KJRugxh5%2BoVVnqIS4E6Zn7BaRfRH7sX8EunGUS%2BkyXG7qdfEYANR8SzKt1i%2B0Vth7cQ7pO8kqSlFTblXYhQIiGOmKjz9r2vy5xLrrJTVHK3qPI9dkT%2F4vX6H3uBODMVJK%2BM%2FAsQ2TF0zAU5nW5BoxH3dR%2BvfBp2QCN5om3H9A2%2B6gzUAVrQSlNBm%2BxtV51pi6CEuCTWOZrZjZsbQRvU1dE5cIbVE9KNz%2F%2F7MGVDG6qbnURKIdabZNa%2FpvzgZ%2Bdwuoij3SPcJFEM5L0NbCX4LZNfHkGd1rZy1jY6GAGjWoeYrKJ0amXRykSyueGzMURQnXWSzAy1tDd3KQawY9%2FlBXNw3rdg1VvYdLqgagJdj9153i7BC20gfMCo9ciaRUvihtrRZb0xmX0MdAJ0h7cu63tjjg2dJAGY5WswHiD2QX9a%2BIg3HNXtNu7l8MefxlMs3vLV0D%2BE7mMz8IAbQx4D7vkIJ11998Q68KLG6BgNSKeEH4IpiScrH0Vplca3jiAQAnusaSMCMMP03s0GOqUBQ5pZHBAHQGW0Qv62%2BKqHYNRGZpeS%2BdIOsxQ7U80EIt8Ue6Z024epzqZnV7zVTGhCZqOO7siRH371%2F0owR%2B%2FL9CZPF9Wn1ITsZ5QERhZGpODmpT%2FLZ610OXckVV6z3t4kEyaVQU7XqaB%2FvtghKyYu84it70fkyLz8U%2Fgwf7M0BVGUUDUf%2BIZO0xnlzPDj0TB2EeMUb%2B%2F7eSMzy4LTFoXY72nYvG68&X-Amz-Signature=0e6ff9a0b309bac634701849ae8536c95a8d2c41cea5dcecfb7d9b75bdc1712e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXFTFUWR%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T085225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIAzaEOH%2BjBtKymvItxFv%2Fc2KEQTnUxHFaBN4OZ%2FJhJ%2FRAiEA0P50yUDJ7unqfZ%2FL4iQg2A0YksIkLLf2YebG%2Bwbq7usqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOspNT%2FG03OcrBeEeSrcA3ajUVxYmaHazUy0ARFLnbZM4XGjzPEzvZJ2HSrzZEupEp26fIG1dtXymLCAl8c97%2BzGoYsF%2BT3Elsw0U0mPESYKjM%2BxGmT5R3%2F1j9kS7%2FwSlapMCAj9WCrBSLeRQafAj%2B%2BrXRWP1yJFkOmI%2Fq1Rp7UulcVuZ18DARABHkoO30Ap3v3ZX%2BQyxVSbGeDejSWYtWuBfHAgVcEnk7cbEaScGVPt8gUEug1W6ZpJWT85C7JIZrI47g6h1B0yzRGIMRRFUZ7KuFSMl8njDUrGvxhdGrzIQUU6Tpwu7aDi9h49BovuOMScRMQOL9Lng9tDxpoUoF8yMjIFXamryzOfBPTUqvydXOQUF9vR9xWDpFXS%2FRO8%2F7YMLHaQOLud5ceGwN2tWGdWEXefaF3pBPCHDngYPRncpe6iFXc%2FB0W0lqAB9jYGGLc3zQDpZCVC06sC%2BvWMWrnjn0DKnYuLdkACPxBegbthTFH%2F6ShVqsMixfHvDOI%2F0HBN2boAh3D72m%2BxD7I3%2B7ugzGpIqaG7ueFfvP%2FhJ1qDRVDLQJjAbzANhcwXIiViEIcmM5BUamOjZW2uB25qkkALPLI79CuYobc2MglTQAPnarGwuUJdsRjQs2O6bK8nSJBprFOlCP2dr0jtMNb03s0GOqUBGN5gpa1PPC%2Fegna1ZYcF%2BWP0q8DAY38Ung7GyGrfPKYzrB%2FBPjIAEVRdq%2FW1%2FJ%2BmTrC9S1lzIsetjQu82nccm0q7YtH54q7%2B0y9jxllzSBlrUrpIlQcovzww0L5CRodt4xc7mL0iGTHjSuv2bPbvmqs1if1D6bs5Ecx5E86d5l8QSGRMG92CADQm378csg5rvHGkEaDgzlR2KogU8KnoiZ%2F9JFb9&X-Amz-Signature=2a4e3501f85e1441e6d82680fd0c2217c79143e77bc8ea034582d0b1d9e43a87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WFUM3XR%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T085229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJGMEQCICZRb%2F1dcxF%2FpRWH6uRYfDQj5AY7I1Lg3ChKM9RCvg3kAiAMF2J%2FrPe7JfMRHamNeK3rVZGsakm1GrtTaLJVmDlqtSqIBAjR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM53aL%2BjDUH%2FAKmM5SKtwDo8L7Qqq4snVqIwiFmAJBzDzzxnjYSsThtZdMyNdJUPszfSXqTbZ%2BpKf845PcS5697TPXFN6LM%2Bd7zP8s5T8e1Dvxlw5uxR6oxZemafojo%2BVdH5MFiZj4QeK7NGH8auQAJm8t3v3xkZiosDir4A8wAM0VpQyw86SXw8A%2FF6hlQeFJVCb2mxjouTeOERXmSDwHxplyxV6ABak0t%2FjIbtIhGHd01%2BeDcsEb9mB8AGPEih1vskuHQdAspp%2F4sFyIAn0Epduxq%2F0LnCtrWBAM7FlWapKZqYAF6A7diu3dqU%2BV7H338fN1b%2BBeh8AMD2IILrr3ZyzFPRzvyOQD4OqcFZ%2BPs02UoImnbESHqnr3eP2a9FO63hvzuPvu1iddhu9SlZubEY6qBLz5NAzDQgJ0m7EVXitevsOVySOWNFO0rkDjLo7T2mSAUlxtdRjCFmc%2B7d%2FQXihfuaWjTkhn17RmU3ldSuHnIJsr3r8qRuPl%2Bgl8RSy64x2QGgYdm%2BIbiV3GFQRd2%2Fssm41%2Bh47pgO%2FEjcZ5bt52HkL5Jmin%2FxPVF5PNU3pYMXv6APTHlGDgGhEkIeiKVjTNQndHj2cjzpkbdBz1EvyVKK%2FwUygz%2Fs7BBdQlW%2BKIRu7rMkAFgfqdAskwkfbezQY6pgFsc4ZIAYKnhwoD1Zpt12orls7rSjwDp2DSs86eHeSQ%2F32%2FJK5UqJKEUcfFVub0XC4dz124PimROtIp7R3bU3uXjOEuUZMK8bMiAnVFShQK%2BfUlpjcGWk%2FJgm%2FQiV5zAyqv4Fm5hckhw5IZZRK70%2BrQcqG4gPi2%2BUKawR%2FOee6PsHtFn7BOJvqOgCAST%2FXKx31vm7co1sjrjDJDDot51d16lLxO%2BUPn&X-Amz-Signature=4c49fc9c1bfbfd53ae1fcceb35206e6782b7b6936e5553574f787210a185809c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WFUM3XR%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T085229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJGMEQCICZRb%2F1dcxF%2FpRWH6uRYfDQj5AY7I1Lg3ChKM9RCvg3kAiAMF2J%2FrPe7JfMRHamNeK3rVZGsakm1GrtTaLJVmDlqtSqIBAjR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM53aL%2BjDUH%2FAKmM5SKtwDo8L7Qqq4snVqIwiFmAJBzDzzxnjYSsThtZdMyNdJUPszfSXqTbZ%2BpKf845PcS5697TPXFN6LM%2Bd7zP8s5T8e1Dvxlw5uxR6oxZemafojo%2BVdH5MFiZj4QeK7NGH8auQAJm8t3v3xkZiosDir4A8wAM0VpQyw86SXw8A%2FF6hlQeFJVCb2mxjouTeOERXmSDwHxplyxV6ABak0t%2FjIbtIhGHd01%2BeDcsEb9mB8AGPEih1vskuHQdAspp%2F4sFyIAn0Epduxq%2F0LnCtrWBAM7FlWapKZqYAF6A7diu3dqU%2BV7H338fN1b%2BBeh8AMD2IILrr3ZyzFPRzvyOQD4OqcFZ%2BPs02UoImnbESHqnr3eP2a9FO63hvzuPvu1iddhu9SlZubEY6qBLz5NAzDQgJ0m7EVXitevsOVySOWNFO0rkDjLo7T2mSAUlxtdRjCFmc%2B7d%2FQXihfuaWjTkhn17RmU3ldSuHnIJsr3r8qRuPl%2Bgl8RSy64x2QGgYdm%2BIbiV3GFQRd2%2Fssm41%2Bh47pgO%2FEjcZ5bt52HkL5Jmin%2FxPVF5PNU3pYMXv6APTHlGDgGhEkIeiKVjTNQndHj2cjzpkbdBz1EvyVKK%2FwUygz%2Fs7BBdQlW%2BKIRu7rMkAFgfqdAskwkfbezQY6pgFsc4ZIAYKnhwoD1Zpt12orls7rSjwDp2DSs86eHeSQ%2F32%2FJK5UqJKEUcfFVub0XC4dz124PimROtIp7R3bU3uXjOEuUZMK8bMiAnVFShQK%2BfUlpjcGWk%2FJgm%2FQiV5zAyqv4Fm5hckhw5IZZRK70%2BrQcqG4gPi2%2BUKawR%2FOee6PsHtFn7BOJvqOgCAST%2FXKx31vm7co1sjrjDJDDot51d16lLxO%2BUPn&X-Amz-Signature=5cb54c6929f430569be1cdbcc9cfbe4639066a97c91b4b035d96de5735cc2273&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BFYAWZ2%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T085229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJIMEYCIQCXlNHqqHf6WcbtvenFS2hA0x%2FcbP%2Fw65ldmmE31tsLJwIhAMUg9Z5m6JlaXg23dyngS%2Fug%2BhxD3K5B9r6xG2tkReRYKogECNH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxVe40CiTmrT3mp9bsq3APjvGHURQYJDgk%2F8UdsvC5EUS9PAc9qj1EfnsW5LvDuajrwitstdD%2B1LgnclXApp%2B4tr%2Bfdym6QpJb7Vt2eyv2qVFRM55wxg9N26I3j9y94zOnoNsWNkK4Otx0LBnAnc%2BVWvTdLyioYO%2BJ2dnfhRahMXPGVNakq1uFHqq6VSS%2FicVaX55hS8RDxfpXle5Pi0va3Crltin%2BzMps%2BvI2PQ9ZN2wxT00xlxP%2BfPsbk9qMzbhiksc3c9ZHCtfi1pt4CKP3fEZgHrGaVQbPBy4HD6eGeipDp6SJucy1MU0BX00ywPXUY9Jtxra9Dyi8pVzqUmpzNi107FBR3CbCHaYATGXYLXhJJO%2FP1%2F8AprxS%2FEUxcUkM%2BAO6nd%2FrisWGlB6%2FlkrKER3T51hsSEHtdiPgLrDDXnywMMAlok6DRywfiS%2Bieotgrv5brwIlU8YCy%2B3EnIR9dUFC2jcObOMpsfm4HjF6dlmmcLNK7HF0gQk9n9vlQm73efNz56tG3EAUIasHkKHZ6xGvchWUoSlh3jn3ZFfj5tIAVyYMcmyGUH%2BUAro3cRq%2B4i74PvV2JPmhKWIcdNTNGFpmft5fKF4dGiizqSJKdTFQb%2BVqW1yYy8Vz9Ny4JPNmutPHp0r%2BU87VxdTCN9d7NBjqkAUML%2BmsWvcVQPs0RJ4BfmuzTMNF8LkF%2FemLqHxgr6aFdPP%2BoDcdOvhi43qs0JVBIMw5Z8kKOEG3SrNqbA8%2FqycxDBrfu6vQsJgqaE%2Bl7E92OD36QULzSzHYv7cpBTEXdQBVPJxy8QQVGgt6U2dxNzPSSacMB5Jm8zoLYNvdFbovaI6YhmhNT9mUcvn5sXMxwjsNa%2Bm3d0smBoPLlxpU27QYjRMU4&X-Amz-Signature=90975200fe188bfc79f3d4fc9c25bc0d5865b7e47e13b4189647234914c4e380&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662EPPWCQ2%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T085229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJGMEQCIH31LLaPaRGgb1HAZvFIBOVE%2BkQXTGQ8K69LEDXuq2f9AiAvoIdXf0Umf2k9n5Il5Bwo2BPUoz3avNapt6jxtBuyaCqIBAjR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMtXnTBuQa4B1SCn5eKtwDRVGMdazLGKbw%2B%2BDpEmEz0b95GjI6%2F4EsgCNaD5FGC2MBh24WdfsGvsh6LXfdb7H9LWBtQ3ZfgAkVru2hlwUytWXSjcRYK5A%2B1CMZtuR1E5rFReqr4lxrLkRymMiS8plwR5zR5okR9W4nX79r1s0EyZwG0I9uCZL41gRTl%2BXzxcvpjNhrhtYBGyiBXvNRAgX8wACgxCiQiltzzkDn8zOXGIDk7HAuuylEGnnry3SHkJYGKy7BjMWNsweS4oMwFHwHPrObIhvbkvZX9QDh%2FPGgOAseQR5Y0tel9zoCZu3IbJFtIakt5xMZ%2BteG4wzt03%2Fqkf4iORoKyFK4EfVXAA%2FAx9GOyXace2HwB4XqLXqudKv1QOP6A94Up%2FNh9RnFYc6T2NGGDT6x%2BWE7e1w%2BRw64zqZ4kb8bHY2IVQd1F9hReKyXuT0YU2aljn80bUA39qL5FUwcLq2Hk9cjt4U8dpvF5R5dr%2BUckcCLNzWSWJ2GsSjfHDkn2DlQ7826K2mL5XJZ%2Bu2b0ydLa1ILmSD5LzOf3VFRPqI7KSIqPe1MdPpc68%2FPIfZrdJfIa8qFDMJmN9G32%2B7DmUlte8z28XCu%2B%2FxyC6th3z%2BYl%2FMXZqhd%2FVhf9nNzFOkxgE7vvkIDYmMw2%2FPezQY6pgG3sINmO4K9DhFi2fOlYIZjxslurPrhLd0k7dDI%2FK1uF4rdrJafJT0TLY1b9RuiafyNXFUSBrsNQj86kdWwlamOXEA6g9QsGFE9tO1Vg4BF%2F6rUz1biyjQvKjQ7GhHUz1Bn%2BouwbFFMprHExtb6D6PpOZgtDek515R8HMGWc6y%2FRd5n6bpzi%2B7uoeJhjfDXSE8e%2BAX%2FVSWWVEw5aFvn5EHauEX0H%2BYG&X-Amz-Signature=1bd5019a8e3f090111e11da9e303e379db9d7c3eb46cc790bf1e32cd70d99dc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627TE746M%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T085231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJIMEYCIQDnk36ftjEnb2ohOyadueZTQ1%2FYtkJBUXSU8%2B3K1Vk%2FlQIhAOWo5clb0XBJ%2FdNartbEwnlvYo24WKdFI%2FvDmqRYmy2QKogECNH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwtKQJSJwOLsoR8kMUq3APL%2BoLYneWOCaqoY4jPVof93b9siBSaNhg1DvfIHLX%2FBPqjY%2BfTm8UT1%2FDbU7WfoHB3aWNH3VEdaCZARHpVym2UYCKXfTzWRrAYipAYu6xOS4sQAEJlptdSCFdqkpEgKLQ77oVsDXean76Duqk14Jd%2BY%2FyqMrts3UkIEJOftGdKtZSGsXK2GNEuxxthfXe%2FA9ucjSApmVeXjUYaidHt%2BHmVhFoE9kUaOWmTxbMqSn1Ha%2FsrNNqUfandrcvAhpeTlgJJ13wMVFfJzE7bxxLONKXZYc9ncNGFGSYLctpMph0Ml1GCca%2FQYSMiUSaKMHT2bTTzBdseQW5tRHhPyMUOhAtahTRj6HGL2VHRMZ7x98%2BaKnEW%2FlAORksrAyF7kEORNAu0hnunrMkIyIahcK6Krlwi%2FzrG010FXNTpiTZG39zeUjw5sewzhE4%2BH6ZsC5fI5RZP9tv6mFAYsLzF07kDoKOaV8WWYL%2Bb1kH2vHBpZbWgxArNflYvm4gtom48VNdGRjkb5nC5%2FkyOS7ET4dPBhBpb%2B%2BrkbCvwthKEuPrzppKEwyDAa451vlQV6VTM%2B4xuYkvejmVj4twdfyRxBtNj%2BiUg9A%2F%2BhD%2FSaefjgjAya5y6aDvXd%2BlUuB1IT%2BOwCjCK9d7NBjqkAaFaeYZo5BL0U0aLAPdaJpiJRHiWC1jl0BTud7yDp1X16zRRFrI%2FSrridGJ%2FZ5HxuXF%2F7G7NgpOpC2NPAs3OpvYNbCqSf5GYgAjdcr5laH3ZYdQhziEIiqHz8RaC3lwqvZhjXkM4Wbnxo0imQbWm2aGXIcEV8Jnr3%2B1sWLU2%2FHBglvQT1%2FOMQxjISDpcapiqhmEKAzz1t9f9iPHYSFIT9k2pRVzR&X-Amz-Signature=272af9ba1a0ce4ce6501609c2dd8eb415cd79b7e8c54f3cdc45726d8f64ddf9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PSAPZO4%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T085235Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIQDnrfc6aydxucfMZeYgog3H5CQXgLfVXvkCYkHZmp9H2QIgTROvRtUMFWLsTjPr8I4rUExQ2ZOZ5i7ROazoFVPk98EqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCw81gJsk5kXF7sT7CrcA4isfGgy9zuVS52spabtn7e2dli8DRTV7at7v84sLg%2FHfSQPDR2JQToKAr20CJqbE6iLKLSrGCfENMUXfxI5huHq%2Bdyn%2B4Nmi4vC%2F45LKe1aa1c6ABDc56A0HTtJ6azq%2BpF%2BhoHkchG%2BHJnlRiaSJm4V7s3Bj84A%2BNK%2B8fAqBgCQumHW4VIJc9jVAB%2BK4KjpLL6s95CAjHp9efNMPAVWjpMd%2BdCZIISsy1gmuXF8tzAnohc3mJK55gZ1pkjMOKb55ioyjymsZe2mcoZ%2BJ6YsGl0mLqAjC7B5F9jeQ8LRvDbLehOrn86usaq%2FwryiMRbVni1ByK%2FSxKt86bYBc90d4eCdawJI%2F1NdXpt4ih7me4ZzdHJoL0baFVjmd5NZtx5HTYBur1UiraLXCh%2BlPixiIhodspegTNdggB8%2Bcd05Mr%2FBakjrM9B7DI9yA3Qrv7HAak6%2BpssociNlPhTXkj%2BnGzUxHdOb%2FPGq9b%2FxG2Pel%2BETRhbGuM9eZoaZOQpzieVSu1zrj5m8wCgaiS2D43n6QOwKqfQE5wnpLvCkyA%2FrH3pfTA%2Fg0UB4YsvQhEEEiilet3Q97aoyyfMmoLPU%2FthXdtjN904cgZoECU3vAYP%2FpX%2B2OtEQDHCGMXDA0gdGMIj23s0GOqUBnQFvO5d8n0%2F5PQMwwBFv19UKVQh0BJKO7K4q8y6kSjpsBsyOtDysCiG2zPHyuoPkhq8d9OZOEIhRs8U0TgJ2VH%2FYcb5QzK6nrrKFf3tvjCw3yYbmDcR29%2FccQH5gvCukOWUNZtgCcY2KEdk0w%2BtQVXqFqxnXzJ%2FE%2FO%2Bm9mMEZ4pLTD6MHQG7zD96QqVifnsGxonB7808zyPF%2FSrXKksJBb%2BdWyrR&X-Amz-Signature=26a4ea2d709a8830e0c14683a6c7f315d83fe6b3ca7cd24234a0352395ea3601&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PSAPZO4%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T085235Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIQDnrfc6aydxucfMZeYgog3H5CQXgLfVXvkCYkHZmp9H2QIgTROvRtUMFWLsTjPr8I4rUExQ2ZOZ5i7ROazoFVPk98EqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCw81gJsk5kXF7sT7CrcA4isfGgy9zuVS52spabtn7e2dli8DRTV7at7v84sLg%2FHfSQPDR2JQToKAr20CJqbE6iLKLSrGCfENMUXfxI5huHq%2Bdyn%2B4Nmi4vC%2F45LKe1aa1c6ABDc56A0HTtJ6azq%2BpF%2BhoHkchG%2BHJnlRiaSJm4V7s3Bj84A%2BNK%2B8fAqBgCQumHW4VIJc9jVAB%2BK4KjpLL6s95CAjHp9efNMPAVWjpMd%2BdCZIISsy1gmuXF8tzAnohc3mJK55gZ1pkjMOKb55ioyjymsZe2mcoZ%2BJ6YsGl0mLqAjC7B5F9jeQ8LRvDbLehOrn86usaq%2FwryiMRbVni1ByK%2FSxKt86bYBc90d4eCdawJI%2F1NdXpt4ih7me4ZzdHJoL0baFVjmd5NZtx5HTYBur1UiraLXCh%2BlPixiIhodspegTNdggB8%2Bcd05Mr%2FBakjrM9B7DI9yA3Qrv7HAak6%2BpssociNlPhTXkj%2BnGzUxHdOb%2FPGq9b%2FxG2Pel%2BETRhbGuM9eZoaZOQpzieVSu1zrj5m8wCgaiS2D43n6QOwKqfQE5wnpLvCkyA%2FrH3pfTA%2Fg0UB4YsvQhEEEiilet3Q97aoyyfMmoLPU%2FthXdtjN904cgZoECU3vAYP%2FpX%2B2OtEQDHCGMXDA0gdGMIj23s0GOqUBnQFvO5d8n0%2F5PQMwwBFv19UKVQh0BJKO7K4q8y6kSjpsBsyOtDysCiG2zPHyuoPkhq8d9OZOEIhRs8U0TgJ2VH%2FYcb5QzK6nrrKFf3tvjCw3yYbmDcR29%2FccQH5gvCukOWUNZtgCcY2KEdk0w%2BtQVXqFqxnXzJ%2FE%2FO%2Bm9mMEZ4pLTD6MHQG7zD96QqVifnsGxonB7808zyPF%2FSrXKksJBb%2BdWyrR&X-Amz-Signature=9158fabb4cbb54a8f8b7da126599453b16f48f12ff74c4ba0d53478cb7fccd00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SL5EUOF%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T085223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIBBa8dkcc62qrsBE%2FuRUc2Zm5bUFspiXtgY2%2BcAqTRKTAiEAi1F4chYjdO4LZGMg8%2FwkqXJL7HXLSYyRaqMNiOr9r0IqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOE6UPGDLLocdFoEiCrcA9S2aaMDkAQJU0UrCOusD6kwKieQJj9DNlAjX8jNzMBjTP3qHeYkfz83jcYBzD2r1lCZEYaRziQBo69ZpCkO%2BizGKyKy0dqs%2BN9hGH%2FITOUI8juR8WMHMh%2FU1rlkIxkrhB6S0b27q%2F5%2F6BJkyf4hbDX0rVe%2F1OLHxD%2BdRcVEqYyrfQkUno8fnepadoD%2F3mDKQ0bWNViubMHyZfZlWkz%2Bot2ynUZbmvTrUCQe1xY8US%2Bw6CxY7KPARNWKkAcHlo%2Fg32M8m%2Fi7OqC9VvxYv4Z8DhaC2DgGlbd2Ts7pZdLX44h0jeBwdc3JWdn1nPk5EBdHjec9g%2FjTrWjt8s2bNojJlZBnlexOO%2BcdNi4QI3430CjPFFu7AOc1xBx7QnIM9ua6AH%2BhY4nmSWpdYvGyBVNXoSx66mH0KMfHh9rMYtYcewg28zLxhHUkQCbbtuQHtBQZR%2Bah0w484Btowt0w%2FdklXDuAslNK2lhHmNVtQIim8RnIrwPNiscDA7s8vgE1AdO9yGP8rTanf8CKsmm1xgjQiq5IC%2FtDD%2FaZAGN0u7CEyu%2BsUJgZx1J%2BQdXYxkdQ3JmsjaV%2BhUjvQgCu0Xg0fF2wXoLmyO%2B4WBVKG6WhpHBYHs84purjciDQmCWqsUbRMNfy3s0GOqUBLLMTR4qjZfrMfr2xPnRtvFcX8wPmMhMGs%2FhtcwK6%2Fgdmh24hlArkXAXUxME1kUE6brNFFU1F%2F4r9%2F0%2FBUffk2selTDgFjZ6eScFTbDoOFBh0luq5zKSWKSnJr9s2P7e4SCQ0lBGmB6U0VcQv%2FU8tVakQsO9Rs1YOGWfZafCWp5soMHknIgcBV76fNTBz8cPD5m7vKYSZiscrxipadrF8oEO9qh8u&X-Amz-Signature=98b338d0c982b7faa520ec61c2fc5a41582ecc0ae029174ad9c3e651a5847a56&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LSQ4ELO%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T085238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIQCHfgcCagNyIY7OOXheqnzijsd1Q2bH7S8BYEC3nfk8YQIgaXeW76J7pqeN4UF4jZPFpm%2FFW%2BHRhzrXGqkG4tucBdMqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP%2FW5eaK45lCGX752CrcA4aX5iPCZwpeFv%2FcuLHzgTo8NVCAi37xqlgnQtG%2B1roKrRD1uL38EbPHipjt2hEXSOLwKNAonJNw6Pbpm0WlW7iwyG131WA%2FWmGdOl4jCKhoQmfe4eOMNHdRFv%2FvTNnvu2oUMF47cHHpw5DmOCBOAhPdFZ4KlpBXgNk06mn3aOjIGHq%2F%2BzIW0SyC4EGwZHGC0lOUqRtB19n8XZ9wjlW2lw6t2TVMFaKRjYuosiSenaPW9w%2Frj8Pzst%2FAnB4Ui3dcGnsY6VtZi%2BcXVkMVBhypkIUyt%2FxpzecTeacLdwn2esk7R3QZZ5IZMliiHgOpztzUES7KCb65JoISDU7asOaaC9lrFskni7JGunyoY%2BLWJyuuAlj7%2Fq7tYM9nuJywbE9Z4AMkT6a%2Ffh%2F1FFBUeIZ8KwLMlIIzzVRxisEBI9fL4Payp9htT1anZ7qVumKyYMoJLp4Uf7N6VfCng6UJbKb%2Fc55y%2BdOB1QziDWbOa6pmDwZqPuCN0EO4CjzA3eavXS3uRNmSpy0dhgIdLQXnywsV2R2A8JJVHZ4tBIoifN%2F9zHGajy5bWf9moe%2FmnDqhPS3YjxvewajjWTrcRlU8ECVqhGSszLcA0jPjKcF8Y2p85HCjCmMX5Q00LDmlRyCFMNb13s0GOqUBpIrsMgTrzLhDl3PbKNNfNtXQw48Vf1VrHAWD3vg3XffoBEv5ypTP%2FEPXQar%2BIvBojPFG%2Fgoyfic96K8gntLi0iTc9wm2L0plgrTZzp5S6fMrIepOwl9%2FQpDqVs0BEAs3AHb%2B0cA5EgkL7zC6yCT40bY%2BhjnYvzTt0FvceA%2FBMY8xA%2ByoiSu6mvjZSqNthaAAc1lseRXOYHLysPXVejJ%2Bee0YWIy2&X-Amz-Signature=99de076ac64f7e128ad3c50a6bf4efa631b37f8efe1006e40fa86d79b314808a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LSQ4ELO%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T085238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIQCHfgcCagNyIY7OOXheqnzijsd1Q2bH7S8BYEC3nfk8YQIgaXeW76J7pqeN4UF4jZPFpm%2FFW%2BHRhzrXGqkG4tucBdMqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP%2FW5eaK45lCGX752CrcA4aX5iPCZwpeFv%2FcuLHzgTo8NVCAi37xqlgnQtG%2B1roKrRD1uL38EbPHipjt2hEXSOLwKNAonJNw6Pbpm0WlW7iwyG131WA%2FWmGdOl4jCKhoQmfe4eOMNHdRFv%2FvTNnvu2oUMF47cHHpw5DmOCBOAhPdFZ4KlpBXgNk06mn3aOjIGHq%2F%2BzIW0SyC4EGwZHGC0lOUqRtB19n8XZ9wjlW2lw6t2TVMFaKRjYuosiSenaPW9w%2Frj8Pzst%2FAnB4Ui3dcGnsY6VtZi%2BcXVkMVBhypkIUyt%2FxpzecTeacLdwn2esk7R3QZZ5IZMliiHgOpztzUES7KCb65JoISDU7asOaaC9lrFskni7JGunyoY%2BLWJyuuAlj7%2Fq7tYM9nuJywbE9Z4AMkT6a%2Ffh%2F1FFBUeIZ8KwLMlIIzzVRxisEBI9fL4Payp9htT1anZ7qVumKyYMoJLp4Uf7N6VfCng6UJbKb%2Fc55y%2BdOB1QziDWbOa6pmDwZqPuCN0EO4CjzA3eavXS3uRNmSpy0dhgIdLQXnywsV2R2A8JJVHZ4tBIoifN%2F9zHGajy5bWf9moe%2FmnDqhPS3YjxvewajjWTrcRlU8ECVqhGSszLcA0jPjKcF8Y2p85HCjCmMX5Q00LDmlRyCFMNb13s0GOqUBpIrsMgTrzLhDl3PbKNNfNtXQw48Vf1VrHAWD3vg3XffoBEv5ypTP%2FEPXQar%2BIvBojPFG%2Fgoyfic96K8gntLi0iTc9wm2L0plgrTZzp5S6fMrIepOwl9%2FQpDqVs0BEAs3AHb%2B0cA5EgkL7zC6yCT40bY%2BhjnYvzTt0FvceA%2FBMY8xA%2ByoiSu6mvjZSqNthaAAc1lseRXOYHLysPXVejJ%2Bee0YWIy2&X-Amz-Signature=99de076ac64f7e128ad3c50a6bf4efa631b37f8efe1006e40fa86d79b314808a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXVRX3IH%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T085239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIQDV6p7yN8Z5GV2tMwYCKeBMPoNyYsus5Z85oJ7Akyp4%2BgIgZ8xCWSKe26sqgCMJ8vxs2k4bNipNFXgPPeSyt4N0vMAqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAonImdcfDQo0zwAwCrcA1ewLI%2FjUr9arkBPZE2GGY1VIXmzR67A8RMIdka3pbS5mmpTrSqjV5BkiIOwqTJTyclTyJMaHwMa1GvVgqHyK4dGAQ1N8s3aC6uIPEgbY%2FjI7Tkr5APBXYiSI5IIgTYNkSWAxCA452JkEzysIvRiMXdUPv1dql%2Bh%2BS66V9pNQsJk%2BC93fi7ol6b3%2BgL3zQr8onwvCczXg1qN5atLauizqst%2FgIxHadPb7zdRCT39no7XGjiGkGBSaO8dseJijmBLs8qbsPT7ujHXZSqkwtWDblGi0CWLnkK2WIhtGfEGUaT9U9HxlTzsmeRRAwyyc5hZeNxX2NB9i3qNuvzMDs7ZLRpmOd2dDbxMdlAGd0TwVRa6rJOlXS7MrPDb0NCjEbmv0bcLSeztd6yaTvJwiB86AANinGvnxN25taU2JnR0xHbTzYYNAqhGAY81BxsyZJIGsVZOYAarTCZK99OInI24H27G0MNbpGxk87jvU7Prv6BTFDCzEimCVJFQKGJAFpQs%2FSpdJXpojkNuGDZrxu2JMFCOq5PTSAL7aujdYmK1uArx8XOo%2BkEluZIuQncjWT4m27olTdiKfNl3tkPloWVEnzR5jlZU29CH6e8Jk4HNATmc1wp%2BaGN%2FDg1caqWxMNP03s0GOqUBWwseRNbfOEh8zTsLqv%2BjyfjxDLjaag%2FpLrnB1hOQL39AWn88UCElYWz2o8vDlEANliYzect1CfaHMU7w7a9LXNhjItW5BTxypEknjPOBWvKpK1ErTteqwWchSJGjw5bSQwUM1o7Gz35NQgLqx1TNQ0bFIZxO8ulWjY7tYcPP%2BKqp6ooVSSRAcHbzfkjziFep%2Fzyvf7TjMySgatWdVje6gUmrv4FK&X-Amz-Signature=5669d03c8c3a05ea18d49f142d34bd12454bf6d70733ca98d05e62e4978ca06b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

