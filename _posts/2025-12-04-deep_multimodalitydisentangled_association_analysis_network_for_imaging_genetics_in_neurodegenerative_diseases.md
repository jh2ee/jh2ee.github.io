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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6SG45AQ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T232232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQD4mEzbHjBOYX0GZ2URJ00JsLRy5HXvixBUY61mWEEg%2FQIhAO%2BCuxYKC%2BG7%2F2Sr4mbcT3nEGLBMvnGHrXdIXZF7sQPQKv8DCDcQABoMNjM3NDIzMTgzODA1IgwaC57zr7c7Y3xlPPcq3AM7cpR6laZGD%2FWnCGjjguokxXwkMwU9YbdJ7gbMty9ehyfOlMIEvOq7auSfx1Y3ofWQ4m7sHtdfzHMGiZiRSSls8%2Ft6U1tHlKxIjlsB27WIoCLHGFQ4Og4ccSvJtQvg7DGDqec8AnbktnXbRzPziC%2FtY6zUsXpyOyn0bJkmTqGho2yxD%2Fq%2FUOGrZeU72cha%2B1pPGK9pIflvjLRiNXZXPtrOzamxI5itBdYLvcBVzxUAr94AjZDedte%2B8ajgOTUsMLL3Zj3gHsMq2n0LCpzISIwFb8ZUbJxXaNBqhOkuXyGFN9Tk9I2Fr0UQa%2B%2BLmsN%2Fr44zUwDnNZRRAEOIH1AsfZa812ZZm7XuzOuyTNS9fkYDulV%2FyDUXMJxDM2dK7lxnjHyZE6YhEdw6CrlqkKjz4z1ZcM2FOKjdrn%2BmfreQs8rQjq0mkcJX2G1DuG%2BdRRHMdVRSxOL1z6hjun8FaMLFGrWZ63oL7Y5XVCBpnCfhg2DXYPzbnS%2BtOv4tcPqCEfrYWj4smGyh92q6bG1UoESWfOP%2BSSqcXO8fCt%2FHtvYAFbySlHraULLyWn15JjmbTjSQkW%2BFhRTDBBRFLCRVVukOtH8r6Yl7PdizG8pCz0krAzpT7hROAI4Jo03%2FZaiyNjC54uXOBjqkAVWtGLhJkczc6t4lbT1qLNI8x6PoOoi8q2G6Mdl8o1jqyPRxOj3xxHU4Dt3yC5lAHFpyRIZuuYtu2UP6HFhEQFe7gBhNRd%2FKLtP8vYFahqd2BF4%2FKE2q34hTDgCCV%2BNG%2FBIiPjsN8bCa1VdaP6Xe6NMyG%2BAlnllfimAOSEfO4dtl%2BK4dfvfzpPu2TRIGPscpFn4uuwqzgWjT6ugKnZr6KO0kJmak&X-Amz-Signature=5cad7f51304e1b0e924d104de4d45479f70c6434ec7d55f7cb17c022c0e4024f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6SG45AQ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T232232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQD4mEzbHjBOYX0GZ2URJ00JsLRy5HXvixBUY61mWEEg%2FQIhAO%2BCuxYKC%2BG7%2F2Sr4mbcT3nEGLBMvnGHrXdIXZF7sQPQKv8DCDcQABoMNjM3NDIzMTgzODA1IgwaC57zr7c7Y3xlPPcq3AM7cpR6laZGD%2FWnCGjjguokxXwkMwU9YbdJ7gbMty9ehyfOlMIEvOq7auSfx1Y3ofWQ4m7sHtdfzHMGiZiRSSls8%2Ft6U1tHlKxIjlsB27WIoCLHGFQ4Og4ccSvJtQvg7DGDqec8AnbktnXbRzPziC%2FtY6zUsXpyOyn0bJkmTqGho2yxD%2Fq%2FUOGrZeU72cha%2B1pPGK9pIflvjLRiNXZXPtrOzamxI5itBdYLvcBVzxUAr94AjZDedte%2B8ajgOTUsMLL3Zj3gHsMq2n0LCpzISIwFb8ZUbJxXaNBqhOkuXyGFN9Tk9I2Fr0UQa%2B%2BLmsN%2Fr44zUwDnNZRRAEOIH1AsfZa812ZZm7XuzOuyTNS9fkYDulV%2FyDUXMJxDM2dK7lxnjHyZE6YhEdw6CrlqkKjz4z1ZcM2FOKjdrn%2BmfreQs8rQjq0mkcJX2G1DuG%2BdRRHMdVRSxOL1z6hjun8FaMLFGrWZ63oL7Y5XVCBpnCfhg2DXYPzbnS%2BtOv4tcPqCEfrYWj4smGyh92q6bG1UoESWfOP%2BSSqcXO8fCt%2FHtvYAFbySlHraULLyWn15JjmbTjSQkW%2BFhRTDBBRFLCRVVukOtH8r6Yl7PdizG8pCz0krAzpT7hROAI4Jo03%2FZaiyNjC54uXOBjqkAVWtGLhJkczc6t4lbT1qLNI8x6PoOoi8q2G6Mdl8o1jqyPRxOj3xxHU4Dt3yC5lAHFpyRIZuuYtu2UP6HFhEQFe7gBhNRd%2FKLtP8vYFahqd2BF4%2FKE2q34hTDgCCV%2BNG%2FBIiPjsN8bCa1VdaP6Xe6NMyG%2BAlnllfimAOSEfO4dtl%2BK4dfvfzpPu2TRIGPscpFn4uuwqzgWjT6ugKnZr6KO0kJmak&X-Amz-Signature=5cad7f51304e1b0e924d104de4d45479f70c6434ec7d55f7cb17c022c0e4024f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7K7IA2P%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T232232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQDZ6FLxPAdNeuO1wPkW%2B7LiHHdCjkuk6B6ewj3ffYGnVQIhAK8R80gIkbxsQym7TEcaQrWfCC%2Fb%2B8zJPknNHGs%2FqLplKv8DCDcQABoMNjM3NDIzMTgzODA1IgyBN87rMt1PeW5BtVAq3ANt6UI8m5%2Frg%2BiEeGR%2BpqJxG1IWeXYZKdlrx41DnNwbrg6kRGU1sQYghOsAThe9MLvezlH1%2Fnw8YdqsdDYDJLWbNWRIq2nWQ1VDDf7UV1RSxpDEqcrpkMsU%2BqBZz0TM2Oggd3SuN1oFODhG24QKArhqtUpscpo9V%2BLWZJffbhLAgHHEacMAaK1ZZZUMKWaRoSK%2BdClPgmIwYhwQUidd%2Fe%2FDJtJbscVtXcuE8Wd5%2BvJyXlzaVq%2BvyCKuO%2F%2BFYMMHamKV%2F2XT7fs6yUtt5jAd1leqJ1xwRkUVS9rMxyXGJ2alxL92lrwjQzhsWop%2BX56s1EIXhGrv7grdh8gZLKAvi8807DKdmV96MjkLUl6I%2FWSyFUATeQcWohblbMv8C9Zh%2FVhBEnK%2B11dVpE2c5pw5%2BvJV4n3KIeEqSP7BDX0Hp0vq54QobJYJrLPbRZxXuPB452tF0gAZpfFUCkC6vEU%2Bs0pC4y5nEoFH%2Fq6Cy0GrVXwWMnwC%2BviatuwzMyzhuMjF5a37CaK9WsaOoP4TAfZ8Fpx%2FEd9iAztWZo%2FgSrxcuLMvcGD2J8WJ0nzxmjSDoyYM%2FM2R2nSaJNUy4HVOUZVW7%2FHW4wmjUwHKTwv2NUhruhrlqQUlODxclZPkDww%2BIDC34uXOBjqkAdu%2BboMXdf0LngH0BxhfCeWEIfMqgbOoqa46u24oIFE9q0%2Fk7Cr36hypqzssCsz8hPNNPONFdHeoJI06vy3OATkQi9K41zirS%2BdHLEgacl88oy%2BusN5jozhm3FFpQKQHIxhVSyOx48%2FUAnllECT90Nby05GVZEymHkjs5oQVcKjYEWomhEAHZ2bZtEAj83x%2BqvIRO9m7jYwEfoQWuyUXG7dvblAE&X-Amz-Signature=55a176cbaa7f67bb9bfebb88e1ef356ec7f5612b5bde8e778b98e5c35409fbfd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633PF5CR7%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T232234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQDjiJLMi6%2FSMWuqErOU247Du%2BpZX4bqW7BZ9rsfF%2FJpfAIgVk%2F8v4BuMfOZxG3zzkxDLrr96ZcnBlWS5l8SbvBJqGsq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDMcAA1%2FiMwcEnNuIiSrcA%2FCD5%2BnBhrn34bJsA9gSG2BEa4YQ5IX4myRMBq5Ee2vK0r0esjDk3XB6VPyg%2BI4Fca8%2F%2FycmX5LNK0cp6DED5s9JOXEQoSfvEWL%2BBA09L%2BVhItTddC9MEGZ1rvIZgo0yO4H5Mm22AK5uhWGDmEu4noXo%2B9oJr%2FpFdEA5ShxOe7dkUuAy5Az06bKfGJiAMM6%2FnUHmn8Njs2qThQJkfD%2FM5%2Bn0LAPeEBe7gZZF9qzMXcPQ5jo4Ak6lkOCRAUd4ySuSwr20DTZx4tksHLQDpJBC3HLnqwPgWuWu5JIIiFAH6DYwL8we4J28UQFRxeo3nX3jvskqs0KxBBg5AdAg%2FPlDnVCG4mPAGpx%2F5MBYgEzzL4uDPwWB%2BKRSTjIs%2F35QyaisjvSy3BcAIGlm1sKBWliKm71GhwM7VMAE78xQwkuv5vbTNMvYGlHHWB30zsS4dd9wKmt6Gp9cIV6djX1rXHArMKjR%2BuRRlpofDHrX4co9hWSBdJjWwm8IhIgNkMGxeooaXDNUPBF7SZwcanhgl1BfT49fGwGsadTaRD%2FI1P72WTYIc1iMcmhOR%2FR%2FN3ygaT%2BwUE1%2BAk%2BOClIRuod%2FCkPuP1Ow6HnSEv7DvhvwgJfB3MVw6corlSuGBfAEcOB%2FMNTg5c4GOqUB1NzZcSqmMj4OuAZvx%2BJSwkTv%2FaCw7PpedBhaOC0LTUcZHBJcAeckn6LWYb8KqFthTznpxJRoA2iZBr7JxnhrNLroaL1kpgdN%2BQO8juiR5i%2FB1JJWNB2%2FAaC5Iqjk6sxk0ybj4UrZYmOUZFbc9LMwUuVm6cK%2FYtRTPGOHwi9erVE9VwJFCrt4l9MDzO9tecPsJfAhjuJRtxDGYyKpdlvupdZ5pSJq&X-Amz-Signature=d83bdadc3a049905cf1394d76875e30400c787af59abcd590e3451c79c019ea2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633PF5CR7%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T232234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQDjiJLMi6%2FSMWuqErOU247Du%2BpZX4bqW7BZ9rsfF%2FJpfAIgVk%2F8v4BuMfOZxG3zzkxDLrr96ZcnBlWS5l8SbvBJqGsq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDMcAA1%2FiMwcEnNuIiSrcA%2FCD5%2BnBhrn34bJsA9gSG2BEa4YQ5IX4myRMBq5Ee2vK0r0esjDk3XB6VPyg%2BI4Fca8%2F%2FycmX5LNK0cp6DED5s9JOXEQoSfvEWL%2BBA09L%2BVhItTddC9MEGZ1rvIZgo0yO4H5Mm22AK5uhWGDmEu4noXo%2B9oJr%2FpFdEA5ShxOe7dkUuAy5Az06bKfGJiAMM6%2FnUHmn8Njs2qThQJkfD%2FM5%2Bn0LAPeEBe7gZZF9qzMXcPQ5jo4Ak6lkOCRAUd4ySuSwr20DTZx4tksHLQDpJBC3HLnqwPgWuWu5JIIiFAH6DYwL8we4J28UQFRxeo3nX3jvskqs0KxBBg5AdAg%2FPlDnVCG4mPAGpx%2F5MBYgEzzL4uDPwWB%2BKRSTjIs%2F35QyaisjvSy3BcAIGlm1sKBWliKm71GhwM7VMAE78xQwkuv5vbTNMvYGlHHWB30zsS4dd9wKmt6Gp9cIV6djX1rXHArMKjR%2BuRRlpofDHrX4co9hWSBdJjWwm8IhIgNkMGxeooaXDNUPBF7SZwcanhgl1BfT49fGwGsadTaRD%2FI1P72WTYIc1iMcmhOR%2FR%2FN3ygaT%2BwUE1%2BAk%2BOClIRuod%2FCkPuP1Ow6HnSEv7DvhvwgJfB3MVw6corlSuGBfAEcOB%2FMNTg5c4GOqUB1NzZcSqmMj4OuAZvx%2BJSwkTv%2FaCw7PpedBhaOC0LTUcZHBJcAeckn6LWYb8KqFthTznpxJRoA2iZBr7JxnhrNLroaL1kpgdN%2BQO8juiR5i%2FB1JJWNB2%2FAaC5Iqjk6sxk0ybj4UrZYmOUZFbc9LMwUuVm6cK%2FYtRTPGOHwi9erVE9VwJFCrt4l9MDzO9tecPsJfAhjuJRtxDGYyKpdlvupdZ5pSJq&X-Amz-Signature=59f3fe6391b19a536dbad467a2c755d38d4f70c0ba28475f0cfafce5bfd15e35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NKITO7O%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T232234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQDn7qN104YCx%2BokbYulI%2FHLgdM9l14ScRG%2FdmxwfNNkHwIhANM6MUk%2FcbNyn7oXZk6Nk2m7VXcfhH0rZHVedPKtQgzmKv8DCDcQABoMNjM3NDIzMTgzODA1Igxgr5EC1b4GpOA0cDQq3AMk3iHVywO2E4k8ec%2F3rWLS5gKPiIolVIurXcVb9XkaogjQHjdGmYM5gq7spFSbtUMGP1n4VaDwGpdoUV7EABMiUlWXOzDXcPU8kzeFe4XyFb240rL8DOo4d3%2FeWNK1gTf91Fe%2BrQ%2FmXqLCP%2FNHnY30J9qOLGvsHDFxg55BUU1ilKWsRKF49ApLU7wjCDMogLxTn6okbswZzvmXKnk2oSImgjpEzqDw3IuaUKa3Ggzf%2F%2BEV3yQxX5iHr3cIL1rui9iPndLEc2hD4rWEwZ7s38gSCeqxk5bUVl%2Fi9W1mv4gEFeEZc8NSUZd1Ro2YamAPRkLZf4iklEnN%2Fle5%2F60E5k%2BLqLioCoLimboDlqomzlhe%2BjM96ccrqIDvLAlGrCVt9lQbUBymBItbDOAWRpmvM7UECVACEfj9r5Co4HC90Orh21XXjkezJnpZvGS2DXf1mBXeZN3oJS9TnpvSWmvd1P%2BrK7SZeE8jRanssgTYbCFTp0P9kqf9zVTEFRqJXoF7uAzJT4TsKKZzct76vPQR69EjOteh%2FEOC07%2BQU2lEuGG1js32aWuO6BgYAXjPHEUhJR5hNr3KEDlwX5erNCRWbhgEoBKDoYDLZ8BNMka8fHoMROvVtY8IGqqI4ckrYjCI4eXOBjqkAbXgpiBOskyJZy6ytNdjz07GQjoV6Geov4GnWEkWQpEdzkYgeeHAPL%2FUtQN3812qyDxpv9BkUC4rWfAhAmdR1ZPWn9kkH6VWtVajGq3a55EI7lygm0pA6KKeoPYa6Cy%2B98LRBBosW%2Bp3%2Fz6iJTD0ja3WYEva%2FADP%2B2RgvvHlzM6rdPs6%2FRlnM9mFyi%2BfaLQ2FobmRzznijCbnyutoTsPQJhUPDET&X-Amz-Signature=9d730f01d5758b7e67bdb0c4eef8e6a29dba6ee0772dc1e2881dc65c17fa40b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667M7A4ZSI%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T232234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIFl%2FuypZCufMwow3ZbA%2BZsYHXQX2oWbzJ6ZmYnH03GtyAiBKDA9iHBxqI8GqDqA6smxW3CcQNnIdccyquy4pE1mAWir%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMmxkVhZKUJiR%2BQRL8KtwDby1ur1uH%2FmAL6JqmOsPeCpuDd57Z6LmemO560mXjNl4A98P8pWhuYh7lZ4u7x1ZVDqJ2XLyt5kdAd12YNR8WWJSU5Py%2Fv%2BJG2GzIOY7oixMPrNwHNtNyENZUbijRyiTwdJOTNMxY4Ll3wiEhf1f7KKpZXkti51XNml6qgQRvJV2HU4EkPpo4oOtSJBYIjle5fIloFVATLdiQKoBySOewvD%2FnyCymNzpq8e%2FtRdbR9BlICcrzxUCEd0ZBF%2BYBczcGSjkgEfJl1jgBpd8TybHNS%2BBqa%2BkyCkoLcp7m7wqQgdyTRvpzZF008PIN0ok1tBT3qB76mgkGPlNuDFB6fd6Vudv%2B72yaVVC7pCOgFzR57pD1QMm1RA5btur%2BYLnjoepiZ3N0t8fiVz4S5gMDBOpeSvtLmZDrhyyNT8ew1twppCXoWuCDUJ71yOn9p%2Fj0zza0%2BqJkrWJrRo7V%2Bu46a2KpO8Z3UlNdY5sx5LBJQB4stSm0c7elrwsrPKCfNkeZIamG1tqp3TzqNUJH%2BLEYIesZ13nQGrvznWYWYS09v6RhnZo9aAMamFzZj8KL9wUI2tWtG5r5NG0jfzYYKCOQS4TQoDuPfl5E18oPdHj9fFuXTqN0P2iZzofvXR0AEqgwoOLlzgY6pgHb9GHYgMUTZ1qJTNqxwAy9wAlOuJTMtMQIejTRYIwj5pGRuZ0bXRZtngbTdxZIsZDxUzfWXH%2BT%2BkysEvgz1WvKCrS9MwCULso3JB4%2FXGAUxmU25oEvTMb3FFH2pXTh3JAmM8V42pjJ9FVcFxf%2BocZKrm%2FPLCMbl7Qf%2BPHkyvarkeH%2BEwMCTyuLmRyAFGZy29%2FB%2FP%2BXyoxDOesB%2F5muaz5b3JD8bbU8&X-Amz-Signature=f75d7b8d7a1a5a80d36254c0559af92527cabcc165f188c5c6eb9eff16eaf881&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466US4UVZCD%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T232235Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQDHh5xlHhJqrc%2B%2Bj72EOi00SL4dRVhFiYdRoj8T89kO%2BAIhAM%2B83E6zbnRekPQwvgTab5Bk23ya86TNdzfNOHWYB4BSKv8DCDcQABoMNjM3NDIzMTgzODA1IgzqLYBDbyudIa3AcgMq3AMmErn2MPvD4D%2FWrEboLNhlLdIDlR1bRGR54u0GceXlQGvVCA8IvKr%2FWmosrB%2F1WOiXX4S4f9EyPM1koJjuDXuwP4qJhouA19P2Yq6yLUPLKOl9GpPYsXC0XJAn2mwumc2B79rmWFxrGYAoi%2Bq4NDBVeRJOrCHUiwUc%2B%2BW8G%2BCFvyNN0%2FvNRDYoWx9pVTFePdPfGq6gv%2BKssdhCo4Lhef8PIUW3BQ82xcUo7DvxVGwW774lqM1X%2F1sR%2BByCENe2GZLlJL606CXnxgwSioyXk9Z0uNWYKgjgWQSfiDTLVllvY2CNv9%2B5kbkEkXJjlBpWkTTEt4sT%2BxMxLuUgL07arNb7%2BbfiXojAV97Q4WiMr22mHvLhKdEShB1wLJCxj1xyJyVQUN0uEHZBaOBIQv%2FDJvmlINMyZmjrd%2FXufVJGQ%2FwZLyceEM%2B61k%2FHN4KaNwANN6QvrnBH0fbUAKZSw1DMgFg60S4ACnXS0%2FdwN2Vo25nT4M2l2HQp6ynRvgw03PGfkf4EdgRSgvcz1i8DDN2A3xF553rmNqB%2B6aZYij0ZWgGrp1M7zgWFuW7fSsJ%2BsxOgfUSaWmAku0qz4Uu8G2YHcgSG1gqMpQ3XmQ0kJxi1LCnaucZgyGup%2Fc%2BGFNL3UDDu4eXOBjqkAeSJ3zPzyyyY%2Fb%2Byitk%2BIUYBwKD2wnlR7SwEebDonj0Jtt6RKvuq1DH3dx57IMTvVJ4K4w3WW%2BYZQHQvqOkyr6%2B6iV41uIxwTs3qysMHM1WXcXUg1V1zRs%2BtnMA3sJNyhj9xI67OYsEZKp4%2BojOFKMCsNRXqIPEFHR8li5nG4nVMzpTyvBQQCYLWqoR%2B0%2BI86SfNuqKg8AHoH1QzfEoKDK73dtjJ&X-Amz-Signature=4752ddab93fb09c86feb3f601c5c512ed8ae059948b71c83c32452a8123cd0e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KFYPTTW%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T232236Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIBGBEjbFvwHVUiyEK%2BJngK4LyTLxREZV36Jtze20%2BOy8AiAqUy1UaJqSjTUemdIjxI88c7yhK3FpA%2BkRDSt65yK0oSr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMxH08lgDFnpRwahkeKtwDVcXc0onqeO8ymHN7DMtYQHPpUG72ihT6absA%2FFXEPG70oRC7cPQWj50K4n5o7hARv6vQbrkHgFd3H7rchkSmqIYDOpMAne78uGO9mrfDYOa10Ir7ZmyyOixNMaabzEVc9Vy4mhbEzP1JISoYa25mZde7UnT5esZBqDGKYWo4d%2Fg6LOwARr%2FWkEHVta83Rnj8WFRhrPJMSEkWjlYRs1tSNbmmiczz86zPOExbTByPUqbyK8deJvf3SkuMtXyAwOawd8UgM6Kq1JN%2Fspi4V4LmLH6bmKKjDJ4csE9pGGdFlaiaMBwo1aJBX%2FsgzTHPl3D07trQUTq9V%2Fn5ZEiro0dOZK6gluxF6PLawbLQYup1BPciWV1jlFJhKZTgQF%2Fqu0%2FoAFJxKX%2BnTUK2pQQvhPabt%2BSQT8Thok7gz7yZmrQ4uoLdc0Pc9wuRzebTi%2BWYtYYR1fxL9M0DONcLYBraXJAlLfTCPJhX2C%2FQFxQu1QBdHhmCS7m%2FyqSDR8qDYDGVQ1Ju%2Fm7f%2BvnPadjZHIIkCFTKs5huY9fyALWYsUp19DL%2B3mcoJitoTd%2F8cSlwRMqNeJ2Pe1nNp0cvuhMMYmGezrX1M3scPNpMDApXhBqUYXgg3yqlZXvv86b2%2FGuvsnMw6eHlzgY6pgHUYNIwjTmmxZnLARHTigwkx%2Bcv77xoo%2FutIDZhpySBSSz1FRVm7qV9bcGx0PKp3spa4bk92ahHVavmzvrDa5ypPjcFmtXQ82tUh2wLFBjo7%2BMoiWYc0bppSqrMQSCHbLfJ8W5hXhaj5p92Vm7vEPcluXJaIuIRMaD6pybZ9FnXHSaY9IHUHPK0xgy%2FyOaSelmbd36M82n29vvbPFNOioCahWXrfASU&X-Amz-Signature=bcc81c5296ea8d5809a82465e70ec5e265dd311b2ee665cef76d2deeffa3e9d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KFYPTTW%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T232236Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIBGBEjbFvwHVUiyEK%2BJngK4LyTLxREZV36Jtze20%2BOy8AiAqUy1UaJqSjTUemdIjxI88c7yhK3FpA%2BkRDSt65yK0oSr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMxH08lgDFnpRwahkeKtwDVcXc0onqeO8ymHN7DMtYQHPpUG72ihT6absA%2FFXEPG70oRC7cPQWj50K4n5o7hARv6vQbrkHgFd3H7rchkSmqIYDOpMAne78uGO9mrfDYOa10Ir7ZmyyOixNMaabzEVc9Vy4mhbEzP1JISoYa25mZde7UnT5esZBqDGKYWo4d%2Fg6LOwARr%2FWkEHVta83Rnj8WFRhrPJMSEkWjlYRs1tSNbmmiczz86zPOExbTByPUqbyK8deJvf3SkuMtXyAwOawd8UgM6Kq1JN%2Fspi4V4LmLH6bmKKjDJ4csE9pGGdFlaiaMBwo1aJBX%2FsgzTHPl3D07trQUTq9V%2Fn5ZEiro0dOZK6gluxF6PLawbLQYup1BPciWV1jlFJhKZTgQF%2Fqu0%2FoAFJxKX%2BnTUK2pQQvhPabt%2BSQT8Thok7gz7yZmrQ4uoLdc0Pc9wuRzebTi%2BWYtYYR1fxL9M0DONcLYBraXJAlLfTCPJhX2C%2FQFxQu1QBdHhmCS7m%2FyqSDR8qDYDGVQ1Ju%2Fm7f%2BvnPadjZHIIkCFTKs5huY9fyALWYsUp19DL%2B3mcoJitoTd%2F8cSlwRMqNeJ2Pe1nNp0cvuhMMYmGezrX1M3scPNpMDApXhBqUYXgg3yqlZXvv86b2%2FGuvsnMw6eHlzgY6pgHUYNIwjTmmxZnLARHTigwkx%2Bcv77xoo%2FutIDZhpySBSSz1FRVm7qV9bcGx0PKp3spa4bk92ahHVavmzvrDa5ypPjcFmtXQ82tUh2wLFBjo7%2BMoiWYc0bppSqrMQSCHbLfJ8W5hXhaj5p92Vm7vEPcluXJaIuIRMaD6pybZ9FnXHSaY9IHUHPK0xgy%2FyOaSelmbd36M82n29vvbPFNOioCahWXrfASU&X-Amz-Signature=b1d445583215f0db725ecfc60555df20db079224c659842bac0c0835737a89ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IF5HLL5%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T232230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQCpYdFUBrcT6P6tvIVQkrYFaDF%2B6aIm8WcCAAKfWNVZtAIgP%2FJMENpOD9oh7cKeCbUkIth1uhbY6Tu9C%2Fp5VVY2IJEq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDHZ7LE50s0fLDv2kICrcA6ap5tdqNKc1h%2F6xLTu%2Fz8NH3Lt7d3ahB1etZGbBKGuh3Ma8V4wMqRdsR1Pb3MeMlJYMbjOgojUpJJoGI64kZ5sQYAZrA%2FtbDmFjpf22KU5WvF%2Fcn1k2Zx1aoFudQYpD5%2FSZwFc%2Bnl9uHwNoD91Ap71SWzKokznXrbxdPoMQEI31pJdNhWj6c%2FPq2mLcETF8QJ%2FKTVQuceYvYXBOQbSOtjzoPEdwc0pCNMuEEbrMF97M2pu7R%2BlX2eyVfNggS1OCYWwGafGhGeo4zqAk0yqfIU1ErpNlhwjmxJrPxJmlkdulh%2BTp7%2BAOa3AU0BxeQRVCmP1SQv3DWdX05NhmmCg9%2FzzBiOy4ik8qC0vRsknNionTez%2BH0M%2FVtcNdnLa95krpDPoeSs8OdlbtEzDvmsQ5SPJqJChAdmLe2xt08fSviMPCnPnUX0dFC5AokAbc33%2Br2mtIUUVx%2B9%2F4dRLD9QGrAuRkSoAvI78CKt47YqFtpCMIDVhP6aw6aLZxMQHQ4o%2F4enLhV%2BugKNgZd0EOoW0jlCL%2BSRka3M16CLey592xYXfMnyg4b1zCxBzvbImZ7yhtEeykvzHakZazARcjTaz4JvdvquZw5dHErZAgmZy4PajhbSCU0miYFQWvK6LdMMbj5c4GOqUBh8dDEgsY33cRsOvOdDtHHhEIw7XoZqRtmyp7EWcFbi80HNm1F9k3JXOYbXAEbupYHDOMKgol9z%2Bk8sCxbZbfNIeQ2Sk0844B9WgpsOQ6%2Byhl%2BebaD0qRSDeCgd0rDOkksjyHIBn8fetnElHVhbLmXtL8FQnPm6bUaIfEyXnXA0dv2TX1lmP%2FxPdcCHUUIxSQOBb3COu7P9GOzKXCezHxFn471yvE&X-Amz-Signature=5bd7c86bdf10a8440a50500325dbd23e7ce25bbf003477a11439259b1ea62c3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664V7HS7AV%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T232237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIAo39FeRo6aX8KPbPz4pmTI4e7YEmIL%2FKUXGjJbMrCK5AiEAqUJeOIusrMXPmxOtyLqaoTVuQgAcEn9L5kUqItZTSIUq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDDcHBhIYeSj%2F8VzzFyrcA3VniaQvJ%2FF9NtX6kYtaWDKjaIblcpigGTPNKD826J1fA1luEqNQ7v6LPLW9FTh7lv4grT3hAKVLBLG9oU3pn3NKDpqAC4RRKI1kQHIaffoCy9F%2FHQlPNnPdX6LPaFYCK0VZWingJCoyemAYgm4Oe0EthvbfcDoxcLp3U96T3b7Xen7IPrh1FbpJUQJjS5UhUtU8lvDkdZKfqYnJp2HvJZP6qFS0x6kwblud%2BOD6chPQ8VVxc%2BK68Yb5Hy9T6NVbJslGuV011ROwV%2B9ke1lii7jgD9%2FhqVawYvxnF77OmvpDO%2B34hyxsKzhAPyZPNioQpZdBf8bhxuyD6krw%2B6qp6jkp0llfYQeC9CHNG0caeF0iGMs3Xkc2LDsgS5IBOPVeXM0IiO5p0q9%2Fv6Lm8eFFRqIkTC91%2Br2Hh0HHRu3yo067XJ2RLJRBjMijXUtz8wmMz4326%2Bn9DoSsSNe3mVvc%2BQYwLkDfvqRUp0raVzhft%2BCCDPAzmt1AqAzK%2FNPWKv5IO1xfdG6uV7lVzfhX2F90YakMeArqu5KScnXN9gjcw1RwU3L0eh5Fyi3IogGsBdNlFgXhQ010FpvWfufisHOJ6AwoLjpqAzKhp3jwvaP51Gx9Xz07uUjA%2BgqjYD9oMLfg5c4GOqUBoTFS78YGoVAi3aOxozzJxPi9SZ9LLbx7Pujx0xyFzt%2Fyeh3Mi2QCyUP7rPjR%2BNtBmSlN%2F6uiL%2FpoBjOpIR4k20nhF08%2BvSBuHd7AWkmE1eP0b7%2BQoGzml58r%2Bl8JC5sNH4V69bBDOlA9CAL7OBTbk5TadL9P19yaioj%2BvAVbIdF7w1Mrm%2BpFGkzArK745QsbryRvICqc7x9PTAkI4SCXAwp1xzGO&X-Amz-Signature=08db7f1fe6ffcf72e1955b29fd9e1898d422e3d23a1467733828ee694f00d17c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664V7HS7AV%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T232237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIAo39FeRo6aX8KPbPz4pmTI4e7YEmIL%2FKUXGjJbMrCK5AiEAqUJeOIusrMXPmxOtyLqaoTVuQgAcEn9L5kUqItZTSIUq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDDcHBhIYeSj%2F8VzzFyrcA3VniaQvJ%2FF9NtX6kYtaWDKjaIblcpigGTPNKD826J1fA1luEqNQ7v6LPLW9FTh7lv4grT3hAKVLBLG9oU3pn3NKDpqAC4RRKI1kQHIaffoCy9F%2FHQlPNnPdX6LPaFYCK0VZWingJCoyemAYgm4Oe0EthvbfcDoxcLp3U96T3b7Xen7IPrh1FbpJUQJjS5UhUtU8lvDkdZKfqYnJp2HvJZP6qFS0x6kwblud%2BOD6chPQ8VVxc%2BK68Yb5Hy9T6NVbJslGuV011ROwV%2B9ke1lii7jgD9%2FhqVawYvxnF77OmvpDO%2B34hyxsKzhAPyZPNioQpZdBf8bhxuyD6krw%2B6qp6jkp0llfYQeC9CHNG0caeF0iGMs3Xkc2LDsgS5IBOPVeXM0IiO5p0q9%2Fv6Lm8eFFRqIkTC91%2Br2Hh0HHRu3yo067XJ2RLJRBjMijXUtz8wmMz4326%2Bn9DoSsSNe3mVvc%2BQYwLkDfvqRUp0raVzhft%2BCCDPAzmt1AqAzK%2FNPWKv5IO1xfdG6uV7lVzfhX2F90YakMeArqu5KScnXN9gjcw1RwU3L0eh5Fyi3IogGsBdNlFgXhQ010FpvWfufisHOJ6AwoLjpqAzKhp3jwvaP51Gx9Xz07uUjA%2BgqjYD9oMLfg5c4GOqUBoTFS78YGoVAi3aOxozzJxPi9SZ9LLbx7Pujx0xyFzt%2Fyeh3Mi2QCyUP7rPjR%2BNtBmSlN%2F6uiL%2FpoBjOpIR4k20nhF08%2BvSBuHd7AWkmE1eP0b7%2BQoGzml58r%2Bl8JC5sNH4V69bBDOlA9CAL7OBTbk5TadL9P19yaioj%2BvAVbIdF7w1Mrm%2BpFGkzArK745QsbryRvICqc7x9PTAkI4SCXAwp1xzGO&X-Amz-Signature=08db7f1fe6ffcf72e1955b29fd9e1898d422e3d23a1467733828ee694f00d17c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XEB75SY%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T232238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIEDJXgEqC%2BBAEwFg%2BDXYGDAL2xF8MlxykyJYZO%2Fpi%2F22AiBzKWO7dyQ7eyad5bNjQCuPFl47CoFdovwczGwUJ8M6zCr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMoSMN6AGrUJtcevjeKtwDQvaShjoLjFzMGilCjnkicPb29mQky8g3B04BjbYxc4KyeaIBL9hDMtT12j6PeZpy0Qt1mbRUgYkjmQA4DvFt9PXIHRh107%2FOtR8C6cAYd9qh9jXrg6%2F1aQJW1pP6SqEehvAptQY4fdx%2FKKbQfzH3CgoDJz8YT7ZY09A1CQv4FUfHznwI6QTF8gEmy4Lybbv%2FzAz6VVJK%2B4TXewLUDATOuqZlQXQkAwzdJBpcImrQHXT4Fim8ltkNisSyagsbn1eDi%2FfBjjx%2F4D5LbQyTvM2%2FvpYDKtqD3nQHuETXLRD7zl8QFgmxW4ZY%2FqNRASjZ4ckOOGisI%2B93HZIfIuPSRchUob6jHhWuLf8lrRuAtWF51Vo5uPNLs8f4Z234g0aYW0fj8lRp22z403FXYK7q6Vf9Odn%2FYm8S7kFSr0R1rnASsojBhVu0vLg0iMDaCuDRVY0vGH541RXJrT5P5bpvgE7aWfohnei5exurx5okYP1J1lsIiapPKpN1sbh2e0bW3zoMmW%2B49aJbd6MYihaN4E4ylGWwqF2VCi%2FzQQv1EOYAE0pnHl91MIX%2Fj35JzuicGHjks0gUuSYKNucvEHixMkdT%2FupRJz35Ntd6InQbCyow6ruwTHDWC4zbffSl0ygw7eDlzgY6pgEaVr1ZOX9iaMOEPtHECUs4CUSU068lCxL1%2BnmOTI%2BWXIni6Ygt9Xfv3OKMMimRjL11ZhqrBWqVjy6X0Mee2pDOr%2BqukQvzh6PIYMrlaMFUsibaYHpZta92Wu8x8zZGz%2BeIniW5OlXhHQctqV3aasUorlt3o02Jqhe0gat32X14XoyexX829qXOsyqYbToMIb25d86cqI%2FefBR%2FvoYmINe5icwufjB0&X-Amz-Signature=28ef4280b5ff3132d0107b631c6cd11234c28685eea3dccfc894de7d623e0d54&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

