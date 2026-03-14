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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R63WRSLH%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T191748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGE0Qk4c7dfMEafDF7cuMOx9cTxV4n6TEmSmWTIDFlBzAiEAtSRDcToD5tew7Xu1fSLfu6gj9GgfFJ5jIC2iks04J3YqiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHBxcqH3arlBKJ%2BERircA%2FupwukVQVSecJbs9fLS6v%2BCRAQYqvfJJMBZMX%2FIWrHI9UdJFOml%2F9IxnJIalBB0M27s%2BKLeROHVUah9Qu6GeyHCRTrz%2B%2FY5fMz7J2Bf2np6PXM45hA%2BbWU1pMVDEdYxQnPP461%2FHAPuySqrLG4xHPSb4iVy3HbRKc%2BrWYdNIniiA1o5jPy%2BF3eW86eYAUFk%2BZWRwxc%2BCyZPDLirE52Ml%2Be9gQO%2FRTWzI5G0lvUwZ8ew6Hr870QeC5%2FeW9t6M%2BrG%2BXHYEgMAA7f62vtJyWrMmLKQUGQ1oBNoKs08x%2BPrsMEA1x%2FlJGxHk%2FGJOIaP28Ou7yBZULUJNVcMiVJw7T6y%2FJawtNuyMUTTZgdVKD1Yft2%2FxvcNRU0jRQbKu3GpbQk6LAwVsOj1FDMrR2hfTEkXY7w0BJ%2BvSsPWBP7NtSy6P5FQi%2B73zEiGXmdRDgajo5QTPxQeqEyy3vrhksVmkXkvvTOJrTNJWSFAG3kMwFr6%2BYpnTmmJ98q3P8Yc3tTgRmxxet7BM4KFTQNCRdfRu7Z6yY0a%2BqXJ355ySWulwj%2BINkCU7vzkP77z5Q5BUWbXKQhz3vZ%2Fvu8V2jy2oj21HcqyKVbnXOXNjjIfU%2FIWi%2FYO%2B0lbZfmBRTOOKH%2Bp7mlZMLrh1c0GOqUB8dx%2FVPyU6kqYjdP%2BadjgJ77Ex4AWSTncwQpF6Wtd9zWBwV%2BU7ke%2F2k4qecUfdzchZHQSyO86H2klWUKzT3TJBWL%2BGbMcGVoc6uSBaiXsuF%2BrpqsECRbrEEfl8bYUEtV5WN1M0WSZb93FKbR2SIzEm6wSX4EN6xIKZ4EJAlpPM9tg7UtRMceGCYnPU%2BBlzpa58r6cCYjFp5mbXeo667K7vdncvhuZ&X-Amz-Signature=d9576e4fc018e37d9850c53bfea8f666d3a8d03cbc2660c5acea0cac5e453249&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R63WRSLH%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T191748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGE0Qk4c7dfMEafDF7cuMOx9cTxV4n6TEmSmWTIDFlBzAiEAtSRDcToD5tew7Xu1fSLfu6gj9GgfFJ5jIC2iks04J3YqiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHBxcqH3arlBKJ%2BERircA%2FupwukVQVSecJbs9fLS6v%2BCRAQYqvfJJMBZMX%2FIWrHI9UdJFOml%2F9IxnJIalBB0M27s%2BKLeROHVUah9Qu6GeyHCRTrz%2B%2FY5fMz7J2Bf2np6PXM45hA%2BbWU1pMVDEdYxQnPP461%2FHAPuySqrLG4xHPSb4iVy3HbRKc%2BrWYdNIniiA1o5jPy%2BF3eW86eYAUFk%2BZWRwxc%2BCyZPDLirE52Ml%2Be9gQO%2FRTWzI5G0lvUwZ8ew6Hr870QeC5%2FeW9t6M%2BrG%2BXHYEgMAA7f62vtJyWrMmLKQUGQ1oBNoKs08x%2BPrsMEA1x%2FlJGxHk%2FGJOIaP28Ou7yBZULUJNVcMiVJw7T6y%2FJawtNuyMUTTZgdVKD1Yft2%2FxvcNRU0jRQbKu3GpbQk6LAwVsOj1FDMrR2hfTEkXY7w0BJ%2BvSsPWBP7NtSy6P5FQi%2B73zEiGXmdRDgajo5QTPxQeqEyy3vrhksVmkXkvvTOJrTNJWSFAG3kMwFr6%2BYpnTmmJ98q3P8Yc3tTgRmxxet7BM4KFTQNCRdfRu7Z6yY0a%2BqXJ355ySWulwj%2BINkCU7vzkP77z5Q5BUWbXKQhz3vZ%2Fvu8V2jy2oj21HcqyKVbnXOXNjjIfU%2FIWi%2FYO%2B0lbZfmBRTOOKH%2Bp7mlZMLrh1c0GOqUB8dx%2FVPyU6kqYjdP%2BadjgJ77Ex4AWSTncwQpF6Wtd9zWBwV%2BU7ke%2F2k4qecUfdzchZHQSyO86H2klWUKzT3TJBWL%2BGbMcGVoc6uSBaiXsuF%2BrpqsECRbrEEfl8bYUEtV5WN1M0WSZb93FKbR2SIzEm6wSX4EN6xIKZ4EJAlpPM9tg7UtRMceGCYnPU%2BBlzpa58r6cCYjFp5mbXeo667K7vdncvhuZ&X-Amz-Signature=d9576e4fc018e37d9850c53bfea8f666d3a8d03cbc2660c5acea0cac5e453249&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCHQ3XFE%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T191748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDJrVjcAFkYmPQHivJ7Nzf%2FlKei%2BSd4Qo6qW70lkmnNgwIhANL6xWLkFA%2Bjn7Wm2m2lEx68QbBEluTSHZ%2B8g5BvZq85KogECKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyCqsysc4OM6dH%2BbJAq3APFg%2F7vAqoFv%2F6d074%2F2NUA7kMy0sZX%2FxEgA3D43%2BxLcdd9VRMTFOFw0Wcok9oUgRi73xHyhi%2F8LMEicZE07h7j9n33dk484Hux8xW5CELULftbHTTGYIWs3vHJNpOSkDHkstVgHg%2FhOLOKORK8hLePg%2BfJfEEBRRoAtqUjOhhXM8w1JOQQphhce2tmnIVXBm2sV0S5nztcmP24lHFCeIMOtLM%2BMhwqBYTd5GhoT8c5HDO4OhaZtkRVJF4WVAQvwNBGOT7Fx4YYKulpUIJAat0p0neRvXpDXkLHSWVdOPhBkBiSLrNEaiOPQV62ng%2BIzXmt%2Bw4Ll7CkE1tc64ubGWJBlBtEr2dH5dGdv6WbVrT30tiLZddGS5cHivUUBtEgMAKKajQmUdkzjTk9KEdF901Tvg5KsrV71zhCMslM9P8cDXnlykKOVm8zxd%2FusJE1izKInIoUrGPD9pMhLVOxIQtrLX5vXpUXJ6lOgyxHtR1CQrvSgTIRCGCoiHgwM%2FWUhayacNIM%2B0tpPoVxnoWXjoobFwIBwDENaofOlyM5%2BINsDMgoee9zEKs2hnY8jhFDW%2B9xCnim8e0e0cJSI6IyUw5gDrqrGCqentXYvq5QM5GSSySlrVGjjK9o4RnQgTCB4dXNBjqkAQ9Ih01FSKjjYeVZkc%2F7B9j75ILOmmqbxXAvZzljNgJsctvBi%2BVv%2Buz95zq0EBtRjrC9TJxKrO1Fii%2FhTTnmHDd84ieWrtCboA2w0iZkY9fOLXlX13n6g1Lf%2BWbFGUrfJbkDvBnNnE8voCJUiUsliRYhTHGnf70YvKb6zqYq5zQV6nksCNRPEhigZzX348ITmCbsC%2FgPh6dDgxTRT39a0UkMIFap&X-Amz-Signature=4ae00dabd6844729e2b001490496ea55b8341b066eb7c12a8ef8cffcc98f89f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665B6BMALI%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T191749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE%2FiksCUHWdbUIBmege98YqX8GADGfVLWwoYfY4sKmDlAiAWyj%2Bg%2F6vilS9iIKDvMa1vgmKhAdNl5fTgqUR5LTj2MiqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMouqLseIWM%2BDZMObqKtwDK2JwQ4OeTvLAxuDoEishhEGhV%2FBnj3DpmFHlnz0HEkdV4TqjeSOeCAXRPppn9NgvQNdzIZgo5hI%2FFHBpIG%2B9PGJ3J%2BW%2FVA4Vz7FgU%2FM4q0P%2Fow2WWmbWL84XKsbZHNtLOrYrzR5FOOO5WVid9lY6qSjR%2BN4VFdAciGMfgYijZCNcAikf3VtJ9h%2FYdsbqfyp0NxrOf9ErzoWDQuTWbkINTBJ3og5NCj0s5dZE5w1QTxwsn7xjb3G3CnbxlKiwI%2F4Zm1lVCAXpH%2FR1qc95bvjx9eH7K00p%2F5a150wadE2NhhDGK6jOzTrVhq%2FxxB2xXmJg3ZL8WtS26Arzupai7chfumtxPgGq3B2XYIIu7iTO8B0MR%2F8nWzw0bpwrJUuoAwkez4taSUR11pxYDYh5oJZypnKHguwSv9PiUZi1Cs1z63Gkrr0VB7K8FXsay1V3eRx9FS0wYyBujO0rtYxJDdrT3oKhlpgkJbUnHtRr0un3HiLX4rE%2FThaTdoOwX9Y8UyvgNRTmtB%2Fylmr4wreoIrMgPnZ1uOKWYbFHyw%2BW6wiHqgVh%2FUvEX%2BVq3yEg95iLCquM5DRD31h%2BE2eSipMiNaTsO6ccZ5xK9hKfHudnbUPTiGYmZcmiY2FN5anq4Isw7eDVzQY6pgHAT3d122bgTa9PW6pShS5bBnqlXbbL%2B2dPhIcHNMUa4qhRzuV6pNFFd2ZIlB%2BphP7069olVGcVOXBKg%2FXgzQmiqARisq0LZ3GeORyr8koHulfZ92ecLPUPAn3t70yvB3uS%2Byueg5aYSw9swUcoMV8JvZURI7SANc4%2BjzA7QcL%2Bkdq%2BoGRZaKfH%2BtxKw%2Flfge3ieItxokKcao%2FQ5X8Ez1M8ItSbcQ8X&X-Amz-Signature=35a85c40f78f4f028b76632405a88b812ca4c54516a7c192738516b83393a5f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665B6BMALI%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T191749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE%2FiksCUHWdbUIBmege98YqX8GADGfVLWwoYfY4sKmDlAiAWyj%2Bg%2F6vilS9iIKDvMa1vgmKhAdNl5fTgqUR5LTj2MiqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMouqLseIWM%2BDZMObqKtwDK2JwQ4OeTvLAxuDoEishhEGhV%2FBnj3DpmFHlnz0HEkdV4TqjeSOeCAXRPppn9NgvQNdzIZgo5hI%2FFHBpIG%2B9PGJ3J%2BW%2FVA4Vz7FgU%2FM4q0P%2Fow2WWmbWL84XKsbZHNtLOrYrzR5FOOO5WVid9lY6qSjR%2BN4VFdAciGMfgYijZCNcAikf3VtJ9h%2FYdsbqfyp0NxrOf9ErzoWDQuTWbkINTBJ3og5NCj0s5dZE5w1QTxwsn7xjb3G3CnbxlKiwI%2F4Zm1lVCAXpH%2FR1qc95bvjx9eH7K00p%2F5a150wadE2NhhDGK6jOzTrVhq%2FxxB2xXmJg3ZL8WtS26Arzupai7chfumtxPgGq3B2XYIIu7iTO8B0MR%2F8nWzw0bpwrJUuoAwkez4taSUR11pxYDYh5oJZypnKHguwSv9PiUZi1Cs1z63Gkrr0VB7K8FXsay1V3eRx9FS0wYyBujO0rtYxJDdrT3oKhlpgkJbUnHtRr0un3HiLX4rE%2FThaTdoOwX9Y8UyvgNRTmtB%2Fylmr4wreoIrMgPnZ1uOKWYbFHyw%2BW6wiHqgVh%2FUvEX%2BVq3yEg95iLCquM5DRD31h%2BE2eSipMiNaTsO6ccZ5xK9hKfHudnbUPTiGYmZcmiY2FN5anq4Isw7eDVzQY6pgHAT3d122bgTa9PW6pShS5bBnqlXbbL%2B2dPhIcHNMUa4qhRzuV6pNFFd2ZIlB%2BphP7069olVGcVOXBKg%2FXgzQmiqARisq0LZ3GeORyr8koHulfZ92ecLPUPAn3t70yvB3uS%2Byueg5aYSw9swUcoMV8JvZURI7SANc4%2BjzA7QcL%2Bkdq%2BoGRZaKfH%2BtxKw%2Flfge3ieItxokKcao%2FQ5X8Ez1M8ItSbcQ8X&X-Amz-Signature=eb535ce5fa04286ade579e24d3e34772eb7e062a19725f1cf772fa82f5f9e120&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4RFNFUW%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T191752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEtT6IK4MDXkfnybP69VejpqeuXDHK9qKvy%2FTSMa3ZXFAiAhdIk1AnUYgzzogcfhS4p2yDJdQwX9aVUqN%2FP1z5PxTSqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMDkn6tXZYYJpVQmY7KtwDETBiv5nfv6kpu1XTp9zybwZ8LhS388sSzvpN1FEwYgv71jaV3lCoUqo1%2BLKzRhdM4oKYSXuhODogr3Ec74vqUo7JcdEnnZkYVOQ2Z1FmXiPPSgWTRtQfRpV517gl18YICq3ug7McBUWIEiDE%2F9ZmL1t7pYnBLNYvHADvA9ZrAXOgjLmqAM9zAlvCTqIC45%2FXgdM1nyddhiJN9ZL3%2Bh9fBHMF%2BntWgIVliupvIj%2F6d2cfhawAju8sA%2Bx9MbT5rOevjIG5%2FV%2FIbAQeG4uGNyXjquFeJUr5sxnWMbNid%2FjjziZ3MCJzyoeDfEC4gbxKjaXV13jPZE2LmeFhPDCp5p7lyhN7py%2BNFRXmwjYpXKrYpkXtFXNduzhgnpdBLtFS9EEJuQZh21LhLAVJTTG7MgaqrTLc5kgM4fRWv%2FuAb352AGliYtkONW9kEvDDF%2FDJDxdvy13WDax0uGHa2imgEBrSvuJi7G02n74aR%2Fb%2FivRyFba8yI5I%2B4M7s4eFIB0Xc3sHxdZdYVjPt2P7GkCwdYsbW2hl4th1ZcZTybsf9b1PYQ8YtyDfTxY6xis63UuOat9Ob5Z4iWe0k8C2brlXudvQ6pV8UTj66tJWbpYqsdWre0tPXEBT7wZKcnLDhBowreDVzQY6pgEfNmo71opYajk%2FCoGXayz3k%2F4K6mQBWvMV9wtDc3%2B4ur0gb6pMiuIZNVSoNwN4i5C3odnuwnZHgkpixdw%2F8HyOssJUd92iAy4IIXAqN9LBf8eh3FFuUFOAY%2BTqQx3xigAyROrnyQesTnDbov4%2BTyvPNehN5zyfY5mgwWnenLAq4UcVXam7hCrwepCWtX0b1CVPzsRdpHstXf%2FovsT7WekjSwQC9S2H&X-Amz-Signature=ae02b51b4a42f7bbbb16c13c1e0c95bcaaf048fbfc609c8f10cdc7605df63367&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HOHHWLZ%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T191752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHq6PSJKjMXv2l%2B%2BaDg4bC1L5K41vqYGwuOnENqtHaKqAiEA0EoVtCLDXoVz4LyeXgigkxH1znwFC846vPTu6R36KnMqiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIIwRdUDMD%2B7w2d8NircA%2FYqc1BgqjXkw4zO4KEav8D%2Bt2DRE%2FIWgYBld5XWJwUrqaCTvAh9TD1gJad2LEQuC6U%2FW0j0BZ4x%2FP%2F7oXjtizMwq7LelWdBSuoJiPLB70XbXHyfeFREZZ66LRd4n01JNwe0hcSFddNrPkDRMZAg%2F0HJHl%2BO22qmYOzjCschASBYBDRkyTggdvoAq0jDkbdizZ2mL2cPaDpaOsEdw2fEY8Q55Vn0GQJJ08avMuUjqkhXASDhJ%2BPqsD4yDOVm1WYdnuoQEoqaXa9DSeW%2BPpdWFkxxZuHO9VQfF8Awk5XB6RjqH5Qd8cGc0YU5jBaaQJA0m59bUPYvmZx0DMRG%2FcqO1ohjOslPKPps3QZeHsbjd21K%2FIPNwKXhQNx9On17loHF0p3hCpYTvbO5a3Fpj%2B%2F2fjMFLFvlRQzERMB063fQFxO%2BOP3JeRGFiuXVF8eqsuGL9XmmHwtNDoMiUo7v4W0v%2BL4UBE2VG2WMpNMoJKIOo9UydseHR3rRnn2jK7I%2Bjcoi3IXDdQN9cEU9rK1ReSOCVaDa14X%2FDwxC7SawTrhIoq0jX0Qmu9FAGTl7fg%2FV8akES3437HTF6fHsNAJF3zvVb0oGDLL7OQmALZz71lcSt45%2Fp989aQaKoZr1p8cxMO3g1c0GOqUBnqhPSgVatA4qSS10hb3Ilb1t0WmhvztpjASzVwlY6%2F0k3ecFjf1CXGjm%2F%2BLtLSYtx6tvVcoiirrTvJ3lKLo0WE45knJECQixE8QmzA1pFG9PS8cirJ7R4OPMpOFm8Jq%2FrWDaOJIO8fpKJV%2FbXD1ESoQtDkOebnxSoHwIUrC4FU5kmJKVfKWpnd%2F8XzBkCiLsjkxutrfeJG7Joc6YI97F17Ay4rUj&X-Amz-Signature=63f5e08db5db74d96da2a3a8266d4cbbd686c6ce4478c25cc78654ee82ba7753&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZG7QP4R6%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T191753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDR%2BS%2FdYT%2Bt1ou1eMKTurwJY509OD9H%2FVyk7Y9uDslRXAiAR1%2BwZQuslpx4rpUrAX7qZGd8lfHiOPvjqCDofib6mvSqIBAio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMoNFpOeS3UJ21sOl8KtwD5jdWpTCYl9KMMztpXSEntQahqfzCeaXAJVn3RcQu%2FT4DBsU%2B2kgBpjb%2BWcAO5R1VeNqDmiyVCizC3r2QIplvmFK8l73OCXpKHpdwq%2Fg7deOkbmfn2E5S3%2Blc59BV3FsTJkhP4EYLphrCDJOhkFeVXO1GfQ7IQyj5Z9OcNosF8D6su8s2SKD37d1S6op6YBM1%2BipmBXYKH%2FQKe2Omke3iIgv%2BDXs1CS%2BwrnUvWdgfXAgIxk%2BJdew%2FEQ4tB3buwJZEh2N09%2FjkFiLkjzWrV0qX2p01RLk0Ozy%2BAACa6FIYYrDwXGcg2Q4nB0PSQ2cz9lNdzyTOOBLWTxXH5fbHVsTgL%2BLjRdiGOitFg%2BA19Smq1APwFDeZ9fI42ZVFBBa4PjyD7fL5Ac0prMV%2Fz%2FxELxZm8lqCL5Qt6gaFCNarF5X3eiPhLO7wstd5SWytpXOI15A2LHS6yfmYpBpf%2BtHqhvFM46No1oRs6z8a5x4igSS46LHmg2k3V4%2F38NVrQAXG42qBCgs1luJSJ3rZeWc%2BSVISi9CgoN%2BIDHj3A1T81E8VRgIZGhth%2FSSIChj%2BqxL%2BOauN8EZJhBJD2hQZUrbhJZVdelsSzhdX1SQYT68RPS%2BtGLLiGWDrpioS%2FJgnZLIwneLVzQY6pgGeuwtay4SjigErJDAMZFlo%2BQHVq3g83i8OKQRaYbwc2yqa%2FM3oFQn8vLN%2Fu6coF754GeKB3HykxqlzFp6OADgqhxtg9PVIR1UHm8g7LNaMISedUDnUXF1InqByUMjNTKZs%2BIYZL%2Bjix3TjIXOPMliKCy4M57gopkxLtALJEgO19vzaoFJQL6WM7E%2F%2BoDNfpVrFehhaI9PKVN9WwIFv5bfKHhTGGS5d&X-Amz-Signature=86d47d518dfde4fefdcfb1414459c1434cb54246e5901daef3675e8c97c8d7e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BEQXYEF%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T191754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCaVznoHSENJ083bIzdnoiZ433AXYqUgANCJiMLKDXCsQIgQyEeNNR0LojRTOtEQHrQ2CEkF185%2Fb5IsQbWUvzvghQqiAQIqv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPC4m6U89zLctLqe3yrcAyjyQxvOSHmrTlchN68pdRhJNW5vF6zjz0uaPE2ZQzVU64uV88LpCStZjoSNgpQd2KyaX8IWbgIX1kDdwgqyYwiJA3ONjxDWM13Ui%2F9ZW99VxOC41%2B5msNAEkblH4rxonDwph4blppqcASz12bozRZK7eCeQckgotaiv7QtobHsyCP3Ck%2FecyfLFKXmdwIqsHAXYq79sPTre1Wugz5Upe3UzUv1543U%2F9si9zTJvdi1OHCtC%2F7dFHY5UFnk9uXdlIMSix0E73y4soFLXGo%2Bclfq03S2ox8NEekdEIAZnN1MyIdt1JG8L%2FWHnx%2BuzowJCTU7xsnYneGId83uah9%2Fej%2Be4EJS0c6ifxVtK8bqVZpEtlPFNOrueRKfgz3T%2BvSIoQyYPscyUZLu7jBuVkcgUDP1G4fz30GBsiZhqK2V0fPjpoEAoyAi9fqZxIW9GBKhbbDFDSUWAmPONocDbpG5SjNhpJXTrNvWZFnJcCG%2Bb5pMWSYId2P%2FmVVBB%2BTqeXZsuv4PmEB6uZr%2B%2F5IPjTdP0c30EG1wieuXsgCZW8mRphaMg8G1jzLMk0MasfHAR7Wh%2BSUrIU3arpXBFKCLykdpvzW4lbddkme5kFSZb3cMAmPyaQlzOukA%2F2y%2FYKsw5MJKs1s0GOqUBp%2B%2BohRknbDSEO7Ho10OmiGeMqZ7glZKRs4VifulQrU2l5VESqrfS3kWfTHfCQVfxvjwBYDTturWEDK24zcHWZ68yQ5yeFDzNQOEKFZSpGdYWhWQ%2F9ekndgZEB1ghSFO%2BEutKEgwmIu9NpKdIoZQDK5z1ptNx5Hsafbtrm6Xh0LkOkfoO4lSSKi3ZbsPQOlD%2BCjaJXy7nyDr8TZmo4a48z%2FwYnd%2Fp&X-Amz-Signature=c59d3cb5305a0ce48c63bb6675e9ee2d70be947dd0b052a6c16058fd5f40b363&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BEQXYEF%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T191754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCaVznoHSENJ083bIzdnoiZ433AXYqUgANCJiMLKDXCsQIgQyEeNNR0LojRTOtEQHrQ2CEkF185%2Fb5IsQbWUvzvghQqiAQIqv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPC4m6U89zLctLqe3yrcAyjyQxvOSHmrTlchN68pdRhJNW5vF6zjz0uaPE2ZQzVU64uV88LpCStZjoSNgpQd2KyaX8IWbgIX1kDdwgqyYwiJA3ONjxDWM13Ui%2F9ZW99VxOC41%2B5msNAEkblH4rxonDwph4blppqcASz12bozRZK7eCeQckgotaiv7QtobHsyCP3Ck%2FecyfLFKXmdwIqsHAXYq79sPTre1Wugz5Upe3UzUv1543U%2F9si9zTJvdi1OHCtC%2F7dFHY5UFnk9uXdlIMSix0E73y4soFLXGo%2Bclfq03S2ox8NEekdEIAZnN1MyIdt1JG8L%2FWHnx%2BuzowJCTU7xsnYneGId83uah9%2Fej%2Be4EJS0c6ifxVtK8bqVZpEtlPFNOrueRKfgz3T%2BvSIoQyYPscyUZLu7jBuVkcgUDP1G4fz30GBsiZhqK2V0fPjpoEAoyAi9fqZxIW9GBKhbbDFDSUWAmPONocDbpG5SjNhpJXTrNvWZFnJcCG%2Bb5pMWSYId2P%2FmVVBB%2BTqeXZsuv4PmEB6uZr%2B%2F5IPjTdP0c30EG1wieuXsgCZW8mRphaMg8G1jzLMk0MasfHAR7Wh%2BSUrIU3arpXBFKCLykdpvzW4lbddkme5kFSZb3cMAmPyaQlzOukA%2F2y%2FYKsw5MJKs1s0GOqUBp%2B%2BohRknbDSEO7Ho10OmiGeMqZ7glZKRs4VifulQrU2l5VESqrfS3kWfTHfCQVfxvjwBYDTturWEDK24zcHWZ68yQ5yeFDzNQOEKFZSpGdYWhWQ%2F9ekndgZEB1ghSFO%2BEutKEgwmIu9NpKdIoZQDK5z1ptNx5Hsafbtrm6Xh0LkOkfoO4lSSKi3ZbsPQOlD%2BCjaJXy7nyDr8TZmo4a48z%2FwYnd%2Fp&X-Amz-Signature=f87383ec33a105e396fa01c377b38190654fe53abf2f8626881179355b2dc02c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666WQHPQKS%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T191744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCjVrk9YP2XRLwnwp%2By746NxdzxJa9cd662Oha%2BEmXG3AIhANBIdW0qDBoI9cFFWpFY3MBGyfhKVDe3dw9sZoEf%2FC4BKogECKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwhG5z7CaBBG7EK0uIq3AMDQ1KZNxQWzOQh81JAxhYh28wS%2FNrJ3ftjzgLXTwElQOB3KKohrr89QQdCu1vKSZBy6b9PngbJVgpkaeCxeg82YsoFy1gvRGACAs%2FzT8%2Fx742TpBmLHcNQQ8kqSsYpTnZWLfMAHevBQAP3HN8AcwrPbngECJSNS%2Bi8%2FV6YeF0IEkwN6XAnAJ2e5SVrmRCCzyWZKQwrXHv1zklhH6%2F1oFiOgDufNZYLRFTEEmuw9fbBgb3n1mhz2apMqTtfRb32yUErfs73CZTgzhgtYSjWvQWkA8Sxa1HBIpoP8udJeUFFfvA9zmvk%2BZens2RyCWxZ12NfVdK83YFZFu%2B5uQt6YpcoK6JbxxhffBtqxaD3RG%2BthwrDf8SamCk1%2F7OygMRjlA9ciWgnmvIHbysJSm8RWTkTWtB%2FXdrDCbZ%2FVNGgOPEIOdl4g4GzUkaGFbkCPi7uM4W8IInzVJRGFz%2BcFTArIU%2BNeSm31aziRoxqjCHpGvz2rNzXwZEuYm23YLxyPz2JsZrE6tbIulVKPDOcRXrF8PPxYdRq0g%2FbCDsToRvp9FEqAXogdZysQcgbcJGPeRPeQ7m3WsRmBcTDbjlDdrKy7hSSP%2BgAb4DxdTiw5TD65G%2Fwt3O0vPk4ytGISwO5cDCTrNbNBjqkAQYfT5SLTZky1wrp90b7lVYsN6p175LfH%2BjRx%2FTuYu87x8ANgm5AgTkZ7LthZ7Dml2i9761Ynx58uQLQRn5sJ9kRHw2QU8zT0OJTN%2F0x4kk5wYzjhlOIYR0C9%2BIn7mbjYRYQdYr%2FOP8JDrAJR%2BYCEkr3T083VZFPT8ZqPHmwj5n8UNKr6elMBW7zH8KXdoIv6okcqvezdacl8QZ1xOLFmKeFOPqj&X-Amz-Signature=99e36ee0e96b7f54176e2356526395620192ad5c81f8ca934ae5d6ff6899fe6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSBNIOZM%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T191757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH3xogM4xLgK5Img5cjN1TONDbiLHDywEbn8fAO3dZYxAiEAsT73qXZxfe%2BtmnuME7WUTC85HfOt7a7qNeDJAKWQwXwqiAQIqv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPY5pQET8yoTSj6q5CrcA%2BGBbmlW%2Bn%2BpG%2FqloTE2ydg0s8i6uIX4uX2pJV1JiGyMPs%2Bl603MnN9qnVa70eAMlHM8xCpMdiL9kY%2BX%2FDkzuP3O71rIOWc3Y8ZS0TbSMPRVZm6gfZCe%2B%2BV%2FwRw%2BUlEBASvS1NnN4gzjZgCOakEQtbG17jRmMVYFELxgEcDZeBkAr%2FM%2FKcShHeNPQBYjM%2FVfzWFyBTKlTc%2FvXITVvAVy1ZkQ2buC6VQ6bmARwF0SYezHoVyrZ4QD55fLsamgimdLITxhuQxVumZ5tCBVbewkYbC%2BK1gs6wf9CcpFglnB2JHFyD88L1K224HYF6Ec05kHAgLMLX%2FaFysGfnIhyZut1GIRY1LIszxaEfZpqNa0Tm%2FLtmzx%2FSUha33Ih38mFiH%2BEZduFwt1U%2BGrwR6C94QvD9YbJq%2BMY1gsOBwv23eZbi3hL%2Fl%2BYnCc6ZWG5ob7akocSUt4e28iC0QH1lpd8gHmVD1RgtVOIVy6Qx1TCybk5O882eWSgSj6bl4UtRPZ7iL8Fg8mEdSYd1lESg0e3Bnazwnx0TideWULMs169HrfZQoDBNw990OaBXWl%2Fx7XmTN1piJglVK7bsy2ZCgRq6NPHuu0jucIQWOrlJb8QXddhRZIzBnXi%2FCxW0Pndt0MMLeu1s0GOqUBgA7T5VK9p6T1H8QEwZjTqRSQAJYZ0mjsE8NKNbs84Rc43EYCeuPpnmEYgComZg%2FGf%2FmDe4cH%2FytkPzjRWOEgca5DF92J1hr304PVWbNkpPXldWahxClYEy1T3Y5QotgsY5cs%2FLswb%2Fvdj7rZxyB6SFcFoG9NYeSMIoAjkhZW3wr0bgsdDL85%2Fmv3ucUcN2hHdA%2FolrhiW7sQhNXQAaHTUnLzet2C&X-Amz-Signature=d461bde4967ef0b387c6d8e7314337afb8261d4c334a496e9941a53f2348bc5a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSBNIOZM%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T191757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH3xogM4xLgK5Img5cjN1TONDbiLHDywEbn8fAO3dZYxAiEAsT73qXZxfe%2BtmnuME7WUTC85HfOt7a7qNeDJAKWQwXwqiAQIqv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPY5pQET8yoTSj6q5CrcA%2BGBbmlW%2Bn%2BpG%2FqloTE2ydg0s8i6uIX4uX2pJV1JiGyMPs%2Bl603MnN9qnVa70eAMlHM8xCpMdiL9kY%2BX%2FDkzuP3O71rIOWc3Y8ZS0TbSMPRVZm6gfZCe%2B%2BV%2FwRw%2BUlEBASvS1NnN4gzjZgCOakEQtbG17jRmMVYFELxgEcDZeBkAr%2FM%2FKcShHeNPQBYjM%2FVfzWFyBTKlTc%2FvXITVvAVy1ZkQ2buC6VQ6bmARwF0SYezHoVyrZ4QD55fLsamgimdLITxhuQxVumZ5tCBVbewkYbC%2BK1gs6wf9CcpFglnB2JHFyD88L1K224HYF6Ec05kHAgLMLX%2FaFysGfnIhyZut1GIRY1LIszxaEfZpqNa0Tm%2FLtmzx%2FSUha33Ih38mFiH%2BEZduFwt1U%2BGrwR6C94QvD9YbJq%2BMY1gsOBwv23eZbi3hL%2Fl%2BYnCc6ZWG5ob7akocSUt4e28iC0QH1lpd8gHmVD1RgtVOIVy6Qx1TCybk5O882eWSgSj6bl4UtRPZ7iL8Fg8mEdSYd1lESg0e3Bnazwnx0TideWULMs169HrfZQoDBNw990OaBXWl%2Fx7XmTN1piJglVK7bsy2ZCgRq6NPHuu0jucIQWOrlJb8QXddhRZIzBnXi%2FCxW0Pndt0MMLeu1s0GOqUBgA7T5VK9p6T1H8QEwZjTqRSQAJYZ0mjsE8NKNbs84Rc43EYCeuPpnmEYgComZg%2FGf%2FmDe4cH%2FytkPzjRWOEgca5DF92J1hr304PVWbNkpPXldWahxClYEy1T3Y5QotgsY5cs%2FLswb%2Fvdj7rZxyB6SFcFoG9NYeSMIoAjkhZW3wr0bgsdDL85%2Fmv3ucUcN2hHdA%2FolrhiW7sQhNXQAaHTUnLzet2C&X-Amz-Signature=d461bde4967ef0b387c6d8e7314337afb8261d4c334a496e9941a53f2348bc5a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663653R4DC%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T191757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDwZ1WaowJyELN9u39YQaDklNR6GqWU2Vx6B%2FxoT9nReQIhAL6RlsVGrJrIdkdK4hAiF048BiiWx%2F02uNiGYfFjG9ohKogECKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzVLJtYz016F%2Fj2R8wq3AMUneRXP90%2BwyEmdlWKPDHIur8EltGNSDoMWF67uK3JF0cKw1UsSgijBZpQyncDOgh6Uj5giwt3O%2BzXNJ%2FWkeON1YHGRLCdWoqqDLad5YPNRitpSx1N%2FAN2rh38iFV2oat64tmrlZb6GbR3qMN8%2FRz1ykyKamivNCKF6PeS9DNwqnjgxWOm2VG6TQxcLhcKeFjIY%2BaoLGEmHBNBXjbvPKHJYAuxpC5adue8yMrMu%2FL6kUAeRB47YsTRY5TYka9uR5dcekjmZV7zFVbyxC%2BE%2B9ZlabxgFXhr5QiLOxdDsQVjDePK%2FTK54VFQS1lmnt9G8ZvwB40P9bYw%2Fav8CdJrq2Q5R8lpL%2FYXTxAiUUy4B1o8uK8bkdkQTH9piQmOwlyPbxAML8WX3h1tuY7H8ZmHa2anEJRkyEN02qazVVpvvP6GAarLb7Sjz%2FG0scD9J1Tnm56hWbSor7Ay9i1ZsuIM%2F7WScwu9ks4%2BpaXqYTfZ%2Ff0xGLZraFksDvDz76nEA6I0k8F2Fu45JNaSzijQwSkbfvaudmf9634SzTUxfrTIM%2FZLB9NMOOTERS%2F06wtGgZ2s93yPvoIT%2BR6PnRWATqJ1UEiLZePwB0mgvadyZnEGyHU4pLfc72nbpAf4V11XGjCn1NbNBjqkAeF1qKtKTXmJnC44aDQ9MCzmgQWnMx36aHEU0lTGh5ZoRKbhtiw4jjj2w0UkweCadGMzvz95h9O96Awh1F49dcPLTmWedOp6jrQGM7vdvlPdGWSlDOls6dHT8cf2wWOUeI%2F3RB82lGfNxoDCwv1juY4WH6YSiPMREGmOncPai3VTS5zA64GJGwl9%2FRQD7Y2x4qatWwb7r%2F92zX85xfGNJf%2BZHibs&X-Amz-Signature=6898aa9f44ead1e1dcd3956b1a1899690407b034f9842033e27d8ccb660bbf79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

