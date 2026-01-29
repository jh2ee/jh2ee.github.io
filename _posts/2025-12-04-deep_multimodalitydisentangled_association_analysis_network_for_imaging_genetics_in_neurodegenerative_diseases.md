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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QLYP2TCI%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T231426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDYBi2Q0kAwVYF%2BvaUvKp1tcNmj6nwjsXw%2BOh8TSyNhQQIgQ2TzUTNVyetpEPi%2FyBbG0DZUn36gGQWB2CaWaGQB6NIqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP1j1Q2njVU24A4ijCrcA%2FjogIGr5nVgxXHgIyuTKIN074qnySRI7MOWv38yW67k2TAIUxlW7Qi%2BE5HjrEsHJwhMLr3TQwIv4Iqz9CqTcFaLFBfAr7J4Eb6pqwmjiXA1ZuLwcg62hoTUCfCX4%2FLnq5dKJ0pbgeUm98yPrxRyKH3aaFuUazSnIhGVxRSNaHvIE5gVnrjGSPnpjCVSlq%2BKcAFsOqZBeAF1Y8RmLnNTrCU%2F%2FfrljKzc5gFM%2BQuYLCf5dtUgGfkemn5KSJZLt1XXlw8uMsVCGBk3r8en8VaAMOcik18edqJAFENhAk0SaYX88NHl%2BsslUc0DUPf7gFBWy3JaFwwAMNN6b4EtGGuon5C6SFERLedT1o5JRl7FDLvoxltqqlR4wM5190ZBnsFpI9%2BlIED7KjB%2FolWHYE9KcpFdBAZam9fusAeMAJZlH4koIZY%2FdtLcWibr6l7POuuTU4JB%2BUa5YaA%2Bk4h%2Fc31wRpe97az2BmwtRWHL7uMqSPP5nLMxxcCZpKmk9NxjVeTnntN5%2BjFRaFTVRBkkcRORSCBHCjd2IWzTjjPsTMsTh4A4YjbaHhfDoQP61oLu0fZylRXSoGwPRdaoeKMli4YYovkwVVDS%2BfAda0N5vidNSSTMomOA809umFZghuA7MLLI78sGOqUBH6mzKb3xomoic5%2FOiTQF0FJ2vyGrERvVrNhHFosPWUe%2BriVL8vVkIRQV8L08Rq0KDqKtkF%2B7iD9t1unmacF8W8dDoDolmeENuUjocuZbVZl5za3K0M4ma8e1c%2B0Of%2B%2FXhnu1N2yu8z0TOpvGTzcjvh1HTaEyrMjuRCMG98kGJzEZyfFH4FGs8CtwRHGVHTTLe4K0K7PgOKagYSiJSOUL8dPilUc5&X-Amz-Signature=540671ffe28578c5e2ba280b093f44f2ef4f3429b5c229fb1817f30feab4c98d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QLYP2TCI%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T231426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDYBi2Q0kAwVYF%2BvaUvKp1tcNmj6nwjsXw%2BOh8TSyNhQQIgQ2TzUTNVyetpEPi%2FyBbG0DZUn36gGQWB2CaWaGQB6NIqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP1j1Q2njVU24A4ijCrcA%2FjogIGr5nVgxXHgIyuTKIN074qnySRI7MOWv38yW67k2TAIUxlW7Qi%2BE5HjrEsHJwhMLr3TQwIv4Iqz9CqTcFaLFBfAr7J4Eb6pqwmjiXA1ZuLwcg62hoTUCfCX4%2FLnq5dKJ0pbgeUm98yPrxRyKH3aaFuUazSnIhGVxRSNaHvIE5gVnrjGSPnpjCVSlq%2BKcAFsOqZBeAF1Y8RmLnNTrCU%2F%2FfrljKzc5gFM%2BQuYLCf5dtUgGfkemn5KSJZLt1XXlw8uMsVCGBk3r8en8VaAMOcik18edqJAFENhAk0SaYX88NHl%2BsslUc0DUPf7gFBWy3JaFwwAMNN6b4EtGGuon5C6SFERLedT1o5JRl7FDLvoxltqqlR4wM5190ZBnsFpI9%2BlIED7KjB%2FolWHYE9KcpFdBAZam9fusAeMAJZlH4koIZY%2FdtLcWibr6l7POuuTU4JB%2BUa5YaA%2Bk4h%2Fc31wRpe97az2BmwtRWHL7uMqSPP5nLMxxcCZpKmk9NxjVeTnntN5%2BjFRaFTVRBkkcRORSCBHCjd2IWzTjjPsTMsTh4A4YjbaHhfDoQP61oLu0fZylRXSoGwPRdaoeKMli4YYovkwVVDS%2BfAda0N5vidNSSTMomOA809umFZghuA7MLLI78sGOqUBH6mzKb3xomoic5%2FOiTQF0FJ2vyGrERvVrNhHFosPWUe%2BriVL8vVkIRQV8L08Rq0KDqKtkF%2B7iD9t1unmacF8W8dDoDolmeENuUjocuZbVZl5za3K0M4ma8e1c%2B0Of%2B%2FXhnu1N2yu8z0TOpvGTzcjvh1HTaEyrMjuRCMG98kGJzEZyfFH4FGs8CtwRHGVHTTLe4K0K7PgOKagYSiJSOUL8dPilUc5&X-Amz-Signature=540671ffe28578c5e2ba280b093f44f2ef4f3429b5c229fb1817f30feab4c98d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663L7QILPH%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T231426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDh0A7Bzq4Oiqvyz3NHImSvlivJqbLPyaTVEQQ9MQXeEAIgH3iI84wtDUXSn9I0fpi01hwlRn7LlGrFyDsqdAyfGToqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMbDWngrRrkVH4LpMyrcA%2Fw3vhUj%2FqONPzoH9U5sIaqKUoHMOZ8ctNBXT71PtIhQkmNpjT1G0DlSZpYcp1Xb4jBRpU9NH%2FdRnUuJKR2vMZt3xWIuCjJssb6HoM9ziBlYpIFzqSs%2B%2BXBNHesHhc9LQFDYtlVTyDHEbcY%2BB9uM%2FmP5ECoK%2Bm9TJUSO8z7ZMG%2FH%2BkxzO%2BJ%2FCskPk4ekIBQTugFbajoEIWV4Ba3%2BceTTZ641s4aDugcvg6%2FUmZhNwCDvr0adjOS1BvOjFmXiX0Sd%2FPtQmC4myVuuoEry1ArVjeSAenbD8xYKxANsXWoBIUK3vSJT4h29g%2FAXSnEH418IdKgSgZkwBTdiH1eXEHd9nsjD6DpuhsHilICN7OPpkeWa2cheJQtvHr0YH4iMRKvWitS91ao8X9%2FO66paf%2FPD1YhQnsMmnBk8Yeg3hFT3iqkHMZ0a1QQdD2q%2FzhLGP%2FSeM4sowVd05lEBK3i7uAQaW54v7doSUw%2B35gWLUEj4fSJhVMewrqFJTsBul8YetqX4Q2PMr5ICZd9DFA0JRCwobM45NPF3Yr%2Btw5Pu1eATHEn1CiCAwxOR%2BuMHj%2FRceKJLvpWHRCEKCNv3CB3wKsqtPQrrxfJCvmYojmCMSFklxBnGZDxNyTZeVNHTBYNxMLHI78sGOqUBhcLSb71tq%2FP7V0HDiFO4Nw8FRZz7KsR3J8brB%2B%2FEriVm%2F8PBnXNZWRTMZxEy5uRjy%2FiZENbLbJD5Pb1%2B%2FcEOq45PE%2FwH76UgheHaI3IJylOBt9UcZaehzLvIdGz4AmVDrAXISAUUQgr07R2L4uj0ztZ8d2jxqEO%2Bzjjn7Byl0ZXh1BOEraVnIGBKsHVI%2FADVdSxr0Mk8PTLVnF8rvbQNtYV1lnKD&X-Amz-Signature=44de95b54de3df7b8b640052894cdb71b6942edb69069ead0f0bb40081b3211d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FPWUX4A%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T231428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICwhf2hs8%2FBDa6eb%2BQPxavN%2F8Ye9y0KUsaY%2FdqJieRSbAiA3KPGIf0s5gqLA5LW%2F0x38f2sVeWJusJXt0h8y123x1SqIBAiQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM8w%2B2koVGW6K5pu3mKtwD1bjNqnTTyV70rpZWN%2B8oEmSyi1S206A0bkFU48YAeSo04MRjVlGgqHiJwgENXA%2Fy%2BIekd1%2FlkvMuz3I7WmG%2B0%2Bh39PclWEp3aVIsfRNX2xK9jgN52O5Wy6dpo6p76YrFcuJRX%2BKOTli37fsoUYXJ6Dsm9e5pNKM%2Bzv8%2BFGo5JW553XXpsk3ajwRfb9YJ3q8eAz8WSdmGOGDox6fhGU3DJUvA7xK4AVL%2BdWGff0DvAjuv551zgRS7uo0ahcAX3l%2BLzbu5AFt4XTvve41VyXXU1YdZDg3UILZjGC%2F4Goq%2Fk5n%2F7zZwEIB1AyHf7qML%2FHDkezjuF9kt9%2B%2BGjp%2B%2FyRUUz2ssLxYDJ5SMFF7JoCacFxhK3cFCyrtoerUBFwc9%2F587MVpadZgA227Em34qW730UNcuxs99ZpEb9s4wRoOm8PJrR5UPK6mln%2Bpi8l0ImsQzdY9QuzsKy%2BhjxAubQE1Gi5AJOWBrPaw2drEmdVg0ye%2FcJhWAG8kuh7JmSWF4QoSIQfm%2BFdYkmkysdTnTAUTHmT414ZG6o0iJVLtES1zOwneKXA9Z1qKwpeG1OZWZBitCCsYZT4DbKnkHthj%2FciaX9ZIMWipA65V44ZbskPpgJHdsHvZm0QDnpMEa08kwvs%2FvywY6pgEzGf%2FIr57XwHN2XfbA1toQpL29AUyvlVFN6T7E4EvWFtoDGz%2FWRYZ4afovRFXN7CzCzlR0g9SaOySiA9P7psZ5Jk43jzDEBgFi7VMi0%2B72OdFSeCiy3mGrfNsgykcjn6O0xQ0a0%2F%2BMSX3Ksxd0oBB0huD064jn3gRUGbvlbQyQVYdu3WEyNbx3fhFiRxSviMGx6WviVffAfKWrrn9JRXIc92ZO%2FMiW&X-Amz-Signature=c3926e369e8f8e848faa6d2bb5bf91bb17650265ab7b126e0e925fe314cb814d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FPWUX4A%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T231428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICwhf2hs8%2FBDa6eb%2BQPxavN%2F8Ye9y0KUsaY%2FdqJieRSbAiA3KPGIf0s5gqLA5LW%2F0x38f2sVeWJusJXt0h8y123x1SqIBAiQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM8w%2B2koVGW6K5pu3mKtwD1bjNqnTTyV70rpZWN%2B8oEmSyi1S206A0bkFU48YAeSo04MRjVlGgqHiJwgENXA%2Fy%2BIekd1%2FlkvMuz3I7WmG%2B0%2Bh39PclWEp3aVIsfRNX2xK9jgN52O5Wy6dpo6p76YrFcuJRX%2BKOTli37fsoUYXJ6Dsm9e5pNKM%2Bzv8%2BFGo5JW553XXpsk3ajwRfb9YJ3q8eAz8WSdmGOGDox6fhGU3DJUvA7xK4AVL%2BdWGff0DvAjuv551zgRS7uo0ahcAX3l%2BLzbu5AFt4XTvve41VyXXU1YdZDg3UILZjGC%2F4Goq%2Fk5n%2F7zZwEIB1AyHf7qML%2FHDkezjuF9kt9%2B%2BGjp%2B%2FyRUUz2ssLxYDJ5SMFF7JoCacFxhK3cFCyrtoerUBFwc9%2F587MVpadZgA227Em34qW730UNcuxs99ZpEb9s4wRoOm8PJrR5UPK6mln%2Bpi8l0ImsQzdY9QuzsKy%2BhjxAubQE1Gi5AJOWBrPaw2drEmdVg0ye%2FcJhWAG8kuh7JmSWF4QoSIQfm%2BFdYkmkysdTnTAUTHmT414ZG6o0iJVLtES1zOwneKXA9Z1qKwpeG1OZWZBitCCsYZT4DbKnkHthj%2FciaX9ZIMWipA65V44ZbskPpgJHdsHvZm0QDnpMEa08kwvs%2FvywY6pgEzGf%2FIr57XwHN2XfbA1toQpL29AUyvlVFN6T7E4EvWFtoDGz%2FWRYZ4afovRFXN7CzCzlR0g9SaOySiA9P7psZ5Jk43jzDEBgFi7VMi0%2B72OdFSeCiy3mGrfNsgykcjn6O0xQ0a0%2F%2BMSX3Ksxd0oBB0huD064jn3gRUGbvlbQyQVYdu3WEyNbx3fhFiRxSviMGx6WviVffAfKWrrn9JRXIc92ZO%2FMiW&X-Amz-Signature=524e29829def53eab42055413746c75e69bbf480ff13403f07854a84d08c88e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S26ZSRJY%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T231428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDX38tEfJkpcvEnIJCJENAcBS32qsVIZR%2BJTb6yzwMRYQIgNYzzgcithOAu7O2x0EFbIjf66gKy7gwyyhG5AW2y0HIqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJDxTHrji1SfMJS8dircA6%2FkiMMNxrAdNwTyfdWeIuYK0KHCBCdtIl4F44clHtCzBxCqM16D9i729pyMamyIig8JsuXjibJetdEyfATF%2F9TyBvYcBxYjcpXCQn%2BTe%2BvfGBdlWORgOLLwKufqcUAtGNUyeT98D9x%2FhRCyQyd3X7wGkTU%2BEAHA%2FlX2hre2TyRCmxmizRVqeP4b8Uj7%2BaAXGf3lZy1hsD62XQcrWPPxGjrbgp%2FDwtQE%2BLOLDHuMb2p03Mod4ALsSjt10KjdaUfYmFHaU53Am0YA3pf6zxOcEXvRtujRFmmDOF26ETFaADl%2FgocFQN9roUeXMULXmg3qFZjy2NyHdm%2BP86mgUgPCWden1ioSYSGp4WQh2cigiv9GeqlhJwxyM%2BqlK68R2bhCvGRVKtFB1ZaOkVz1b8ejAQ0%2FFw78cugN8qgsyvbgp8KRZtHEhQFI6qCaEabXXia7SEujwN78bIQFkeZs0Ir5mEb4TfjuR7IQl%2BVpIogE7ChYMXjcovwhc%2BzyOHu3CvtfNjapK0Wq6aL%2FK170lu%2FJmclp0bfgZqLeWWBQLTJ93l6QtCkno6X5LBeWZ2PUUplko21jfyxe1mRytorSYce%2FF5nM7qoEMfJjEsIIC5lpyyKoaflSuAj0V%2BuTgh5RMJbJ78sGOqUBZ6jByBaTOEfj7NPYYjijpXlqqK6tmggJEXoiNckWU5fBSaHu0yYXSi8msVtMrshwwTxFYHUphRzcCePs2rTXf37kSMzGlQiCTQjc87nQTuCCN6BEKboF6Oh6xgmGT4ZuMuMEb5xuh5Yb6giTdrtw5NCzaJq69XGugB9ysKKu7t%2B%2FsDV7HcZeFBZp5S0JizZeACvtaYaVZLIztduGpjFvVnJdDcQf&X-Amz-Signature=dae062ab4e52dc098abc8011d91007c00a75c2a6fe587476aba73e6222f295b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQJRYE5F%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T231429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCO%2FAe3SCNI5mSBB%2BK3iYA2t271xBxW2qoTJan0%2FjVySQIgWvJtVSAlJSYcJ1bLT47DO4b24Hsq6ZE8s9kAZhJouZ8qiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFa5jwd1Xu%2Fxb3kuvyrcA7XI%2F%2F3qgZE%2FSUyU9kexHjdWFSd5z235Xw98Jvhg5YrZjaw54a29iGjAiosmEwbKZ%2FVPMMp%2B1x3HF8cM3Ix%2BzjQAU43lntBsuVLX%2BCxP7BVsBzyXkYxSQHeAxHYYFYPvM2nxvpy0z2Tj7hChjDLiRTZYiBoT5hGBTadRGVHUWeLvHkLvwSbI28SLec943772WmGnHC6MI8feeD62oixobY%2FF%2BNL89NVTbdi8Wy2mPH%2FmSuj5H7lO2YoL85dvq0pT9V9fJjO%2FSMoDk6JVrYv1VKZb2sJPbh4y%2BD02i35bCJBKioA%2Bx1IQ6LCey4n5b3MGIl59dB%2B2CbEXqg8ZyXhKmgHa29fOhoQph2%2BVQLGQdYab0nuOYfENDFWCtmSer638I62yjtg6yEr7Dq6yD2UFMPkaD5asphrKVDpVm12imDcWP6KDaHOqZSskAAnoACBy3tqCdbD%2FeUc9bAMH4W%2FgWcpZ31WGwrXZv9VEtJUKTKSH%2FampUdhLBPUtbLFTtewEzKLyqN%2BC%2BEiIWB9B4rWHoYUhoRtdgA6oJcxFIYJFdHHdxO7UVxZxhhQafmkbFNjSv5z5GURGYyxv4XgCBzdRUEVKwSEdX7gFEGzx9yDXuzoUtc58UptgtnJWOEP8MJbJ78sGOqUBuBPkE%2B%2F722haWhNaZEjuOdU0t45Sk1yQKDleiW2D6kOmyMjFwT%2FB3ndh1c345lHRNbBA97o5G57nB%2BuLDRNfEFhJAwNfEyLjAxyAPZ5NcIKFgeLTJBOfxb8ifUEa%2BXMmp1T1OObG2%2BCV%2BtLWgvb%2FZTL6dcyap3wr8HnVWZfnTP4dfRGlpzy4lbk%2Fj8vflDqBGIphrvq7dMlVgk5tr3tqv1GeiLUi&X-Amz-Signature=6e5013828d1690b53c77b0ee42ce7b86a281b066f9b38c6a8ae968874f296a22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3IK5K4D%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T231433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHEWXfNrd%2FNJay%2FNwMmKjDTQEG5nRq%2BRhT6q1bd43jYSAiEA88eDtn5p1NfSK39DbP%2BiKGOEB1jVke3eWkvRtmEkUfMqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHyY%2BJOyjAQq2GrsgCrcAzQz4PRp9ftlVb0M6LJeDtnSJITlWTIS8L9GIOV3%2Fvv5FsYHgKUBoXcrHxilHlncgU2qhZgF2EacONU51CrM5QKeGVDF3%2F1%2BT5cKNlx8rXY5tESE6HZws0t0rsc1BYLk3RpPvWYWyBFNfbvZV87NAaGS4pXemWibOwxCgKYIIRGUN7B9FMkK8ArYOkJKUGyy6cYYx0b5yPwu0CgGOosqPVn9%2FJ%2BnGIBQru0Ndv7Xk%2BQiAkCCwVv6GdshtWevhnTXzIy0Iyj42TMfx%2FHMFlEh1a4CtzX%2B36n5OwtAVOCgXkm%2F%2Bdh7Wn3IQ%2FsW7xj1V1kV%2ByzbLrXqyIXQt2UrOyfF14gSJakQoyn1dCBYrb68PEiXx9RgBM1XnMXGcsmkHaU8B0IkYsU6oRTVHk%2FjbgPNtxloacpbzBykjX0lfoasZrtDMvVxi7%2BmMdSCuH2mPu%2FnGTXtt5hO1qpkVZJmo8PZ54Httq5iTTFp5C7vbIBncTlm1TVE0VKQ7P6qX00oa24tEhksKbmXtI8sRpQxjas7kKLUbrgBODr9VXVbq6CsM4lf9xyPROk8kx192V5pKvU%2BsXUbe%2BNYW5LzZh9%2BUbjqUk5vH7%2BMjPMU41pSfrbeJaP85Lak%2BFo3GaA0vP3sMJ%2FI78sGOqUBVSoqmoOVO9Cx%2FfVkoxCRlieWMmOClIENsvUjpQbq8G5DdBWqe552FOoHsOubX%2FSuxzaLvePdnQpOEE57HED9%2FzBwlrMDbtkAF%2Bh%2FHnHuIhHUPE1VzqXQBgxriHLmPeP%2Bws1LT2lowm%2Bwgozc4IH%2BLigUYQkkLzxiidwaICk7eua35awV3oGOngOIGcWOZ6V%2FMOSO50rTfpXUFCEKYgA%2BKpHDDOyF&X-Amz-Signature=46cb92e39244d09fd57332fe479687f8a0ca7c41b79bf8cd90b286c10045305c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KYQJE3T%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T231434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDi3pvwEne7xdv5mW%2FOOGPhZVgBglZjNuLhr3XT2HneYwIhALn5q6N9XBT8ZUTVRNOWgeiC2SzSus26ZUrjdDdpYYZvKogECJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzPoq4QJVIZ3PG7LNsq3AOD%2F%2B6nwhbMmzkR1PCZSKwOtRc1emflTgCyBVOh09lLJqWsVwuNeu9v1LDtKF14vYl9v1qgsWRKoys5eeEFNLvrNDiV7PfV1lYB4W1y2B%2FFqy0eE5nqnlHz1H5kagDrQnu9VVVPtakaNK3h%2BLFlO%2BjCeMTcu00L5c%2BXrVNK3b3zol9f9OK9V20QHk0xygGeFN3BM5yUr%2FqaA%2FaxA5Z0kX%2FDsABjnWmYQZp5S2s8DYKlQ%2BXgJV57XzR5PvJRaKzOHzp%2FH2b2YNsPxshU%2B01rEDEhGTaJxfZEkpXmiVjYL52plzrfbErlrXfSjyh%2Bv%2FbVS6vFcHMwfO0gJ6oQjW5ZNaTsT0wivoqyMVWxbtC7yj0BW%2Fon9dySFN%2F2lfQMo2CIeBljPTp3gZCMoxc9x0M1m4f9LcYYLrfprA%2B5qF%2BYEgx6gD8Z6P4MU%2FxrAg9LouXwzVrWkZ634b9coY2wLhWGgmGK9%2BhVORb9JH1H6srCxnJxfRpJxVWjxfcPDq%2BVXnLOdDcQUzCFdEDfqu60%2BSRyjeuh2eEGdaz9ZrdlQ5S9iPVrFUanNtrGs%2BV4AusWIHCoeczHZw%2BOxmlgmW6c%2BrtPBOtLI30456Ry4llRrzE8jUD4gpT8rLaASYIPjErUQDC4yO%2FLBjqkAbO3CUcQylEw4PTIm7zIlzioCMpkR2JIkdRkgEDetyhXWgvmCD%2Bpary%2BE8q50GYaQKVPKGlA1V5YGYC4LytVGO3bnyXMhgXvV4UYs1ZyrbGLWKwnN%2Bl%2BOeB6vRbtm957qdYRCDmJlmtvKs011zmzsLcvr0WqndZ7HWpLeK2h9aIywEffrl2uCWQ%2FOVQ%2BI1yxNM0y5KhEapmOYwU6rVbu2vKmPXGT&X-Amz-Signature=381a78d5cbe1d4d1735dc6a39b025cc111f1f0e9e38488e4ff6e21bcf2ce5808&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KYQJE3T%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T231434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDi3pvwEne7xdv5mW%2FOOGPhZVgBglZjNuLhr3XT2HneYwIhALn5q6N9XBT8ZUTVRNOWgeiC2SzSus26ZUrjdDdpYYZvKogECJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzPoq4QJVIZ3PG7LNsq3AOD%2F%2B6nwhbMmzkR1PCZSKwOtRc1emflTgCyBVOh09lLJqWsVwuNeu9v1LDtKF14vYl9v1qgsWRKoys5eeEFNLvrNDiV7PfV1lYB4W1y2B%2FFqy0eE5nqnlHz1H5kagDrQnu9VVVPtakaNK3h%2BLFlO%2BjCeMTcu00L5c%2BXrVNK3b3zol9f9OK9V20QHk0xygGeFN3BM5yUr%2FqaA%2FaxA5Z0kX%2FDsABjnWmYQZp5S2s8DYKlQ%2BXgJV57XzR5PvJRaKzOHzp%2FH2b2YNsPxshU%2B01rEDEhGTaJxfZEkpXmiVjYL52plzrfbErlrXfSjyh%2Bv%2FbVS6vFcHMwfO0gJ6oQjW5ZNaTsT0wivoqyMVWxbtC7yj0BW%2Fon9dySFN%2F2lfQMo2CIeBljPTp3gZCMoxc9x0M1m4f9LcYYLrfprA%2B5qF%2BYEgx6gD8Z6P4MU%2FxrAg9LouXwzVrWkZ634b9coY2wLhWGgmGK9%2BhVORb9JH1H6srCxnJxfRpJxVWjxfcPDq%2BVXnLOdDcQUzCFdEDfqu60%2BSRyjeuh2eEGdaz9ZrdlQ5S9iPVrFUanNtrGs%2BV4AusWIHCoeczHZw%2BOxmlgmW6c%2BrtPBOtLI30456Ry4llRrzE8jUD4gpT8rLaASYIPjErUQDC4yO%2FLBjqkAbO3CUcQylEw4PTIm7zIlzioCMpkR2JIkdRkgEDetyhXWgvmCD%2Bpary%2BE8q50GYaQKVPKGlA1V5YGYC4LytVGO3bnyXMhgXvV4UYs1ZyrbGLWKwnN%2Bl%2BOeB6vRbtm957qdYRCDmJlmtvKs011zmzsLcvr0WqndZ7HWpLeK2h9aIywEffrl2uCWQ%2FOVQ%2BI1yxNM0y5KhEapmOYwU6rVbu2vKmPXGT&X-Amz-Signature=10c134454ef6a1060d1c89b4843d595da9a692ddbb30b9840d0e8290754e9499&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4FFBWQC%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T231424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2BxJG4mel2DOUIQCwQL4ikmiJFtjyGzSgti3GbVeMJLwIgbqCOvvXtH8QNAfYilqR1bvQTvZ6ZKUDEoay0e1tFJasqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEZnr%2Bivg%2Fa%2Ftv0RTircA7pibrTW7jviFbJU4CZYy67o6%2BKy88Qdp6jRhou0e1MkkgBDvfifLvR3SNsv6kP5EG9RWDYwYCbAn6pkfnnWdfPO4FGwtkLNDS6we2Js5H0ihSNsXOXTg8WKsXthtINrYRa370%2BHXWesaFEbqYUKQIGEBsNFp2dC8xVid0a4HUrvWMFTk4QL%2Bom15frRnVD19s8spqzhdHPtkkY3hgapA%2FjrwMzNsFGvzMFdXQLrJ5q5TTEkhd70B5hJhnucnhyCLWzsPBwRMNLyz9t5kcns1YXb2O3T4aMWWSF603PVIZ1xuNBcetyOdawV%2FmTSC63nw6aTgTq1HM7qTODSlrmGeDskGs%2FNoIabRictK5EEe5U0zE39ycBnCAF7EGDSFpeyR4XX2hOwjrZatGphVN1wfj1mF62qSPqA0pPn6N2FGPhP5dd2uIP03jtCMeCiy4KnDzv6pQ9LYAqi3nX6ozGLbJFPRnAUEKZHJPQmoZ0cz9UiEvOBZwfKCnY%2FzpiXM%2FqUj4V3q8Is7JEHTlhP1KOp8C0nfGsPOJADck6pZjWliYdByOf7An3O1jrn1HHSOQdsv6zSzHpJ2Cpcfa9XpjlyTCQDa9sVdAzvPJ8FhqMnG3Du9E0UciQmNHY1KEPtMNDI78sGOqUBvaIZVOyPDXm95JqyMmiBBxqPG8coKkuVKYd1E5%2B%2FNXeZvv5E5EV4zzP6NZ1ECyLDw8%2BgaG4TqTKAAvhGB0yy%2BQfHJzyL9rbHmlaL33lFriOKC2FdRVnAcknZxPpO4yjnNliRBF%2BLPxpn9eBtqCNlMkfe4jD%2Fe2e6tqnjc1ukynoYtwIiSPd%2B3J6bLSbINfS2b9SoxWJM3kcCnrjcLDvxVef%2FnmGF&X-Amz-Signature=601888f1e41f0386ec72fb5ce3149045c579eee39c2c5dae031c07b04233cb28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WYJMGATY%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T231436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2FBIiuq2apqFUk%2F1ikEDvWYbHPe9NN1dBG9sZcKMQpXgIhAPdnu6hBzmAYFJS%2BilrJFKfM4OjlAxr6cAXNdrgS5d39KogECJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy%2FcKnhbYfsIIMU%2Bg0q3AML%2BnWYLP%2Fz%2FkKFmHIwBk4u7pXss35mOC50fIACQmCV%2Brln1Co2LI%2BBNDILsRmhT9ZHFhK7ZeItJyRHM9RLVPUJmcTD8jSROuJdCO41UAe6%2BW5fORxvtCzc%2Fh7Nr3rZSaZWQ0%2FPTd8vNivd6xut0%2FTchQDNRjK6vyPK7xr4X5Thj0m9IPDCch9%2FcLoLlDWdyGRTcGKXXoIaPNmqSSRbNaDPZkdp4xc4G059H42vHeO5%2BtINnAyN8cllzXjntfzxevuAfFUk4mJQZ%2FHNcqUC4TFlx6mIgopX1gVH9zK0imHHmBDdhK2aIfaI4xeayLp7N%2BluwFaY6mArDVgrarUgjbtI94oHGBTpEGJfnIyN2MPEjpGXu%2Bg4QXKzhr%2BsHGHZM3ijJrBu7EezPXBz31cdIpoGWoNGkwFRN0UYljCvmgw%2FhIbtkbUCMhwdt2HMttzQg5jq%2BQNLsAp7w8AeKKvnyAMayf2C5SvdJxRA1kwYWNucoBX2hRCWpsb6dUAdq76P2vCsxZuIUFw3w%2B4%2Fe%2BBFdWhvYcaFE8L1%2FahqkUCnMbryjGbZo9sqCjKhEjD7y39ikhflHfVioDUH0Ht0aay4We5eCSyoiS4K2CetNhfOuf6OEHAF5L1XK7CT2SpfQzCKyO%2FLBjqkAaBK13GzIVWE4FuNkvLq%2FsBmqRpXGoWU5G%2F1SW81XkI6UVsPxA4iiI4qDLALnN%2FIFDQPZp33q7Mr44Ib4lczcjsv0MW45JYIwtjZF1Hp1uM9L2Edcu2NJUYZyEFKWFzC4gITRYoo2vpuzEd%2FuucpZBxCjGSBI95aA5X44JdqliQxdqvNLybfzReMKxjYLM9RSL%2FS5%2FLoywLcvChKvRgNnNKuAJqA&X-Amz-Signature=2c2d4bb513538a624d4850f341393355035bca038d176c7f11aab4ec55a1d970&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WYJMGATY%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T231436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2FBIiuq2apqFUk%2F1ikEDvWYbHPe9NN1dBG9sZcKMQpXgIhAPdnu6hBzmAYFJS%2BilrJFKfM4OjlAxr6cAXNdrgS5d39KogECJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy%2FcKnhbYfsIIMU%2Bg0q3AML%2BnWYLP%2Fz%2FkKFmHIwBk4u7pXss35mOC50fIACQmCV%2Brln1Co2LI%2BBNDILsRmhT9ZHFhK7ZeItJyRHM9RLVPUJmcTD8jSROuJdCO41UAe6%2BW5fORxvtCzc%2Fh7Nr3rZSaZWQ0%2FPTd8vNivd6xut0%2FTchQDNRjK6vyPK7xr4X5Thj0m9IPDCch9%2FcLoLlDWdyGRTcGKXXoIaPNmqSSRbNaDPZkdp4xc4G059H42vHeO5%2BtINnAyN8cllzXjntfzxevuAfFUk4mJQZ%2FHNcqUC4TFlx6mIgopX1gVH9zK0imHHmBDdhK2aIfaI4xeayLp7N%2BluwFaY6mArDVgrarUgjbtI94oHGBTpEGJfnIyN2MPEjpGXu%2Bg4QXKzhr%2BsHGHZM3ijJrBu7EezPXBz31cdIpoGWoNGkwFRN0UYljCvmgw%2FhIbtkbUCMhwdt2HMttzQg5jq%2BQNLsAp7w8AeKKvnyAMayf2C5SvdJxRA1kwYWNucoBX2hRCWpsb6dUAdq76P2vCsxZuIUFw3w%2B4%2Fe%2BBFdWhvYcaFE8L1%2FahqkUCnMbryjGbZo9sqCjKhEjD7y39ikhflHfVioDUH0Ht0aay4We5eCSyoiS4K2CetNhfOuf6OEHAF5L1XK7CT2SpfQzCKyO%2FLBjqkAaBK13GzIVWE4FuNkvLq%2FsBmqRpXGoWU5G%2F1SW81XkI6UVsPxA4iiI4qDLALnN%2FIFDQPZp33q7Mr44Ib4lczcjsv0MW45JYIwtjZF1Hp1uM9L2Edcu2NJUYZyEFKWFzC4gITRYoo2vpuzEd%2FuucpZBxCjGSBI95aA5X44JdqliQxdqvNLybfzReMKxjYLM9RSL%2FS5%2FLoywLcvChKvRgNnNKuAJqA&X-Amz-Signature=2c2d4bb513538a624d4850f341393355035bca038d176c7f11aab4ec55a1d970&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZ3CEVVU%2F20260129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260129T231436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHUNNhP7jEEeQ77hmInFQESV7aicBQ58MUU5G04OUgnEAiATkOhASoXL%2FeZr4t7COZMLvz%2FZD9ljKgadU5D2ke2BLSqIBAiQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMBr2KjTZ0ACy9u9HcKtwDLHF9Wy9EfRrrElVphSa51r8cNV3ABi9Y6PgWoQKgctDAhfOebK1VPoQZtvHIeMZpr%2FI0uZHfMC%2B68wupBYuK7ZFbrblPK12KM2v5yPlVkcdysXBNP3x%2FDnZoCqty0rOMh%2FQa1OkrJWfzAE4cIgk5qOXaD55ZbND3VBbVb9IJfvNQF8ov4uErmVNHkLGuQlDOEkEzqSWKEXF35VSK%2BQK2MPdD17sSASrADSa%2BT%2FdBgqejq67rTWuvH7k7SQee6p%2BxLFHfZcQvByR3Ytfu9oTVtGT9Nhwhy9C46lfO1x1pMnWPpRHOz9kXY6%2BD3lyDFvkCvALlAzCqJYWyRO4EH4RjtTd4V7xv0Ag5HGux6%2BviVa6nw7TqWRlBpXcHskZBWXyFyBXSpzIoGKg8xDk83Hl9xHIcGNJGNIGQzkurr%2Fn2HUjX5AEBT4pBpkTYrES%2FQucnCbK0ODLvOc0KglQkuLpyPa2Atx09GwbI3UQXF7kCz2YINVjmdPnMCNUglulXZzk0U%2Bir728LGQLLhE705t3zCWmIEAZkipMoKrvyfNab6jBZGUMk6OT7ndTsL%2FaTN1r6JfyrlgOF3pKh6%2BZop1P9jAc4e9XnrKho6TMBccjv4JKESIy%2FbXOjb5oiuoownMjvywY6pgFWh%2FolHwnjTt1tzYtZzZQtibPzKVXwmgsv6Tf7nox0GDVYEuh4r8nrbYumGmo7eORSwFfUdD4uzZyOMIqDd99GO2icaoLJGKAXUJ5JW9J9P5gRL6QpQzXwrHrx84xOeFSxevdes5PijohXL2qHnSwN6TXQ14cb1cjFTVbUuTowovbWtWCu%2FDZLojbMhWZFlSbxE7XqCOqoM5espXQXDTBwc2ADb52J&X-Amz-Signature=ba3ce45df0c21ecd477976bbe56ddb8365c44c7890c1e68cc78ed015c93c2fbb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

