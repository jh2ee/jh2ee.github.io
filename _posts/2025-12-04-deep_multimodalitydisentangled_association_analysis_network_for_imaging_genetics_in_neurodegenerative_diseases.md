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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQ7HYXKQ%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T160104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIEA0C8rofrG1tVjXlDD3pKmzoqIVIO34SIOfIMamteDQAiEAibHZYAyTFLu6sTFrykw5w4aoRRkTqMAbWQv7jvBCDGEq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDIbLXprkU8Auz8vvdyrcA4tODspXu%2BRxFbGN1UPZbbT7%2FSWkhV0BnxS49mLgu%2BZrNpac9RSQdOINd4F7OsNgrN3ZPV%2F7nXqKnK47LGtzel4LdXXGD8ItFspJaX953NjKiYxDhXQ%2Br46834v2bnO%2Bxce%2FGKhkSXMkRSQy7E%2BGnM1%2Bl2fgEY440Wmne15AZ8AD%2F7RlXrMw3cceD35s7%2Fm0a2Waz%2B9j8wtG%2F1yiZkUvjicvl7sq2Qbf5xeF%2F%2BetVYP8aVSIrbU5Q1rVfSG8ZI%2BqB5hvgPfa%2BcSNeRxl0bBwMKNAIWbVCTg4OCWi%2FbL4Ee4WZC%2Bm7Pq13ZrJrQDtRfXhObsndR2laHDNjPGAzWJGNyVqC70QU5wyjuijySXoAJ57lVrrilfakeKRWR6uk7rxlT0b1wbqTCqtpdRZ1TYKd8BG4i%2BxS3hv0Lk1aqOKJVUGDgSkjaB7WexkHbC%2Bws8mm5k63CVnscDgd3BitIY3D5sqgoHdZlALMPjWJHyPRVEszV%2BUvKf6lffQ3%2FBTrSslJNgcms2lAE3TTyEO%2FdPSkMd5c3p2YwbYPy5m%2Bicja3RZAEgOeXoNbO7CrOsiP7HxlnWbmiW3n%2BYzHdueVzNJnqotkdH6SRgbXXfZaDZPbZTQ04nwT6NDBLaWzVzeMKXe9ckGOqUBu929GIROTefJOSRTU49s9lnAOdLLHEXC3WtgYQvHBmucUXiiTGPotnXWqEs537KuBVrJ%2BmrEbotwVwZonAkUfJU%2BoKvlTvA9jPE6Bl4r0u4k%2BZmzXJ1CO6KT85Xnx9jx0iSefF4zF0raINjXEjlALlDsvJsgcOOgxbLCIWjHDWTD4fpymOBgL2NNrLecwe%2BHiUn%2FxNXl1C87Y76n82DILJhMjhZ%2F&X-Amz-Signature=d01233859096321e25bb1ceca7e314cb241a74036ca2e1c8e924d8baa9a08cc1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQ7HYXKQ%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T160104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIEA0C8rofrG1tVjXlDD3pKmzoqIVIO34SIOfIMamteDQAiEAibHZYAyTFLu6sTFrykw5w4aoRRkTqMAbWQv7jvBCDGEq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDIbLXprkU8Auz8vvdyrcA4tODspXu%2BRxFbGN1UPZbbT7%2FSWkhV0BnxS49mLgu%2BZrNpac9RSQdOINd4F7OsNgrN3ZPV%2F7nXqKnK47LGtzel4LdXXGD8ItFspJaX953NjKiYxDhXQ%2Br46834v2bnO%2Bxce%2FGKhkSXMkRSQy7E%2BGnM1%2Bl2fgEY440Wmne15AZ8AD%2F7RlXrMw3cceD35s7%2Fm0a2Waz%2B9j8wtG%2F1yiZkUvjicvl7sq2Qbf5xeF%2F%2BetVYP8aVSIrbU5Q1rVfSG8ZI%2BqB5hvgPfa%2BcSNeRxl0bBwMKNAIWbVCTg4OCWi%2FbL4Ee4WZC%2Bm7Pq13ZrJrQDtRfXhObsndR2laHDNjPGAzWJGNyVqC70QU5wyjuijySXoAJ57lVrrilfakeKRWR6uk7rxlT0b1wbqTCqtpdRZ1TYKd8BG4i%2BxS3hv0Lk1aqOKJVUGDgSkjaB7WexkHbC%2Bws8mm5k63CVnscDgd3BitIY3D5sqgoHdZlALMPjWJHyPRVEszV%2BUvKf6lffQ3%2FBTrSslJNgcms2lAE3TTyEO%2FdPSkMd5c3p2YwbYPy5m%2Bicja3RZAEgOeXoNbO7CrOsiP7HxlnWbmiW3n%2BYzHdueVzNJnqotkdH6SRgbXXfZaDZPbZTQ04nwT6NDBLaWzVzeMKXe9ckGOqUBu929GIROTefJOSRTU49s9lnAOdLLHEXC3WtgYQvHBmucUXiiTGPotnXWqEs537KuBVrJ%2BmrEbotwVwZonAkUfJU%2BoKvlTvA9jPE6Bl4r0u4k%2BZmzXJ1CO6KT85Xnx9jx0iSefF4zF0raINjXEjlALlDsvJsgcOOgxbLCIWjHDWTD4fpymOBgL2NNrLecwe%2BHiUn%2FxNXl1C87Y76n82DILJhMjhZ%2F&X-Amz-Signature=d01233859096321e25bb1ceca7e314cb241a74036ca2e1c8e924d8baa9a08cc1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IHTQFND%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T160104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCICWcNcLjlRjbhAK3oR9DjqldS45yinKmM7qKGZ8c1qAlAiAfZig37nMMgR%2FRBlXkAR93S2fZ1LVFxlF1r9rEWSBYSSr%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMKQE4OKXvyT1l%2FJtNKtwDHkIbbrFqOH36SX%2BcMF2099X0uOQ1ZVbAObf6OAXWjJyq013USAHtZmbw0AitadErywD1XtB7Acy3is4liiyNI8zhsBihh6m4dYrfyWz9dhH5kzAvYPVySCD5gggPzx8ri9YD0RajP%2FySxj8X6BybkGCXZxFLwW%2BpLxiwegqCOe2qKRSE7d7MP%2FEFncvB4LYKxJpS9%2BHZhe5nzd%2FwJkfcIonFKqF13bVra%2B1Zfy82wtqqxVXflHH3wJHUdrV6LoEkNET7BFL3spSua%2FiZnkkmGBTIRsVqWZgy6WOGzl4WhG%2FO5wL6rhNwJQdFakMfp8ePTx1dx3lhE5xa3bXCai0MgeIwVzYmNoOP87CcZSuF5ISYAUluYj%2B5voNKLMG4S81lZ3GIM1rH7ef3caOaULp2ZeF1OsqMFwdY1grfhjsGW5IaJtJz9qO3uakOHPBlYRm63QOlTWqngg87wN3F%2BzLomS0ACkiCBc50oHLidwWB9DUUOZp%2BbNIaE67PREm9d%2F4gC0ELKMp1wSixy8Pj4HDIyM4WF%2Fx7oSCpyx%2BMjvSVbYB5N6XqHTeUsIBM9Bzr%2BoVtiJ%2FyDuaav1yGLaWIxx8MyaFPbenJjH%2FoihGaLh9KDFbFxPGR61Bp9hcOE6MwsN71yQY6pgFOSVeNR%2FLPTTYn492BxVpeOLK4XTXXS9mElWZkOv4Cxgs2oSgDcr0C4ao8BFRq%2BalOsDaTgO85cai3wCWpHA%2FH6O588P0SbMJqhkA3tbeXTgsyZ%2F3ImYuRDe64Yd88e25Sr5AIDMj5ggvk4UfwtcpZKRcb2l2Usk%2F4yilPq7fUWwBIusITD9yvsUfPJj78DJ7BdDXSwXhfoj1hQ4udsC6qkK0OYsM7&X-Amz-Signature=b712cb39ea9977fa5f0517aaccd17b7df9f85fab1b940e92bad68f6bddf78d49&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUZHHQ6T%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T160106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIAY8zJ3mBKTw9ca9pGyHuWfaT8xG1dp3HKGHh0iiZ2bFAiAnrQM0dl3%2B5sxvAGLXNg6Me77TKm%2FbwEPsvfQCI5KW4ir%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMbc8FW4u96Qi1J6LnKtwDCfiyt1pzfXhdu8ah9YOriektxclF1g7RVuo3i3NG02l8HROqZnXFbzmt3yNsdyp1v3KpIxlbcEZEME8LdznIM%2FOUV5jOguvV1axYDk6wHeloUGt1ElvkiWbuCg3TFwoZSBL4TqJ0dEjeQG9Uby3OhJevixfuURFmqnrtWdEf4sca55guw51axtSR1b47gLpz1QgTC93%2BMgP6vHf9kEYUyfLvWsdz1EYndsv8LqJGfgiF4M5lLO5hB6C6d0457eiYoLE7neJGJBNa9Rf%2BXTPWTbzh4wsZdrVZnvKk1zd%2BCdihPOJzzE1qAwvH%2Fl8hUdmzRLfpzLt%2BziaTITNccs4aYVCUTXV%2FgbmPuavH7fISYIQ9QBvPQBX9gV%2BTa4yTuXJtc5HY6%2FvLDPvUU%2B77NlKpuY9BYDEFCNLFakR9RINqI47DBBGkz7WQlF%2BW8kHi4bnqFtDkau%2BGUE2N3AasWVAFgXA1yH2Ar%2BWg%2Fii6cO62fZkHWsFKDCvhb8By8AUZgqN%2FSr2RvHr8Ic%2Fn0IR607QLnosaspxkvmbRbZ2zXXVAcrE09eUgEcrfEtGk2x8YdeH3H%2B0DPfFemTYRuAwylzGxcQXsjsEWfTbkbYHSk2aSX1MFa5fiy%2Bu1FVMnhGswreH1yQY6pgHaIQmaEvCDhwnZ1%2B1NrEC8Z2DUQrBgWoszI053b3CV8ddVIsprHKBMByCjT5ra%2BPCcPn%2FxW9LJO9IwcZP%2F73VsN%2B4d%2Fbx3ef8nBFtyZmUSJxdhnIpDG0rokAmPU3Z5ETT14cW46O7HCxlu3OvtErXZAz7T27RCbULyzCdembylhihEHz%2FBZoI1nudJ17xicTMIyRzABOX2PTKaQh9e4l7wm4k262ZY&X-Amz-Signature=478514a868a6dc98bc222eba6bdb33188ec3639321d1eafb95e69b790419c117&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUZHHQ6T%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T160106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIAY8zJ3mBKTw9ca9pGyHuWfaT8xG1dp3HKGHh0iiZ2bFAiAnrQM0dl3%2B5sxvAGLXNg6Me77TKm%2FbwEPsvfQCI5KW4ir%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMbc8FW4u96Qi1J6LnKtwDCfiyt1pzfXhdu8ah9YOriektxclF1g7RVuo3i3NG02l8HROqZnXFbzmt3yNsdyp1v3KpIxlbcEZEME8LdznIM%2FOUV5jOguvV1axYDk6wHeloUGt1ElvkiWbuCg3TFwoZSBL4TqJ0dEjeQG9Uby3OhJevixfuURFmqnrtWdEf4sca55guw51axtSR1b47gLpz1QgTC93%2BMgP6vHf9kEYUyfLvWsdz1EYndsv8LqJGfgiF4M5lLO5hB6C6d0457eiYoLE7neJGJBNa9Rf%2BXTPWTbzh4wsZdrVZnvKk1zd%2BCdihPOJzzE1qAwvH%2Fl8hUdmzRLfpzLt%2BziaTITNccs4aYVCUTXV%2FgbmPuavH7fISYIQ9QBvPQBX9gV%2BTa4yTuXJtc5HY6%2FvLDPvUU%2B77NlKpuY9BYDEFCNLFakR9RINqI47DBBGkz7WQlF%2BW8kHi4bnqFtDkau%2BGUE2N3AasWVAFgXA1yH2Ar%2BWg%2Fii6cO62fZkHWsFKDCvhb8By8AUZgqN%2FSr2RvHr8Ic%2Fn0IR607QLnosaspxkvmbRbZ2zXXVAcrE09eUgEcrfEtGk2x8YdeH3H%2B0DPfFemTYRuAwylzGxcQXsjsEWfTbkbYHSk2aSX1MFa5fiy%2Bu1FVMnhGswreH1yQY6pgHaIQmaEvCDhwnZ1%2B1NrEC8Z2DUQrBgWoszI053b3CV8ddVIsprHKBMByCjT5ra%2BPCcPn%2FxW9LJO9IwcZP%2F73VsN%2B4d%2Fbx3ef8nBFtyZmUSJxdhnIpDG0rokAmPU3Z5ETT14cW46O7HCxlu3OvtErXZAz7T27RCbULyzCdembylhihEHz%2FBZoI1nudJ17xicTMIyRzABOX2PTKaQh9e4l7wm4k262ZY&X-Amz-Signature=d360f6f657e49becbe1028af389388f0b97153046f3083af4e2ecc85c548b205&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YH7FQYVX%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T160107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQDLrdU75gtn38Plle9NlZp76E6MEvGOMuVDhPso0VUwWgIgCUioZcOPZCmjxydDQovAcnXha2jRUsmD2v06UiSHb2oq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDNMsPyg5EAZcau49RSrcA%2Fqj6jb1HHIxdsfIGnG2SmNb3MP%2BN8QGsqka8bFO7oia8rY7vNUnm8hwP6qHHINpCK9uEwweibIqXbfc31TLyPZMC4Hx7HfASx5YcVFZh3KxpbtFF65qDluQV55tUbDBhra%2BwJPrui7%2F31cFhMmgCy66%2B3qXUJxF7O6YWgqgZF66BMmbCdwHUjpexWf0EpgtC%2BwiD6wrO8oRgquyqWXI1AJfvH0QZCaKSoUQIi%2BTURtgmTUbZfGJYOwhjhwlibox4b%2FQpnJGqrCFiDEUIaVSRxl5Uot7oCzCR54Yp7X8a9R5yoB6WQ7Q1I7lEzVWa72I7EW8urXutiOgr94iRX%2BA29ZhguOuhpKO7nu5YyCJ4gJVFe95BiAkYSX01XD1kNmj9yBBnuj1DlVdauRDiY7%2FIrQc9hL4qK0cLPpriIGerO43%2Fj8R%2FJmzG4MCTu%2BOeYtQudUDbf6Vt%2BsFMzRoGh3RMUnW7kKK86VIwQLjUZwH0y%2BvF0dDNJbBNzb8KQbwAaQ4BxWc6TLtd0thkw43gwFA3%2BIN%2Bscpga2m7YcqoIGQwhwax10A3t7RvQwaL1I48g124JGvkfpZdFJfV0D%2BJOk31ieq4znUvhNrigFre7gInfL%2F05ASgggGruh70cXVMMve9ckGOqUBJ1Z7V5ePpsPvLEy4vMSoX3bVVJKERnr72mgHlz3Z%2FfsoisF1RZYkPugOK6l3PGJXqom0KNB1b45pr8xC53mcCymYCo2ohBPkCGquOhUywnCbFCDqiAulhjJNWXEpDUvf99rbRPFRDu1%2FfDepxDVP6ynAhquRzRzSUukxPcG03fYbQZOcvu0XBbAqZ1CX4ZtEFDvYJfPsw%2BP7eiuvLNbSlQxkGYra&X-Amz-Signature=60563ca6c5f088a7d50589ab43bb7f9fd0964a83d1c368615a154dc2361244b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RTHMHD5%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T160107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIF2u5G7YD6Abycp%2Bjen2Jqg8YW3FXaMOz1cGpTmnSY5rAiAJq63ss%2B0eRQ9jf3ydAZWKRgq3rg9KCy2j%2FyAg%2F35P%2FCr%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMwbqkVfSkjuqw3vNCKtwDen66IacFIoQZLMbLMbRm0yLppWG6iNXqh%2FQolZl4XhUUEclvTRSDHT%2Fn7U9O9N4S20Exs5zcktYSfoCfwBGjfBOuFB36DyY8Sryy8NcmVdp2L9XcCZXCxNp1ktyQqVktxrqyc0uNz%2FFUF2SIfAk%2BDShFVb9W3sCG%2B2yU0LiodDgoEpocr8Kh4AuTdx0BZjYBWUfGo1VFdpX0argOetN825SNGkPQW3ob05xsE1AJZFakhS1jyu%2BV9Q9ZIZ%2BgpnNfIW4R4oxN2xsoxx1yh2amTorCRj66pdVHXO8%2F7avtuDfFUwTMvkszlI90nwVKSj2m%2BHPitFTG4vxTwdlxwdRFEPoD6atDqpItGz1T2ytsF%2Bp%2FpvoQ%2BBG6QpaiLTCj62sJ94FpbkbRGOBGuUL31Ai6QxjelwjCJ5ftipb7R81REdIIPcDu9wU6y49cz5n1x9V%2B9lA%2BAsGwBNPe4SoVYD9PDmDKQrdAirnTXIATFgNGc9S2Lbk1LFp1Dg4oOxXeY4pGDVUCTYaqRB2LnW1vqJDQ9WP5q5b1mByvBahmpf80Hb0dNl88jGILWNm%2B9HQMMzgb9HBvqK0WY%2BptkklelPu%2Bnm5N8LpXWqWmn7JrNFFloc7Ku3hIlXuoccMFPg4ww971yQY6pgHXJxv4Sy%2BdgDR68jSB1Kwbw5m0ykolqSio8dTCZQMFFDZxQGhRCbnDnuKUPJd0ZHPnPhQoIUshNbFC8WHvzMgvQpu%2B%2By2rf9i8W6UgBj%2BY5ImDxtQtXP3430YbThelzsunx3ZYJjBF5XhQ7WjxE4C5si0gn7wUoUwVFXxbGOTq7AGw2rXZ6AJXW2G6xZ03HzeqtJFz3fLQxxEtsV8WSSzjazA0eegV&X-Amz-Signature=70376af482f55702bfba172994c98531f7584929ec69a8c270529bfb4567726f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VK2S7ZF7%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T160111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCICdQR%2B%2B33Vyle4zuTt%2FTa77yYLWy%2FaYf83kRsTBKMY1uAiAaQ89xaw4rpcEdizJ8mKSfKQw7oTrDV%2FOJQ34VrVR9syr%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIM%2BJxZeEXfHtYY2mTWKtwDbApCkGEyIqm%2F%2FCpTKuKjJbX1DERdJ9mUw8IhnIJUkhasVsObqIvMu5v6TEeDfp9Z6a9LvIeeixIWCK84BF0nywNgmx4OWT%2BJF7XfY00%2Bh5U7uBZPKBze4Q3Jm%2BdPMR5N2rXIGP1cAwbPTPO0yZJhXRiRfwo3krAh%2FRkZ%2BQsHtoqapsfrUHzVz22IHtVBTNRA5Q4SAWwE1qKel2Ly%2BLmKpSXJNqCYP2pFmfjN8Z3s1JSwVOzdiwdFh22U%2B4XwLKFTckIu0eqNYULNCGQQMnuntmu%2BuFVQYdrgIBiukRQY%2F7M9%2BjzLFzjc4xKuTQ2%2Fl71VmVYjeajM2RCv%2F0GlXbzg5VzcjZAsPjPOYAcU%2FyvjDMloRSwYKydJ32UyHVvAri%2B0eKE%2BRD2HWZsxh12T0%2FjDmWVURRkY%2FxytgbYZDuMMOfsvpCbvPfnwxTztaxEy1AY8%2B%2FZ4r%2B%2FdRWWcS52qQrQlsEMz0ePPvpizInRB9jfQPQuXprDxFwDXVxL3P8dKnyuLhn8vKMgoMLkVuS7jf6fjRxfaHj0sThzmZfCDMp2oWJB15T5JDtthEBMlIv8wUBHh9YIXNIUp2rOeuv00Fp3QQUTL%2BsV%2Baoc%2FODFy9M%2Fn0XW%2FZoza4uI5g0CV1HYwreH1yQY6pgEoATGeWjn6VQZ%2FyH9yzdWa0UxBUX3EPMChVIsEZ5TsYtxqYCjusM8N%2FmEv5Lrf1HupvAFRiwozWbES2WUF%2BJ8V6iJ5xl29l4gDSQgOl0BUZ0YrdyAVeAZw%2B0RC7U3OnLxQtSnBR3xNVjN9rJkSrMHnD6yGUd62mSnLEKGg%2B%2BGNn3CaptmrKjtdUNR%2Bi3KS%2FBmKKGCBnvWBhbrfyg5GjR%2FMPObLwXoP&X-Amz-Signature=efa8751bce0fa75d6e80cb93be5ebbefc68975f1b1ff23c3eb509d82c1b054aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GERJJUV%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T160112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIEzATSckUuRNiKYGBkVWcuBsedJ%2BZPv5fN%2BgfiKn%2BysqAiEAhKttD9tgY%2BoFJixMlcTOL12ro1gbqR%2BY4KifoaP199oq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDGsHcL%2Fzg4yL5ni2jircA7ADUtqUzJlormau3vsdlK%2F9QpTwnJ01ZHcelJ62iyzexksdUjcpaeUaDLsoJeIMMoTtB%2BTSl3rJu8pcBZT%2FWAeapBS9l5vEXUfTk2Z5mpM9boCvrP1Q7VkJ7wkap0N2kMJikDNf21NGic%2B8WcKFFQJOFE1YFOmvUpMkT0SGpLy5fQDLTi%2BqxJXA1asYQiboa5fYco9cvN4dBabDu1g9pof%2B5T3X8J5TjfmNFJfRR1LKDQoZgfAQL2%2B9LrNNTYJ6H5AV7QjeI0%2BDLXkFdxnUKJaLvkvKmja1b%2FkfxjVWLhRBYwjk0i5oByF2ybgTLjdMiSW281n1sTx6yUbmGo%2FFDbqqZhiJc%2BFNikyunNTsTYPE7CuYc1z6riUU8X2c0IGiF2GvW%2Fe5baa7XKJ%2F2ojN6CZiKhZRuAkS3kQh3LasiYClQ%2FYybll5jCEmBB40hq9FTDresKJ2vtwyFiKCN5cxOexwiJc8zcraRGMOry2LxPMN0Mp4cVoMnDoJF%2Buzw2ebXaJRu4nQ2MLnbkvTzi7%2FAebEteknF3bWS4FbZoWIYQSH8t1ieUA6E58P2b%2F%2Bi0KfAvv16cNbBAk99UggWqybzijReD3ejE2zZe5tA6%2BPwdfoG8sI85HAPTVFcICiMK3f9ckGOqUB%2FfpDgGAGZg5g0NNg7Ri1jNvNdReT81kZMK4EUUjewntCHjcCrec0TzgwyyaxZy934jn5uXZYVBf2DEl4OVjcyBoNID6l16K5eONDYoqLE17uwPUzD2Qmdts8Dj%2Fi7hap6AkNPoZ1YMLq1pqvkbsCr4O3oXKardr4qYvwhs9SqADSMZgjETxbQwtwrEjK0fHrUH2%2BszBpbANoncsUYsdqnTiANWM9&X-Amz-Signature=4935185c68a37786d547952bfcf1d001669cad973d9dff030f3a49f8cebbfb61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GERJJUV%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T160112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIEzATSckUuRNiKYGBkVWcuBsedJ%2BZPv5fN%2BgfiKn%2BysqAiEAhKttD9tgY%2BoFJixMlcTOL12ro1gbqR%2BY4KifoaP199oq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDGsHcL%2Fzg4yL5ni2jircA7ADUtqUzJlormau3vsdlK%2F9QpTwnJ01ZHcelJ62iyzexksdUjcpaeUaDLsoJeIMMoTtB%2BTSl3rJu8pcBZT%2FWAeapBS9l5vEXUfTk2Z5mpM9boCvrP1Q7VkJ7wkap0N2kMJikDNf21NGic%2B8WcKFFQJOFE1YFOmvUpMkT0SGpLy5fQDLTi%2BqxJXA1asYQiboa5fYco9cvN4dBabDu1g9pof%2B5T3X8J5TjfmNFJfRR1LKDQoZgfAQL2%2B9LrNNTYJ6H5AV7QjeI0%2BDLXkFdxnUKJaLvkvKmja1b%2FkfxjVWLhRBYwjk0i5oByF2ybgTLjdMiSW281n1sTx6yUbmGo%2FFDbqqZhiJc%2BFNikyunNTsTYPE7CuYc1z6riUU8X2c0IGiF2GvW%2Fe5baa7XKJ%2F2ojN6CZiKhZRuAkS3kQh3LasiYClQ%2FYybll5jCEmBB40hq9FTDresKJ2vtwyFiKCN5cxOexwiJc8zcraRGMOry2LxPMN0Mp4cVoMnDoJF%2Buzw2ebXaJRu4nQ2MLnbkvTzi7%2FAebEteknF3bWS4FbZoWIYQSH8t1ieUA6E58P2b%2F%2Bi0KfAvv16cNbBAk99UggWqybzijReD3ejE2zZe5tA6%2BPwdfoG8sI85HAPTVFcICiMK3f9ckGOqUB%2FfpDgGAGZg5g0NNg7Ri1jNvNdReT81kZMK4EUUjewntCHjcCrec0TzgwyyaxZy934jn5uXZYVBf2DEl4OVjcyBoNID6l16K5eONDYoqLE17uwPUzD2Qmdts8Dj%2Fi7hap6AkNPoZ1YMLq1pqvkbsCr4O3oXKardr4qYvwhs9SqADSMZgjETxbQwtwrEjK0fHrUH2%2BszBpbANoncsUYsdqnTiANWM9&X-Amz-Signature=e77c146f86812025baa3859dbbb857e85f9f16f214bd7bbe823b2813cfc2bc29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTIWQXN6%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T160058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIEoU%2BPrn9lGI%2Fnm4xhTr3rBfilK%2BUE39qBcsbzatgHB7AiBw%2BGUZOFEi1cZDIvXmUVDprtGtziuhSAzYHvXSRpPVwir%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIManhnKALVcIllEKS2KtwDfV%2F9%2BGxEoxUApqS%2F8AnlrmAPOFE2F0pEu7EvhzqMTiNVzzJ1AqO7CElaky07kvzEie9Ye%2B2BYTIPhWbTXNxUTetwEZeLFO7FIPyMOWr1stVZo6rJzr21A%2FQIn4%2Bk%2BFRW70%2B5bptDV5ej4nxFX0HReM0kKtwRD34ywm1mEcoCQ3ZxtuQVdS3wRotgAdT%2BIFMKMxBC3ktm%2F%2Bk3XZn0nUPHFLmt2myJTeC68g0vIDCZDYYis4NkHlccxV7006eLd8Xot4amCVV8H6KCcsFVL5lYsGSCKDIxpyecvb50wsjMAJLFNgIy3w075EcLJPnWABtBXhDcWQl3NfxUs3Ty4QDoVy2yRdLuqQxl8QRls9%2BzKrjV2osYtL1oVGaOiJBbVOKXd8dopFEomRU5nIjSv9tUCLGsuJ3oQkoX5qPoreD5ByOCYjbxCZaf6q1KN2NKdE9zHR4MRKk2ckII0y5hHe9DyjRhUunxTBbPxAc5M%2B5b35C%2FBd3%2BYzjTtDwB%2Fr47yuT2JIQWtOsLzpzM7bKrtuItQn3Ij8UYZmBfxredUxByZbGHnI72%2BfatT9tvS75MTWYflJraGotwX93AMK6f9jdUZ8KGOBg0XeosoEiChpptOHkJrB8pSrbJKsoRUpswod71yQY6pgHQxWawz5VXpOqmvP3Jild9b9Td1yRKLZAeZ%2FtTxopCt7eUapmaMZL9rIfIfQstS2b8n5JmWfvvUNZT8YMijaXnWXo%2B5a39UygP%2BtmyBWjTdxYBB9yOYlsdzUlDg2%2Bq%2FRmzbB9bVi6BUefav57wCskRFc9lafflcvpMDxkJk55oLFl4CYtrKzVW8IaUnRcYualbMowixv3k6naqp%2BVT0I6IE0OjHxqZ&X-Amz-Signature=4489ae79aee73c0d12aeeee8fa6b5630fe085fa2df540fbf0b92fcfe6cfbfd78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLPHEDBU%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T160117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQDnquK5QycMg1N5vTWx%2BKtd8QxFSTZNSPAIE7aYhoYVewIgbg%2BCY8KKus9bHa1YbH6hsOGHFHnZu1t%2F4fiJg2a%2B3WQq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDMBtK7An8eSM0Qc7oyrcA1qP5%2B%2BjW3iOjcXedP7pIchFh9M0YncMQ6N9wlWU3BMqGEe6Z%2FO%2B6%2B%2FTAFMsuEU4r9ReBTWtKAl5CacIUfwwoixCoBnNp%2BxtbzcwWLLQu53yk8oK7sD501LtcfWl3JsneIWRbbj1v1%2BtUE9LGqdyPSpDTOT%2FjON71FdD3%2BU8sJS%2FUb%2FYMJuUh3ArLaMjORkgK5DXOkWEmuuZ%2BgL1S1DXDgNamuUc8erQerezoi%2BNnk4R2%2FVFrakGGW7s8vdJvH1WDe5smDTUiYY8hgrvhHvUvLtuSaSkCzfBvJ10Wm1tiRxylQBgfMHHorSOnibgLGylTUCfcC11stnMHTXktMlDiqwkqO2Gv5MctS13r9ztJEt9%2FP9GZyqrOSkNHhF80LLO3iQ1tesqED53FR6TWrAA8EGLKFYrOu9XLiY7g9IGK3QrsPkcY%2B%2FYwo8P%2B7PMd1S%2BGI7u%2Fk1JnYps0p%2BFRC9qCux63IkCLioImDazxD70Sqf632z3wHNqI57yuepn0%2BeSBsvDGfrzlWDMZmNiZTPLteNm%2Fi4nr%2BPDM4p8DuU7fjsRFgg1oc2sBO%2FLgnLyX2yDg7lxpZxhoGwX6zAJjGktbiMGyWtufYGfCdh4pcC0sRyCNrmOZIwP7aUV71SQMIff9ckGOqUBqGbvquzO4mt9UQJjY5feUOf7XkbNRfUz4HUIUwXBaAAnOIFVa3KnO4LyeVMxMFbjUxcohvHU5XlOK5urIoEMJnAibGAFI839%2FYV8%2B6gcURsGMvVILVxr%2FjvDjh1QfqeEZ4rpyH2%2Bx1Tu6CvEYr5wmg9fKFSv238Gbx7XVEwtV7VJZnhaODdykCBKC5oDWOmxgokuO8TTvqjlfvK6iCXQP3mn%2BTVF&X-Amz-Signature=d6ab33dcd48646c09a122b0cf6739ea62571b63734c0c4c739e9f31bd8ab28e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLPHEDBU%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T160117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQDnquK5QycMg1N5vTWx%2BKtd8QxFSTZNSPAIE7aYhoYVewIgbg%2BCY8KKus9bHa1YbH6hsOGHFHnZu1t%2F4fiJg2a%2B3WQq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDMBtK7An8eSM0Qc7oyrcA1qP5%2B%2BjW3iOjcXedP7pIchFh9M0YncMQ6N9wlWU3BMqGEe6Z%2FO%2B6%2B%2FTAFMsuEU4r9ReBTWtKAl5CacIUfwwoixCoBnNp%2BxtbzcwWLLQu53yk8oK7sD501LtcfWl3JsneIWRbbj1v1%2BtUE9LGqdyPSpDTOT%2FjON71FdD3%2BU8sJS%2FUb%2FYMJuUh3ArLaMjORkgK5DXOkWEmuuZ%2BgL1S1DXDgNamuUc8erQerezoi%2BNnk4R2%2FVFrakGGW7s8vdJvH1WDe5smDTUiYY8hgrvhHvUvLtuSaSkCzfBvJ10Wm1tiRxylQBgfMHHorSOnibgLGylTUCfcC11stnMHTXktMlDiqwkqO2Gv5MctS13r9ztJEt9%2FP9GZyqrOSkNHhF80LLO3iQ1tesqED53FR6TWrAA8EGLKFYrOu9XLiY7g9IGK3QrsPkcY%2B%2FYwo8P%2B7PMd1S%2BGI7u%2Fk1JnYps0p%2BFRC9qCux63IkCLioImDazxD70Sqf632z3wHNqI57yuepn0%2BeSBsvDGfrzlWDMZmNiZTPLteNm%2Fi4nr%2BPDM4p8DuU7fjsRFgg1oc2sBO%2FLgnLyX2yDg7lxpZxhoGwX6zAJjGktbiMGyWtufYGfCdh4pcC0sRyCNrmOZIwP7aUV71SQMIff9ckGOqUBqGbvquzO4mt9UQJjY5feUOf7XkbNRfUz4HUIUwXBaAAnOIFVa3KnO4LyeVMxMFbjUxcohvHU5XlOK5urIoEMJnAibGAFI839%2FYV8%2B6gcURsGMvVILVxr%2FjvDjh1QfqeEZ4rpyH2%2Bx1Tu6CvEYr5wmg9fKFSv238Gbx7XVEwtV7VJZnhaODdykCBKC5oDWOmxgokuO8TTvqjlfvK6iCXQP3mn%2BTVF&X-Amz-Signature=d6ab33dcd48646c09a122b0cf6739ea62571b63734c0c4c739e9f31bd8ab28e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXK45CIG%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T160117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQDtMn3x2hGDiea6py684NZYqA26N%2B%2Fh1UQ6r797aKIOpgIgXazSJtS3TIW9nngfho9PbP4wclqFav80lKxMms2ngEgq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDP%2Ft2VIpMBD3hL5dJyrcA4dWFOScodIbpnB35d1HBageYVdn0wOqK3rywpGWaLB%2BaVe2%2Fukc390vSCd2ht3XvGt%2BTyvhV6x8%2Bc8Z2gqGwGmqSyCnOh8hvQ5qdB5CT74vXKrqPWQRZ6kDPxBtQO2cwbMZGbEC1WYjm63WMEn2cu47rlTnEnnxc5QRzAdQ%2FDRrVKt%2BWNZjkHm8zHN%2BT71AmQsFU3Y0hfgjWK5mFtrJHZJz2%2FO%2BDpv235Ojx7hwlOb%2F43ErbKzeFVO%2Fe9JX9KWJmhE5Tef%2FHXn%2FCJarR7oX%2FojkB%2FOmIWx8OTvwbAUVAO8qgh4YtTXZc7%2F%2FcTyzs%2B6k%2BKo6SOppeF5xlFim%2Faq4ptp1A%2FMeqG3kJtJaUihUppFfRsAIwcHDKnvuZVsFNwR0veEk%2FiR6o6hM8vSucCJ8p7rnq1oY%2BV478Ar2CobI2NKsZjrtQ4UmWhOyMry5CzgrYjNLq3i8auYo68zZKW0Cqa6xsBp4OdqezyYDT6tnGdqBjpYLMgEWPPH%2BC2jxK9%2FEmqki%2FI9ArxmgVUzHJHTAunoU8xeMLkHJhDip6xYglohVzJ6Qj7zNdfO2OwTVuNUae9otF6SRWSwqwsvX8hehIVWEyxODxD64y%2FQXVFRe8Jxtv2dyKfqks0f7i7grMKHe9ckGOqUBe6a%2BDCxQgkj7L3F3iwjNln0zsxnz7I%2FReRwRW%2FkF2U5DpKomgk1Y%2BxwB1CCx8vlwmZ6Jbm5mbx5M%2Bf4IdBqsoes32iwzJ3BrgOxBfbwEeq1inHp4fzpEc8ZKbz8sjeozzCPndY7ormFQn2UL5%2FISHNvq0n4mlvKBaeTzQsXnQ%2F%2BY9XVUTiKG3DN2ON5z21%2BX8ciQ3ODJxenxBZSivEqKHFrcCE6W&X-Amz-Signature=9cf1d5e654d39516e6ce7ef9c68f1b4b56666f4ceca6da7a63ebac594b21f208&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

