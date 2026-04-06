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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQMIVP46%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T183738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQC4OUsaT5MH6i7NphQjBMzJQsbcMSbRN8U6Ig1D%2FqxYLQIhALq674KzfwgkxyLayYdAobOBotohoo83ZaJ2Y0BIJcybKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz0DoTfTHi%2BtAfquO4q3AN5%2FA%2BiIeawoKfG7HAeGUG9%2FbOhXppcN3P3JM3%2B0kKawHBRUf2MdDUtq0Lo6RPHTD%2BygK8Bzhxxo5wNrNyo2yTGDmakljZSjrfLtCj35aKsKROoLwro8W%2FxuO75jKwPKa0wPrcZj1qsMyOpL69fhvDd0QCtRI%2FSb8mRTT6urGHYWAPiJDi8tQMoHrNNYpGSjnnlKgCoxsqbu%2FLwZr0rOT25fF3PJREm4VbP9h1oUPUtJdyZ8u8h1aVX6ZCC2QKhygiuTgygBP2aT%2F1Krd2itSZFj%2BZ4kJ%2BOrfp3lrDLsq3D4V5bRsVhCHE747wpbNcoXKMbYeoi9EnPm%2Fzz5s3kaLyOnjvqsNHkl1Vc6jlSLb0uK0g5zF3UBy6g%2FORX1OqY%2FpEctzuQi6TVVCcU%2FlMObevVpqXL7ANU6sMR91NH6K%2FT20YNO61ub%2BCetr1zbJKLSwgPaYSDRPAf%2BljkqxyIT56r7HXmPYE6DrJJ%2BYlHrSCJm4hYbySvxNmaz%2BstCYOQgOKJzJV46unWq%2FQs8E%2B910pFCHhHAiLOY%2F3PfAkJ3QhiRRZ0FD3jxI0%2FsRK2J2eM%2BU6Ojn0ejqyp93B0g8SBDactEbkkEzxSuIdpb%2B23kVJoTCPkLyUtYD8Rwxn1hDCC0M%2FOBjqkAXv3BjH0EN9nfCvJWk6rTp6vF6BtGcsXmrC0B1Ww%2BYXkEkATxu5pEsP8VV4qhJHFA%2F3VL6ww4nMvega3RQZoAvZlL6FA%2F0F0oDVXMeYtxDRHaQuYemGVQO76XHjp2bSUMMpddgkIF4tdnuMO2z1hrEV5D%2B17FRnS1qSGBOhPzdBxV7lAq67CO43SBTyZ3BzYZUJhVxVY%2BOEuNsAdSZplNW%2B84VIc&X-Amz-Signature=e4845fedd01f971051f7b5d8c911fc6b45522c9762d8fa8b42214867ca8527a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQMIVP46%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T183738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQC4OUsaT5MH6i7NphQjBMzJQsbcMSbRN8U6Ig1D%2FqxYLQIhALq674KzfwgkxyLayYdAobOBotohoo83ZaJ2Y0BIJcybKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz0DoTfTHi%2BtAfquO4q3AN5%2FA%2BiIeawoKfG7HAeGUG9%2FbOhXppcN3P3JM3%2B0kKawHBRUf2MdDUtq0Lo6RPHTD%2BygK8Bzhxxo5wNrNyo2yTGDmakljZSjrfLtCj35aKsKROoLwro8W%2FxuO75jKwPKa0wPrcZj1qsMyOpL69fhvDd0QCtRI%2FSb8mRTT6urGHYWAPiJDi8tQMoHrNNYpGSjnnlKgCoxsqbu%2FLwZr0rOT25fF3PJREm4VbP9h1oUPUtJdyZ8u8h1aVX6ZCC2QKhygiuTgygBP2aT%2F1Krd2itSZFj%2BZ4kJ%2BOrfp3lrDLsq3D4V5bRsVhCHE747wpbNcoXKMbYeoi9EnPm%2Fzz5s3kaLyOnjvqsNHkl1Vc6jlSLb0uK0g5zF3UBy6g%2FORX1OqY%2FpEctzuQi6TVVCcU%2FlMObevVpqXL7ANU6sMR91NH6K%2FT20YNO61ub%2BCetr1zbJKLSwgPaYSDRPAf%2BljkqxyIT56r7HXmPYE6DrJJ%2BYlHrSCJm4hYbySvxNmaz%2BstCYOQgOKJzJV46unWq%2FQs8E%2B910pFCHhHAiLOY%2F3PfAkJ3QhiRRZ0FD3jxI0%2FsRK2J2eM%2BU6Ojn0ejqyp93B0g8SBDactEbkkEzxSuIdpb%2B23kVJoTCPkLyUtYD8Rwxn1hDCC0M%2FOBjqkAXv3BjH0EN9nfCvJWk6rTp6vF6BtGcsXmrC0B1Ww%2BYXkEkATxu5pEsP8VV4qhJHFA%2F3VL6ww4nMvega3RQZoAvZlL6FA%2F0F0oDVXMeYtxDRHaQuYemGVQO76XHjp2bSUMMpddgkIF4tdnuMO2z1hrEV5D%2B17FRnS1qSGBOhPzdBxV7lAq67CO43SBTyZ3BzYZUJhVxVY%2BOEuNsAdSZplNW%2B84VIc&X-Amz-Signature=e4845fedd01f971051f7b5d8c911fc6b45522c9762d8fa8b42214867ca8527a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YLWWBAJ%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T183738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQCx429ySLhuew499nlzfki9yVwogQRTEtXYK7jqRhwMIgIhANohpQzVVZEZlY2R7lEf%2ByoJlmDh3g0RtxIFSWf78gVbKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy7qGhzpWRGPa3lez0q3AMyqOc61JyHLG%2Bfj8sk8gFzR48GOizjUy9jbZCrymyDO%2FnZqoXGCict6WS0cxqw%2FOfiUbM1KggvZqgN7Cm9fg%2BRG63mL8BVPYr6LbcaIyUrK5ZiklRQQ6ztUxWOOibK%2FCaHpeLWYzGKnLhtV38dPC2dteqhVnFelhraGBlPGL2IYGKQbex92QL3X6loMPibi1sNcbj2zPO%2B0XrrXyJl44%2BPyjhkc4QKf1K6jc4kPi%2Fgzc6%2BQybt4kiWIjOOpG1yIlp%2B0rVIHXa23OmKUMx%2FrUm6nU3D7f3wl8hYImSW1UPuzvqnEOTe%2BHJNALGZzojrJ35436JaVQL254PAj%2FzYXurXZ8A999tA5Xj43HAeWhvJPim4%2BZAq3i4QtjziIoVJxmCYiAsAuEhw31N6WoQFA3LWRngHqdcl4Ty5B3sRgZeFZ%2Bml6QoL87Cc%2BSeT1UhoCo8fyNMG6wmJ1IOcucPF5AiUKPAQtDVZ18ygBkoFwQWadH6w5wU0kKaq5GEblINbuZMFYbfmnefpMGi65r1cDMHdW8mQld7uNWfME%2BebAKF8xFUqlb1iWI79TMrgruiUXbRBPyP0FhygkauRABsojRy%2FNNoTO6Ek0e%2ByIA%2FVNbePC5lETcrk7ZWe06ha4DDS0c%2FOBjqkAVlM7FzOcxUlzoV2ojD6%2FqiUO1Lq3SIjYrRqkGhz%2BqNGNk2xNCdE1QewzxdBNbT7vBEABVhPQf1rC994LjjxScZIP8A%2BEiAkUUf7cYV8OnBMsX73cSbFLVr2HECUSMRlWlcpdczlc5ejOMeKu7w7psdCYJnZE18hh5TN629Xx0zUbk3x897RMe8LBttSX0AE1zrvEe7nzuvYqC%2Fr017i9lciWB%2BC&X-Amz-Signature=b424c65192bfa4e46f55008ca1fd615f243ae919f3d0c618043910b73392ddde&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WASXSDCB%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T183740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQCvS2RY28y1AM4mebZoFPcfn9IBqAOtDuqRn6pEfX%2FsRQIhAO1z2KDYVc%2BMRTkniAkgu8DyOr6xXw5d4lyFhht7u69iKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzq3q6iI87zubYzwQwq3AMpok%2FZSij5NakB42mxt%2F7%2BYrs7%2B3UMyrpMxmj305Tue3BkL3TQGHRjr6YSliWNYPCIa83opRgfVY1d5NsvovOoM%2FOfVmp9D81UD3i%2BWfQLEjmvQ9yDbCQmpFEU9TgRkudiuEeAIWfoogpUperiur4xb26Pug4zz4Bfp7qXTxU%2FPd5CbSdMDg4I93EGiUpMdNbeDc6b6jhe1cN6BwNmz%2FdvP7SDdbH4TC48UiWnDMoMaqlvO6vBck1fnufIw7cWR8ncFwM1QGhasz3lOZ%2ByY7mAcOcg7Eqik9InX8B7jSh9R01Bc1Me7JwpKi0fk9IYmf2qtLerQoJu8793H3Qh5kPjLk7FWnaapR8YpF7mcPFuDHwsJgboY%2FBLiAWKjCua6eITQhNvtHazB83G7RR41BlRIslOhqVgtdtbSIUx%2BllB%2BABbhriz2DZtDhSFbrBUvPtTrt%2BO2pvtm6snTOeo3L6av9bViT0ulC6iNtbkpVQox%2Fw5V4T%2Bc0ok70TRDgQx%2Fj46mLcQ1fnetlokQX4YMlYLyMe6cIAaEdQaQD8zNQYdMoVRXdFigjrDR1PqYguQhyhCtRwHOqm9z9Y3ZXbpXbPo3mryH6nYTvX7UO21%2Bj8kqFd3viS9ZvQMbHOKADCy0s%2FOBjqkAYHpYkVj9Od%2BQ8KRPA8N9KS4jQw2wIZYCPan9KvXzeSqdLEIJu5VgHCGGE0u3KyiRc1e2YYK61iYd%2FFqifV1zZTtw9MrvLfcngEhaHejrApzB03tD0Vu4hx4eoeAM%2FcKGKLFbp13fL51Qu2rzFlRtP7q6VFKrxR6y9wKC8NdXMk4jpot7N5dpMYvcMF%2BVzcrHBPFFCyR0ddwEDHDup%2FnpibgLdI0&X-Amz-Signature=134ea92f1242f6caa0b452fed7c791c3581bf5d0966673a39720fd514db824fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WASXSDCB%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T183740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQCvS2RY28y1AM4mebZoFPcfn9IBqAOtDuqRn6pEfX%2FsRQIhAO1z2KDYVc%2BMRTkniAkgu8DyOr6xXw5d4lyFhht7u69iKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzq3q6iI87zubYzwQwq3AMpok%2FZSij5NakB42mxt%2F7%2BYrs7%2B3UMyrpMxmj305Tue3BkL3TQGHRjr6YSliWNYPCIa83opRgfVY1d5NsvovOoM%2FOfVmp9D81UD3i%2BWfQLEjmvQ9yDbCQmpFEU9TgRkudiuEeAIWfoogpUperiur4xb26Pug4zz4Bfp7qXTxU%2FPd5CbSdMDg4I93EGiUpMdNbeDc6b6jhe1cN6BwNmz%2FdvP7SDdbH4TC48UiWnDMoMaqlvO6vBck1fnufIw7cWR8ncFwM1QGhasz3lOZ%2ByY7mAcOcg7Eqik9InX8B7jSh9R01Bc1Me7JwpKi0fk9IYmf2qtLerQoJu8793H3Qh5kPjLk7FWnaapR8YpF7mcPFuDHwsJgboY%2FBLiAWKjCua6eITQhNvtHazB83G7RR41BlRIslOhqVgtdtbSIUx%2BllB%2BABbhriz2DZtDhSFbrBUvPtTrt%2BO2pvtm6snTOeo3L6av9bViT0ulC6iNtbkpVQox%2Fw5V4T%2Bc0ok70TRDgQx%2Fj46mLcQ1fnetlokQX4YMlYLyMe6cIAaEdQaQD8zNQYdMoVRXdFigjrDR1PqYguQhyhCtRwHOqm9z9Y3ZXbpXbPo3mryH6nYTvX7UO21%2Bj8kqFd3viS9ZvQMbHOKADCy0s%2FOBjqkAYHpYkVj9Od%2BQ8KRPA8N9KS4jQw2wIZYCPan9KvXzeSqdLEIJu5VgHCGGE0u3KyiRc1e2YYK61iYd%2FFqifV1zZTtw9MrvLfcngEhaHejrApzB03tD0Vu4hx4eoeAM%2FcKGKLFbp13fL51Qu2rzFlRtP7q6VFKrxR6y9wKC8NdXMk4jpot7N5dpMYvcMF%2BVzcrHBPFFCyR0ddwEDHDup%2FnpibgLdI0&X-Amz-Signature=8f5950637eb2af0f17a0d2ccf259deb5766ac47c33c90227fe9f2acd418ae998&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664GMLDUJE%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T183741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIC4NQ5UHF7rKIsn%2Bw7McGXeJR1u0ahVIFuagXmNTcf%2BvAiEA65JWVXC%2BV2bS9%2FaoyR%2FLd6Qhl6iG3LJM%2BQ8owLxk9IMqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDTkzGFNvvJ1%2BL2a3ircA7EpjQoXs0tucYpFeVlJpYkSpttUkNz7pTkH1T6nQ8i5FpWWwemqGaXnhw9LVrwltYix%2BCxdwCkmtN2DXZdS5C6fADIA%2B9N4RmgMPnJLABVnk72lIRDXDIUmIG7chKXWmYpWBVpwAVgYwpURbfxiJqRrhoVp2PWfIRXDHzhY8j9WcdFe1BfEmQIUKCtQK%2FhbEboL9BX09jXOacI8%2BXrkhq8rmmW8%2F%2Bp2btW%2BgiBFjKjaORmu6JiGgq8rHH%2F5Rc%2BGp7LL43YdzINmfKVmA6f0%2FeCkIyej%2FVogwQ0U9A6Z3JffPFc5UPpdY3qF%2BeiyYXexeiqxDvkpxrnAVYVi2ur8qkIv4UB5FoZ13eTv2a0GCF6%2BzsUJVJ%2BHToJPhYj2lTPWiTnu6QoNc3xpak2sD7pMaPm8CeCk%2FLugQzAZv%2B1slt7FU1A%2BR5rfos3k5Tubbv3Glyjn88qiTDmMcXIoIWli5R4gL5SMg6LRw21mT5Ci5wUWScw8YhPl9MezIdIUjye%2BrKmYUZ91IAlP1oj3BJqvQl4bB%2F3qc9efAg0yZCvkOUGL0fpAXmEh9j%2FMETLJaB8OfyXJ3tCB55l7GSY2HEEQc%2B2n%2F7%2B79WQMbURw0f0qUCqXYr0kZFh8BDk%2BqdnvMKr0z84GOqUBJNw5ih54Y3wKxWeBXZtJQPEC6bxWekfpAmWHHEYpiNSb4OOwYRcI2IU2mxD%2Bto0HHGPMHsn3hhvksmSY1ZsSfPUkvoQCTZDWTdsq8KLUyPtevoQroxxBixusxoJzDtZ9mUNionIuxghKOBiANAmhHcwXvOuM7kx%2FwiQd15H6bmdQYypUcu5YllNrJX5G0qiB8L2iCPsiiPY68evXuS5OxQ21aimX&X-Amz-Signature=ba42c0fc38c7be6359a00b389ef1e3725999c796ff72d4b781a19ef8a437ab82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NINLHUK%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T183741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJIMEYCIQCZmdBDz%2F1RCHYF5rIhkbrLsChPc%2BCQTdaJAogT4ruvJwIhAJSmJsY1IHncZPceyNZDa5sqWXHlszxnnj2ke6OsYFliKogECNT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwhoHjClLPRYxWLY1kq3AMINU4P24QWTHrjMJifu%2BuhLSJn1RBel6kL30tx7ZdKCyCQWG4Ec1EkoSOY7AK%2Fe08c1kDBxYw%2F4aAZeYzYcsRQ%2BUQCJm7YEr5o91MLd%2B9g21qt%2BsSSRIHhhXFPiH4tzvo7qSjQgUgl4KrqY7FMNjLBQbWUntIPMnkO0tNeHci3ZxpzeywGrT6%2FGo2Xjk5xc%2ByU4fAzvQZMRh2nSBD9pn%2F%2BkGamO6CmqdOqdD3j7emXw66gLkj4l0zVk1g93u%2BVo5yGWhKuvXaRgbwSF0InPs5orRWEtPeu8dwYXG8xbhvCELYoAGqvqzR8czxIIQIlFNSoyqi2S1K%2Ftd%2F%2BNqWove7D39CpuxVxFjWlWS9aODNzhhglnSdDU4iuoRjJxPzMZZ%2FIyb8Irf7GaVW3xqOA7aAYxlDcZH4ka0vGiXamgboloNV8vPZLVlonipWeVspjU%2F3stHOMkl1QrTL%2FK1k11cBngj6l6OQmLJ0jcG3AYFLZ8urwTXALpES%2FiOkO6KdhESaBsKeQPtMY5e40Wom61yKi13LsuNplQzDMffNUtHD9QLEzMndu9bAdXNQ%2BgE4b%2BaKOLI4YTPNwpc08ylTN0iput7X2mvUG75mqKA0JO3rxF87G%2B0S1lNuFCjtB5zDH%2Bc%2FOBjqkAfzQ9hhT%2FrmzrbGkkpYPC9kbgBzQDysHFbtFd90DgJ3Pt10fvx87O2MniOGkplnbmKLTjBBtr67s9KnjOY9F%2F9alq3QK3L5c3aaRT4h22GebElKoTVmfuZjzuW0IaL%2F3OvB%2F8%2BHrdb5%2BximSXAiomZyZZ62sHgT45qXnIzlORc8mx%2FPTBepO3n37tHCnX0GV6A37Qg4FcDO3t3HhKwNF82tL0yxz&X-Amz-Signature=ab52af9523df0f7a202d95edf0ba4de46c4c8150b401d6d25aff9db48e554988&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YINTTND%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T183742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJGMEQCIHvMZRuzXdfNIPN5j0AKalUOT3vc8if9BoDrncHcJikFAiBh%2FxcyiswOmN5H%2FNtKr8P85X29Tg5dqRdDnHabXZvBLiqIBAjS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMtv0u9QaoOE2VK%2FeiKtwDGPMhJpP1gO7kdnoQcRdXb2%2F%2BL3%2B3MxI9RMUhGoMeaKZKQ4hpOBXLIV3P7P2ffEYHMHwHtwL2CIMplZS5%2Fw5ac9Od741BrOSl%2F0PwdjwOJVmFFqYeb5kALiOF4TnfQjbUViVuPj0Co7%2FCRMn8kj%2FFkOLSdvGffplexDDbyqXNrlyVkXOcbRHEnSpTYLLGZPn2LDaHJFrR%2FeJpmLge2we8PjbuC22P%2BUvYktKsG7s9EqxArjaT9woTVt358yDuP1qOyCi6fuTRwor5nMmM8EPA0ddAg5hUta5mzj%2Bk9Se59HBKiQooHLq%2BrDfucHhEdJYGbUmesjXS8F%2BmrbJ%2FRC7KPyLfF8zUb9e%2BhtfvDt4eRbA1JXh3TBwKD45UZ0Dl54jjMu%2FV35H%2FnKASbbr8hHPjB09bBGMjZP%2BaLesEAjLr7lKQvFcdwComa33eqcznjJkazBxTNef9ySf47HmtfuFs63EHDDfGFyjHbFSbM7xjZY3wdDaZAQt6tzfj8nTDQ6LkGKMKSz67j%2B8uw%2F3kOLHjrU%2F7KN8OZHAg2dxDkmXsWVqoFd5IwCaOF5YxbH9yEfQQKPl812O8IBhwHC1vMXnA%2BHzxxJz5m2TmyViQnlFqEPcT1P5ttigE7YPtLHQwr9HPzgY6pgGiJk8nyeok%2FgkWKRTnB4QUViHuTw%2Fs2JAKK9giMdK4LDixmFk%2Bb999qA%2BuHCWHRhFOCEtmat%2FRtnmh3Lf6TcPAM5biJ4yyOiU9XT4TOJda%2F%2FNseWnjAmyi3XVbJnoxrxAJrQgf23pYY%2BXA3yBnglcfsGXV9JpN3rbuN2%2FBURATfjCwhYR4Ox0gu0TSGSiQopGj%2FLFvMHWLsvbUcQUDVIhEi8PX40nr&X-Amz-Signature=d28ff727185036b45a233a6ec9279d3bda563296c35a674ffaff65635bfe7b81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSQIAHYM%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T183743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQDgqnr8MzVuSFBsPQaQ6zZyEIodX7QxpR9lljjMA3rEcQIhALY6dKVDIELFiGbhKCLSbhIqkpdW%2B7MbfNF2BBc60gg0KogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxMsBxdzIotlaH3mgkq3AMxXZbPlxSNdWJgMtcxK3gXuPhA4XMCLV0n49ESVFirRBGcKJCxNMJvLA54YZv17vanmk%2BFb1cVNoMRfPpUChtmJuPy2lIEWqtLB9xpAb9%2BIGkf4QdbhU7m6DYOS3gxLthQGgvKfn4HOKxSC2HfTEvD9Ce%2F8UuSsTq6Vp2kd1p%2FB5TgApyQRbUtOWS6vJ53SGiHpkmezcKwaODHeRl%2BIC46XfvNtREhOktT5vg4m0EuT65HBcajv87luer5f8M6lCzhi%2Bf6WQnEYXiqpMCAhRT99fK8M3PKb1CfNLyAXRM5ObxCWYA6Ik4JajEIr4r6Gz2vD6ydMLPsXRmko0MMH5%2FABYjEKIw0LOQCWV104ry4u3Orvw5m2Z7RjF1jq3InQsEpN1TtC5tIgZxMRqfiTn5pUpA0uYhDry%2B%2Fgj7QnX3f2wVfL5VlrSjIUi4c3eTh9XYJx%2B33LzVb2IJt6p7yp9eFj1H%2FhU02bMBWXxRvgFylrujnOKMsSzqa0MQAXBBwKsUEUIXGsPriBiBf4LhKj%2F7YoXuQ5U%2Fj8aKW4AefRXFwqfBAUn4MudQXHBb8vbBv3w4GU%2BdT0Bf7zrNia%2BXkS1hKeq8bk7jZA5j3s%2FZIbxLxEM37XtOyuAxwGuCDjjDo0c%2FOBjqkATVv6w7FDrWqi69kFgCLwfSZ8lsyAa9UjN5EpUDwVt19H%2F2hwQEputpzWCtM%2B6sEUAGFbMOJpsyK7nNLStUaKqVij0uXnRipib5JLBcw0wVkfrTi57TrjGV%2F9IrHmAumr1No401mBmeZW2CyKzid%2BAZzyZPBf6DPfZN7mIL2aUtvZaEgviZVnMVvteygM1XPNAORPXYXBJ0onCXtwclML1HOf47g&X-Amz-Signature=3b9dc2ee2b3c71776bd480ecfe983b6adde44b9f3e021efcac659f37161c4b12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSQIAHYM%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T183743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQDgqnr8MzVuSFBsPQaQ6zZyEIodX7QxpR9lljjMA3rEcQIhALY6dKVDIELFiGbhKCLSbhIqkpdW%2B7MbfNF2BBc60gg0KogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxMsBxdzIotlaH3mgkq3AMxXZbPlxSNdWJgMtcxK3gXuPhA4XMCLV0n49ESVFirRBGcKJCxNMJvLA54YZv17vanmk%2BFb1cVNoMRfPpUChtmJuPy2lIEWqtLB9xpAb9%2BIGkf4QdbhU7m6DYOS3gxLthQGgvKfn4HOKxSC2HfTEvD9Ce%2F8UuSsTq6Vp2kd1p%2FB5TgApyQRbUtOWS6vJ53SGiHpkmezcKwaODHeRl%2BIC46XfvNtREhOktT5vg4m0EuT65HBcajv87luer5f8M6lCzhi%2Bf6WQnEYXiqpMCAhRT99fK8M3PKb1CfNLyAXRM5ObxCWYA6Ik4JajEIr4r6Gz2vD6ydMLPsXRmko0MMH5%2FABYjEKIw0LOQCWV104ry4u3Orvw5m2Z7RjF1jq3InQsEpN1TtC5tIgZxMRqfiTn5pUpA0uYhDry%2B%2Fgj7QnX3f2wVfL5VlrSjIUi4c3eTh9XYJx%2B33LzVb2IJt6p7yp9eFj1H%2FhU02bMBWXxRvgFylrujnOKMsSzqa0MQAXBBwKsUEUIXGsPriBiBf4LhKj%2F7YoXuQ5U%2Fj8aKW4AefRXFwqfBAUn4MudQXHBb8vbBv3w4GU%2BdT0Bf7zrNia%2BXkS1hKeq8bk7jZA5j3s%2FZIbxLxEM37XtOyuAxwGuCDjjDo0c%2FOBjqkATVv6w7FDrWqi69kFgCLwfSZ8lsyAa9UjN5EpUDwVt19H%2F2hwQEputpzWCtM%2B6sEUAGFbMOJpsyK7nNLStUaKqVij0uXnRipib5JLBcw0wVkfrTi57TrjGV%2F9IrHmAumr1No401mBmeZW2CyKzid%2BAZzyZPBf6DPfZN7mIL2aUtvZaEgviZVnMVvteygM1XPNAORPXYXBJ0onCXtwclML1HOf47g&X-Amz-Signature=6c64da78553df5e8311f539b2b50e17018949ddebbf01c7c374859cc96bfaa80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662A2A6RSI%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T183734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQCt7vA3KVgeBxRoCHWoi6P39KGEnUNaioiMcJhjOZvJ%2BwIhAKbd%2FLcU9DXWWeJ%2BGn7C44w4BqvB2tYDLmPtyL3lQvgTKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxy5JkiBzV%2FONjgpT8q3AP3%2B7zvangy%2BPZnR3S8DmLny1GFi%2F94Q3cl%2BxxROFQGsp6aGwHPG9zcrBf7%2Fii%2Fs3vT2azgw2vmWOVtVwezzzls7o%2BKKrcSpfAlnDq723%2Fb9zMjGiXlq5vSNF6jIWwzbaSDOx9gwCxEgiKEKUCiqtEGkfG9XWyKJPW4aCjJ%2BAmwq2o629wb985B72yTfGWNrr9%2BmJzAckoJWDkkwXtaTTBWBM9xdEHQapcL%2FX89pZAhm4h2Jn6KyjBOiShxx5dzi327v%2BHm08mqxbfQh8e5fRH%2FyZfLMUY5hEcpJLLtVpQeFrNQ9y8GUddtrTTSKtuqDfWGznO8WGmLTv73xvNQIKdpdc2soKrP21s5tjOut9hpyXK0Vz3iZVZpXh2CjKSsDMhNjqN5EJRS26JTo%2BBGXhmviBLe%2B9RNVaMrOmsQRWLuRoP792%2Bfx%2FB9AI9QkwFHLFR46ekmFFRKWDJma6wAK5Vf3yNPheO963%2FGf0esgZ%2FnrcpBg3lUQETJlHpYzoFYbCzO0RN567P3Ya8RPjmw2t3Qn8ryYxBLiF6kJuy5ptWn0%2BWLYy2c315MgDK3uWX6ZaC11%2BD%2BJ6YTDmElR5HG9%2BdpZ%2FuL971dVBSrzMwCg5rIji8RKdHKzHNCmyZGQTCh0c%2FOBjqkAdOUSvVa080drYHNGdP8Tw0HzGj0Ep3Z1A4nnykt%2FVMzBqYI9BbP5Hq0NHhhIOnk9A9W5sfcT0TaK8SWecfQY99J6Qgzr1HPyp0mRExLDDw9cC83yIHqw23BSlfyBIxVHSr%2BhEOrGO12Ny9cTandwH42sjgCTQwLMd%2FQJxA%2BUv%2FZBLyQT7IfMXFPvBFtyXd3h7np2lonaKy7rG9Cay0k6sTk9FHC&X-Amz-Signature=ce67c627e821f43a702f99d8ba773421836d84d060d0bcdf16cc16233839c957&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662W2GKG2R%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T183746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJGMEQCIF0chAQVP%2FBqUwhUSD78pxYhvHUnIijQinAeeS9a2yx9AiB294%2Fb3ozbRt0%2Fu44Y2n6cyYGWB7ja6s5ZDYZEwY2Z%2FSqIBAjS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvq9t%2Bb3hf1CRFgQeKtwDK8A50fL1sdV%2FhKGzz4%2F3FmA2q%2B6spPb1HT9qaJb%2FabojisF4vPNsFQMqHsBbGNtKs1IqlIzBsUFlaud%2BA8J%2BwS7zbXQHcOwsrdZ%2Fsig7vOS2UUF2CYZ6Q5E71BNASyShm4okkAZLmLYrTCKIdPBgaOFW36PGgGdoIW0%2BMRmplhEln4XYcd749tIAQDGX0Qc2RQoebRwK4Hj6X3ezr9mHieyChUOg38ATxpcSMQQP%2FKeiWymqOPl0OLo1%2FUGj7e29dfCk25G42AZAJ840KtS7Ax8E9G7BA6QOXci3FfR2wm19aaaUfg39Z5AD6AL6188VbE5rCDTLdTsk%2BuMdSL7TjP7rSfWgaQuKxO4PalnlNSYZBA4wsX4FFZebvpKY6UNXF4Gq86AR%2B%2BrK6ruv8SBf9qItFHfDUu2uT0dWrp7eUQ4zPZSOwt2GBKlcaziGvjt8Mmn4a6dgcpU0wa%2BbgS2bRPNd6X7bKN5aoPw38nSrq94VOhsOS9PnvsRvd9OXH6CuTI5Ez%2F2E0CmFZkF3Lh6iwhKEFU3vgq7kyPEhlGIeLfhBc3Os4hjZhVm3lNEtRpdGnkpmF9POUlonSz74YBjWi8ugEXgg8SEl5bgZulbundTKsCnopOVn2l%2FzSa4wrdPPzgY6pgEVNOfKLGzb65oZH7i0%2FMYMsFRPLSmguwsh%2FByB6nStyF%2Fs9QRNy9HNvJTPdedhwGYeFxftsGrUqx%2FQAhBUJX3dcMz6gQ2siT8XEKstiauhcF80UApJ9oaTXjpqREPhrsY1EprLBMbqshgplqSpyPsGnhVzypLH06dfTUtNdhXBUHbBp4bKLnVrkizOvuK%2BjQxFnxbxZMkBOdIswUj3Fcc9S5BkVHIG&X-Amz-Signature=40fc70fb77a1bfebafdfa2f9bd4be0ed903a6fb3e3238d2cb1a09f13bf6455e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662W2GKG2R%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T183746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJGMEQCIF0chAQVP%2FBqUwhUSD78pxYhvHUnIijQinAeeS9a2yx9AiB294%2Fb3ozbRt0%2Fu44Y2n6cyYGWB7ja6s5ZDYZEwY2Z%2FSqIBAjS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvq9t%2Bb3hf1CRFgQeKtwDK8A50fL1sdV%2FhKGzz4%2F3FmA2q%2B6spPb1HT9qaJb%2FabojisF4vPNsFQMqHsBbGNtKs1IqlIzBsUFlaud%2BA8J%2BwS7zbXQHcOwsrdZ%2Fsig7vOS2UUF2CYZ6Q5E71BNASyShm4okkAZLmLYrTCKIdPBgaOFW36PGgGdoIW0%2BMRmplhEln4XYcd749tIAQDGX0Qc2RQoebRwK4Hj6X3ezr9mHieyChUOg38ATxpcSMQQP%2FKeiWymqOPl0OLo1%2FUGj7e29dfCk25G42AZAJ840KtS7Ax8E9G7BA6QOXci3FfR2wm19aaaUfg39Z5AD6AL6188VbE5rCDTLdTsk%2BuMdSL7TjP7rSfWgaQuKxO4PalnlNSYZBA4wsX4FFZebvpKY6UNXF4Gq86AR%2B%2BrK6ruv8SBf9qItFHfDUu2uT0dWrp7eUQ4zPZSOwt2GBKlcaziGvjt8Mmn4a6dgcpU0wa%2BbgS2bRPNd6X7bKN5aoPw38nSrq94VOhsOS9PnvsRvd9OXH6CuTI5Ez%2F2E0CmFZkF3Lh6iwhKEFU3vgq7kyPEhlGIeLfhBc3Os4hjZhVm3lNEtRpdGnkpmF9POUlonSz74YBjWi8ugEXgg8SEl5bgZulbundTKsCnopOVn2l%2FzSa4wrdPPzgY6pgEVNOfKLGzb65oZH7i0%2FMYMsFRPLSmguwsh%2FByB6nStyF%2Fs9QRNy9HNvJTPdedhwGYeFxftsGrUqx%2FQAhBUJX3dcMz6gQ2siT8XEKstiauhcF80UApJ9oaTXjpqREPhrsY1EprLBMbqshgplqSpyPsGnhVzypLH06dfTUtNdhXBUHbBp4bKLnVrkizOvuK%2BjQxFnxbxZMkBOdIswUj3Fcc9S5BkVHIG&X-Amz-Signature=40fc70fb77a1bfebafdfa2f9bd4be0ed903a6fb3e3238d2cb1a09f13bf6455e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466466RD62G%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T183746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJFMEMCIDNlg7GrBwOeLhfHNVbyJ02Am0H7QbT2fSQxoyZGQpcwAh9TgglonLPxn3ThwuySLUxte5IpiRl%2FLUy%2BZbNPui9SKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyv9g8rX%2Bp4nUQFWcgq3APKGnEeDwrhP4HGtm4yWkpJZoRpqNB8JmgouzLl3fuFbUkOLIssBwRYUEQuzXDQVYq%2BfKlBjT97BPuhB5h9NBbPybEiM6cbbpkvRle6mn%2Bsh1h2evg1x6a1ywrIji4e%2Be4tJ6PbDv67uo776aakWN7vsvzoboi7cu2HXCRpmru8oM7qUsOloCF5w%2Bxt0oaMEI%2BqYaLj0k849LXMHpwIE9qDhHk0Si7fmQ7jenCdFsKgsj8CxtEcEdOkQ8AsffKIm75CowdcMFPDA0jAXqiucHS62qv5BGn5NFVCD%2FM5qU%2BJWs27%2BFagCSLXsZc%2FZSDDj2c1U42bjQL0leZ3i07JQ3lXrioURi88hVGUyJo17%2FR28H8YVbg8ZoFKLLDpMoc6MGqXCFTjDSIaJ2upw%2Bs1ovnfZUQp5uAMkeP9T3bhQ6SO5eXq9PP4NHtiAJh0l6%2BSSssDz4NhNBaZweDLkvgUHGmaDY6M41wbwSBp4w4hI4%2FPM3ggmZfh6%2FfDYXCuBaFIdIHVFqCWMzB%2B2q9PDvUfbklPbUdQ4D%2BJX00CDYboHGT8CkdpgPQkj37keJCIAGBAmoAtBw55eToVx5wwui0t03a9t22Hfzi%2FLhg2oEBvEbXO2wCR1cZfRSvZrIKTITDdz8%2FOBjqnAe56FsIijaULqEQMuDlBnjrh%2BA6zM0O6AuhdzqgVrejJKzUcXdQlb26MXpX6iWc55WtX1nhgDZA91GYDnsQLDReo%2BI4ogIQcqKedsiK6w1R24HOkYHzL9duuLTq61mb0JUiGBrA7DFlGNosfoIiRD%2B4M2uT3WiM17TAI10JRBsKi%2BKGz074CPAcTc4JogDRTGhvok0U2ZRusI6krNtEn7l5gbFwIQfeA&X-Amz-Signature=621224af50e3cb654f70880651116cd05628a93323704737beee24d22a876c92&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

