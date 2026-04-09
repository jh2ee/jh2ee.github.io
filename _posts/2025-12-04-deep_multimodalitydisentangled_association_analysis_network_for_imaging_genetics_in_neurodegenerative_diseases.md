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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AVYQLME%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T114136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCICgTM2GkneqeKZQ%2Fmn%2B4127hyXfeXP2Pb4R5Gl%2FN5s8tAiADNaesASQM1yyHEY4RuqgV63uKevJJ5uvVdR4mSOUnFir%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMh9dPDEGi8qCcwQUsKtwDQCblrfvJ8ImPr4YBpftB236C8oA07KzkmL9Xrj8HBf9AZ0OQ5IspO9E6e6dmEJxR8JouyRS%2BS%2Fhlq6gO12qE215F4NUmd3HMcOqMf8kinQryKi4D0wb3FdZp02Cy4zZK5sIh6HTheyn%2BvqVhJDsT%2B%2FkAfdNT9mAhNK0MCAmkgphdZf%2F5%2FTuIXB46sSAsb2htK8ufwM9dWAy9UrXS%2F6dwhqgP7dqaZBiD%2BO%2FQi%2Bmw2jrjoG%2Btw7sXixMP6VHePWDxiWSDP7GF3EXSQHncNCt0DlHg0SeE60g79u%2FLdL%2F%2BcHyx%2BHYFk4IQ6Xtn921h5tovXkZuAuanALf9XN0BmoZBbw%2B5dpPdiMe34rE%2FhVRnhpq%2Bp0yN2uDAiI2%2FOrwYYoxk0bizTgDAf0%2FqaS1A%2F2fH%2FA3k4ZDEFcP%2FLj9tr2vrjnw3cqXs2AiCE5Mzh085Rq8%2Fici0eTIsCXHLckk9scgn19yGfjU1S90udQdSkxqa5U%2F1P%2FaOciWy8i4Ea9%2BBaKBOAuOWBLc8ZPgLFnBGr2EceB4Qg6jrtbWcumLIOD%2FxcY2LKX30IIsocOOXb38hhik7pLLoFzMpVdDFU3uXWZ7qmjmDHil2bW7MR320DnB5Oe9VmRo1iiwqNtSbYTswr4PezgY6pgFw2RSavIF4%2BB4xfuoIcx4HlQALHydftwV6v3eR8YKtbqNYteWj5iekIEqc9KtlrrAASLmR5AzeNJBplDCcACgqwvdhzSjj60HKsWveuHvKN3viKhr1vlaXFlsCObpfTQerRh%2BEOJXv5amjbDUSwc1uJ3DYTBPnQgwG1WVoazH%2B9q0%2BO9pYIWrCELegy3HOkrfo48DlW3LkiAyRDUyR9RLCoceCItnb&X-Amz-Signature=32eb3699f412446c347776aba3fcd99f31a962f4e0146b03ae0c80ac3edfc910&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AVYQLME%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T114136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCICgTM2GkneqeKZQ%2Fmn%2B4127hyXfeXP2Pb4R5Gl%2FN5s8tAiADNaesASQM1yyHEY4RuqgV63uKevJJ5uvVdR4mSOUnFir%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMh9dPDEGi8qCcwQUsKtwDQCblrfvJ8ImPr4YBpftB236C8oA07KzkmL9Xrj8HBf9AZ0OQ5IspO9E6e6dmEJxR8JouyRS%2BS%2Fhlq6gO12qE215F4NUmd3HMcOqMf8kinQryKi4D0wb3FdZp02Cy4zZK5sIh6HTheyn%2BvqVhJDsT%2B%2FkAfdNT9mAhNK0MCAmkgphdZf%2F5%2FTuIXB46sSAsb2htK8ufwM9dWAy9UrXS%2F6dwhqgP7dqaZBiD%2BO%2FQi%2Bmw2jrjoG%2Btw7sXixMP6VHePWDxiWSDP7GF3EXSQHncNCt0DlHg0SeE60g79u%2FLdL%2F%2BcHyx%2BHYFk4IQ6Xtn921h5tovXkZuAuanALf9XN0BmoZBbw%2B5dpPdiMe34rE%2FhVRnhpq%2Bp0yN2uDAiI2%2FOrwYYoxk0bizTgDAf0%2FqaS1A%2F2fH%2FA3k4ZDEFcP%2FLj9tr2vrjnw3cqXs2AiCE5Mzh085Rq8%2Fici0eTIsCXHLckk9scgn19yGfjU1S90udQdSkxqa5U%2F1P%2FaOciWy8i4Ea9%2BBaKBOAuOWBLc8ZPgLFnBGr2EceB4Qg6jrtbWcumLIOD%2FxcY2LKX30IIsocOOXb38hhik7pLLoFzMpVdDFU3uXWZ7qmjmDHil2bW7MR320DnB5Oe9VmRo1iiwqNtSbYTswr4PezgY6pgFw2RSavIF4%2BB4xfuoIcx4HlQALHydftwV6v3eR8YKtbqNYteWj5iekIEqc9KtlrrAASLmR5AzeNJBplDCcACgqwvdhzSjj60HKsWveuHvKN3viKhr1vlaXFlsCObpfTQerRh%2BEOJXv5amjbDUSwc1uJ3DYTBPnQgwG1WVoazH%2B9q0%2BO9pYIWrCELegy3HOkrfo48DlW3LkiAyRDUyR9RLCoceCItnb&X-Amz-Signature=32eb3699f412446c347776aba3fcd99f31a962f4e0146b03ae0c80ac3edfc910&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y76WURTV%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T114136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQDLd3Epl%2Bl0Sx3cnLtkWmbFBV80a8rOBRKFM0CSYXbnVQIgUblYNoBpbLJ4C8n3ErrAAYi1BJ5yL5WwXCYEWrPY4Z4q%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDIUqZo6%2B3Fj3S%2FVdiyrcA%2FmBuZ%2FqHcJLXJBjwO7h7IOCDhqAN5ZHINxW65G2smOr%2FWqG425meWyNnbH6K1l4tXNyfn7n7IB%2BcsrFO3yQnLuW9dLlZE11vdLq87Sx%2Fe6fSXTCKhTSDeYEeCFGPItfyQ%2FhgqkkRlQ2zZdyaOie6N%2FYRJRX%2BERXAJNRJinm7P%2FLcB%2FZ8OorHT%2Bj5GWw9ZLBOscxgZFv0X5FJG0BZ%2FTK7lHita%2BwflygGmg6UpW4Z4J%2Fme2arCgQ2ZpaxsCnK3iJTxQ8MSYbAgFSjXipQNBKNPN0XHBK%2BDsPOh8YICTRceZrPlUw9mqTq4%2FotzwfpzbLM6gO%2FcnmuedN%2FiSsJH%2B7OfX2vrA%2BneC%2F3pjfztu58jqMRxV3qJZsWN4NSw336u6QA79BHdPaSsSiM20WnMoK97sNhUQdJRmvtexQt5VqEVAODio4AXbrv3B8ydVZHWsao8FMdaR2%2B1U%2BQ%2B9TmMp1TFc9vMnDnHmtd1c2dzIDL%2FvBnJ%2Bj4to58h23bxQnQf7uIkYmmGOE75tXbMuqjBYNpvWOW1GsYUwhzK8sXnx20EerRK4ngB541R2n1B2sHPcr%2FUVEZCXToCaLlKdX4N%2BXCdE%2BWLajnkBxwhXDthIEW9AyrY%2Ff1KMigysg6JwzMPX53c4GOqUBrPCsleWWihSbj2X9PiNn3S9xtbbDsjTGG%2BRKAUwzv9hfGeB0PBjb0qrEkDY1MQovzZSJZWtYwCHQP4C0ulunkYVlOfilyHRoRHqlxuXDSHHF9B7bZVHJS8N5lFCfXjnbj58QbsKsAcqpk6EFE2XJBS7apzlV%2FzfQUpAm0F8tQz%2BlrJK5VfaodDRXC2p9MOeOiibZbXhwpWKWojgbu6NJhW%2BNlJPU&X-Amz-Signature=976f57b2fcf60ba6016afd90b501bb46fa5a31028a4161456b9f1589b0cf55da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLIA4YWJ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T114137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQCQfSsR3mLlNEDTcc2ljBgYT1ElwaX6Ub0TQoQORTn0aQIgOaSI52M4i7TK%2Bvjf4QPJcPjDP0d%2FJbVXiaxO1T1VlmAq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDPL5SMudh2%2FcqlxnKircAxhwbdhgHcKRZF%2Bo45JtXvS6TTyPne%2BwkFzJTn1LsJ9Q8D1fhTAHulqpXH2lI20uqvL30YQ%2F5CDs5vUkSdbQcCXhv4EU0SSKZbMG%2BjSek%2FOunKRV1zYAWoUOqXtIRkkWYm3RgvsbXAh0PbUq4xSsfkMnSJveZ5RiEvdrMwJV5odxKlIKx%2BwZBsvyR3fWdCFZE7bHGnwmzcqPwCFYSEki2dZR%2FBgC1uBdmHV8Yh%2FBttrHpfTEOGF4ON3oE5NRrjvFpMpFYp7rlJd1b4qtq2qF64nNfj5NYI7ESxQni7Cce21u%2FGK4HZaz7l%2BfFP6i%2BHemdBgseWUmWEWTt%2FRXUfGb%2FLoJdaa5FoOR%2BUCu3ye9YKSHH4TIwf4GKgyX%2B1FEXpq1bOd%2BdJRBhap9xBU3LO9asGssoROt7UO5et0Xoxu%2BxKAVD1UJlMD%2BIRNOYiJh%2F%2BhlQ7epp0lNBglHRbxzRcqqJedkzZHjlQbt%2Bk2VuU7yEPKm5m0ueM4Jo0sefKhQRFqlpPyAbtxfR4H5mwqRy0v%2FeNf626Q5dIBX8QqAScWIM8M8w%2FK1QCUE%2BvciLoWtk8kX6NGihsOGxquKNoSWdgRBupPDNlyLN8iZq70v37S0jenP42nPXh65x791j7JnMOT43c4GOqUBm5%2FdmQvniMpWynL%2Fqg7MakWZz3s24BlzIFnnDpcKy1dUeTVPsFNqpSAdl9uyV3Ljmmqt6qWIBPNLWOBuzpVNT1tbexvxrgPZ21X5YZ3NMKPW%2BWGijwU2AnT%2B4LCYN4rvG8NF22XZNwP%2FMX6nBJonkaefyhcS%2FsKyepaCFv31%2FdtULTBKJJBtNsg1saVL%2BIDtUpcUfpI%2Fk0pAiEjE9vGD0xhRlTBE&X-Amz-Signature=f27324436378ab82d3ad76ec561db884aa69290e1e8f4b798bd4cf2ccd74454a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLIA4YWJ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T114137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQCQfSsR3mLlNEDTcc2ljBgYT1ElwaX6Ub0TQoQORTn0aQIgOaSI52M4i7TK%2Bvjf4QPJcPjDP0d%2FJbVXiaxO1T1VlmAq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDPL5SMudh2%2FcqlxnKircAxhwbdhgHcKRZF%2Bo45JtXvS6TTyPne%2BwkFzJTn1LsJ9Q8D1fhTAHulqpXH2lI20uqvL30YQ%2F5CDs5vUkSdbQcCXhv4EU0SSKZbMG%2BjSek%2FOunKRV1zYAWoUOqXtIRkkWYm3RgvsbXAh0PbUq4xSsfkMnSJveZ5RiEvdrMwJV5odxKlIKx%2BwZBsvyR3fWdCFZE7bHGnwmzcqPwCFYSEki2dZR%2FBgC1uBdmHV8Yh%2FBttrHpfTEOGF4ON3oE5NRrjvFpMpFYp7rlJd1b4qtq2qF64nNfj5NYI7ESxQni7Cce21u%2FGK4HZaz7l%2BfFP6i%2BHemdBgseWUmWEWTt%2FRXUfGb%2FLoJdaa5FoOR%2BUCu3ye9YKSHH4TIwf4GKgyX%2B1FEXpq1bOd%2BdJRBhap9xBU3LO9asGssoROt7UO5et0Xoxu%2BxKAVD1UJlMD%2BIRNOYiJh%2F%2BhlQ7epp0lNBglHRbxzRcqqJedkzZHjlQbt%2Bk2VuU7yEPKm5m0ueM4Jo0sefKhQRFqlpPyAbtxfR4H5mwqRy0v%2FeNf626Q5dIBX8QqAScWIM8M8w%2FK1QCUE%2BvciLoWtk8kX6NGihsOGxquKNoSWdgRBupPDNlyLN8iZq70v37S0jenP42nPXh65x791j7JnMOT43c4GOqUBm5%2FdmQvniMpWynL%2Fqg7MakWZz3s24BlzIFnnDpcKy1dUeTVPsFNqpSAdl9uyV3Ljmmqt6qWIBPNLWOBuzpVNT1tbexvxrgPZ21X5YZ3NMKPW%2BWGijwU2AnT%2B4LCYN4rvG8NF22XZNwP%2FMX6nBJonkaefyhcS%2FsKyepaCFv31%2FdtULTBKJJBtNsg1saVL%2BIDtUpcUfpI%2Fk0pAiEjE9vGD0xhRlTBE&X-Amz-Signature=b9eaba50969ab17e64e449f12728625bfe2eee0e87a8047de007d9e96110ef04&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNVDIZJ6%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T114138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIAlbz6vnt%2F8YfRU8xoWSzFzcwlfHikF63NB345B1fe95AiAiT1eAGabLMA9UGQawTX8zIweTOvGod3GFq7%2FlzveTeir%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMVMfH56xdLQxt3aOAKtwDuDhvn%2FlUKEI%2BnIyTKTnlQJgTVKj62%2FIuxJukVcyXTTlvIHRRwuw5SkBBwwBS6L5vwNo1d76bjuLYti2p30SFmwCUF7Pfesq6U42j2PoGiiVU4TNk6s%2FCjcVlE2osCyJlqQh%2F7g%2BAO2YMeWFn6A5BMWRRQ8pWGxuhNBkG0d%2BGVX1xz7a9fcRqQhCIzNXFiurHjr9qSTOSYFaFGyq%2Bb7A7anwhu44%2F8OGqA%2F%2Fun3uBBvNRRMkWZuV1myJlA4b%2FzbVvmBLZVZcVXV3Z4JG9xgVBA4Uu5EAAybEoOV3ACG%2Bt0rrKvGqwCmcObZg0SRX1sE7GR5PrqWVVNXgnBKiku4X7VJXoCkfueYlDHCZhHg61asXaCistL1DzbnFtQCSPNe17brxI2pA1u0Kl50MDRhZqHpHdAlSzr2COASgmgVaXbPmk670lti5OLz%2FWX0Mxjc0yKDzsAc77xdXnDpJKVxQ2B2MI1%2BWy61M9%2Fi2Qu7E0LITpocX3kJAZu3auT5HZRXFGm4QAr%2BIOYvwLduTwUMJx%2F%2Fgd6KmPiAQsJ5w3mHcAvp0wDPwr9V9c0VcnA%2BtvMbPB04zQHRLSH15ficZuRitIJOdo6XhRTOgJcebrek64I3xWvbDgCl0dTNrk%2F%2Bcw%2BfjdzgY6pgHQv%2BwqZx12qnYuSiKtO3DoPck3z1rNF8jwO5HO9XAhikMj46F18oTX6FNY0nvhgwJkjQhLrIlib5TMVmyv%2FQlM2HINpPeE3hPKL8EAszPTnkjADmWFlakYlk%2FdUki0A9OXREPqvU5jTCaYxo6CCNtZL9yIwAwsEfiTZLCBmbCXyBJptymZ6Q7QnmJ5kBpUUYdJwbnT9vt2Ip4%2Fr7%2Bu7P3L%2Bwv1DP9t&X-Amz-Signature=e44f0d8be5981490fe56b1c2018ec8322c537edb7714720a4eefef7a282dc510&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNUXFGVD%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T114138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIA7pJc020zxpMSoPN7nS5uZVab5G3DnE%2BuPPBeQcUn9bAiEAqugjKOZrVPPGjajs%2FVQxQ4b7cgWWZKS9ZLR5qEZ3yScq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDCdra4Le5iWbco3chircA08iwjZncW5jHQMcD2URlUGBr8NMiZb6KmLbd5T98r6GDHFfKUg4U8kSTBvBOdz52e0Dl%2FMn%2BRjNtiJLEo5J2e4RhgfTwcg5yKohEz5Qsgh00f%2Fs5KvPPvZYodBvjImaJjfIrs577CfU8PGgXKYkoDQDWSwG2IlfZgseHl5y27WEUnRW9ETRImdCoJVu3DDqwQPeIsTjvvhs%2FnnK%2FvFFRLvNU0PJyXcf8DHIwRpObD0S2qDkoGg6wglCl%2BpGVBpN6Ny%2FD9SbCwg57xCMm4ORHI0NdUQafWy2vFhD5tG1LI6Dp0F9ZbVrZ%2FKCx12pEoZ9t%2BeeT14w0hoQcgbglqiZ0f4pcXMJYqGpGffpvWpnBe4gh7t9X2uYWWX8XyEQki7JdecDFvnbHGY59T3ImUfJsIB2cWQbAoSDkpFY9rYcLmnXKZplUEMDll%2FG0h3M%2B%2BOL7SnoxE48q49Bs%2BiQUjd%2FX0P3LTvqsZKUtXkw6PrABFjgTwldZzTfYwdDK9CcDh4k6Bxbvffeqnsh8Z7YWBqjamx88kE9%2Bj2%2B2Dg6QkYLGv9RAeO68StF5oQliKbitCqTNB0xzTdhWM23i08UbQnaLDeGiLzGetSHfcay%2BhydVSuVAsviw8v56bdOGAP0MLz73c4GOqUBf4Ue4RSm9zd2B1Xyw5N9anEK5yIzEuAJULgAEzJRGgK2vhB5W2FrH3v%2BDqozLAV6Q1y5TO5cbIc9PdZaYxW2wrnoMxpWZVxyqxNEkyvfEdRurX7p1ClBHeRaf1yid05xL7Bnv%2FXvwaf9pBcFl2UzKUDHPPfSohcbVLzlAz9y529jL%2BBewqecCPc1vgSISRAtiEKrSMkzRkFSgchCYjaxirrDq1M6&X-Amz-Signature=234c1405f28e324436aa1245539429a02ae941bbc49c9446af0ca2a0992caaae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWG3KBKC%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T114142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIHRTExSVVNpKr4mJqh7k7lzcdq8iC8P8itdUFdvW4zEuAiA2x5Cp2H6RuFKyUmJXUvNwchLAbvUkOLDRLjIIc8Wczyr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMCEeDbaXZrBVwHZCxKtwDznElAONrzgOhsch%2BoGgo9zhapGTDnvobIQVix%2BGnGjRjoKfg58%2BDrATjPsKuoPk1xu6f80dWcxiFqmwz5krMxm%2BLppOde7MrZ06gszAtuUal4%2FodVCsPJB3Jme1BOqPqyZOwZSnGg%2FpYNEjC88NXSvA10r5veU3U01VqHCa%2B7b2EplYxE3VUBenEVplt4KNTAaw%2F53U7XsDxIuFmUaZdHxLok6A%2F73cbK8LgKncqV9%2FSLuJtqLk%2BiIys%2FLi4m%2FXd3McJfQl%2FDkSp9k44SS0iYJN2WmDJvZ0R2JWW0Yjw%2Bhjy3hpuPz9Z23SpuBKSPvxBjgvrer%2BiS83B0JlXxxzxUmrPimp4faOwcs3vRycLv0IwFSdI11eN903JwQQL7zHqhcTxiMfWCavHL661VqAKUSVhml8PpvezXMeTM4efLM4Eaj9f0Z%2FQ3HoHaQThB3pkzJB3NW1oLfQWavUhC2hQdao%2FGqudLMBCYJv9P1HX%2FNVvLbjudoiCdyfr71LL1AV4ut84iigUuZ4zeeT9zBOcBX8RvTMhiQ5s0MT%2Bb17SbxPd748qZM%2Fz5W5JNn6rKVfaEEMjCG3n33ZSVPBKpt6rBwCAqoj8JQ0g1zOmiNf7ubOQqV%2FLwDQIFGH2gi8wlPjdzgY6pgEm%2B6o8TOGZcgxm4Jc0sCQfAmtyRMsEUWbrLBs8%2Fkh3bcILMiDDZGuntr%2F9JD46V3HPhMijnvx3Lf9OpNdexat7iK98NeIvigzxmeyKD6y%2FnAPckxe4UaB%2BDAYgkL1z43FTc0rzBHdPdyXBcDkAeHcs1zrrknQa8ZFnEIiAO%2Fd7O4HFy36cti%2BODCS3ocbSquhtkaH92wgSKAS0fGzjgfdQ%2FZDITgQu&X-Amz-Signature=01bcddf2f51c60d0ef2faf3090a4f07ca030f978f9f113dbcab1ae9064a65ed9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPBQXAB3%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T114145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIFFFsFYiqG7me1iHN4zLc%2Frsj5Q7BJvfCL5UDMCDK0wfAiEAr%2FybbMFDfyIWnR2XRdxvF3QbyH5AU1PF%2BYUb5tX5tnQq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDINX%2BxQ1LqErks7r2SrcA9vmcDJ9M5S3FWvXWZ4BQJITyo2zaBX0N6X573PwaPg%2F%2BBbQDekw39l2WKiF3WM1vthkfOYo1h5CeZzYgQiOm9iObKXsVT%2BumJj1EUkGyOGm5vzSOhB%2F%2BAwBPplI7wIiWpzxmAVbrPBuIAQPXnhYusOsZn55PAP5a26U4s2BGQHUQTMZhtM%2BD8AP3PfIA0saSwShbH%2FUIdWdY2JJe2IB9IHtEYKGdF%2BWGUrMdnVvEqxlYI3tkc7ZCYWp%2Bq66W8ZlqEu6NdISUEmhQenGIrVeLvyMlGmrXdd1jonpwV5053suJ2Hlgq1dOYwkgAyWW38p3hkKvCqivZhunQ4UDuFnkCPCrBiHQV9XFOYBSd7bN3jtLzbEsQ8ZklbIMt9erh9Eh6uxb2wUuzY%2BgGWaSPHGY5z%2BtuCSjzBdPiYe4HIC7w6hDLC%2FvR1wEr%2BXmDMNr3jLoAVBRmAopywhgDpSisJrmIaPLdgzRgmUHUBqPb2PENNclcGQm%2BhoQwbXjlhvF5m79p%2Buva7n9k7jiH4i17wyO2%2BhSVMWYn73UMjVIgx7xUEwJbVr%2Fawvapf7ZbuMfsn0Mdrbvkfs%2B1AMzJmoiWNC%2BKo6JB8tLp%2FuimoxIgDaJraJm0CGDngKoifPMzKjMNn53c4GOqUBZid6mHJOX%2Fxot7c%2BP8M7wgsbo5767FnI6W8LyA2RUqJNfeKiYtg7XEUleTG6%2BcKl8xU%2F1pSMEd07Rz6jPxWo6%2Fj4hr3XYOdn50GisRUGYVKo1dHf8Dok54C3WKkR8RMt%2FWZ2aJ5P7kgID5cZBrZwjhncyt0FTOCO%2B9mFCwklZSrkGPxZ%2FfkVPZCJ2qYQjzRmBT0inbfZuudlKNW6gzYcFpyEYnKb&X-Amz-Signature=55dffda5c0c77b7fb410acd7c807bee91e8b8e95d620076691a29af3262a79c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPBQXAB3%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T114145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIFFFsFYiqG7me1iHN4zLc%2Frsj5Q7BJvfCL5UDMCDK0wfAiEAr%2FybbMFDfyIWnR2XRdxvF3QbyH5AU1PF%2BYUb5tX5tnQq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDINX%2BxQ1LqErks7r2SrcA9vmcDJ9M5S3FWvXWZ4BQJITyo2zaBX0N6X573PwaPg%2F%2BBbQDekw39l2WKiF3WM1vthkfOYo1h5CeZzYgQiOm9iObKXsVT%2BumJj1EUkGyOGm5vzSOhB%2F%2BAwBPplI7wIiWpzxmAVbrPBuIAQPXnhYusOsZn55PAP5a26U4s2BGQHUQTMZhtM%2BD8AP3PfIA0saSwShbH%2FUIdWdY2JJe2IB9IHtEYKGdF%2BWGUrMdnVvEqxlYI3tkc7ZCYWp%2Bq66W8ZlqEu6NdISUEmhQenGIrVeLvyMlGmrXdd1jonpwV5053suJ2Hlgq1dOYwkgAyWW38p3hkKvCqivZhunQ4UDuFnkCPCrBiHQV9XFOYBSd7bN3jtLzbEsQ8ZklbIMt9erh9Eh6uxb2wUuzY%2BgGWaSPHGY5z%2BtuCSjzBdPiYe4HIC7w6hDLC%2FvR1wEr%2BXmDMNr3jLoAVBRmAopywhgDpSisJrmIaPLdgzRgmUHUBqPb2PENNclcGQm%2BhoQwbXjlhvF5m79p%2Buva7n9k7jiH4i17wyO2%2BhSVMWYn73UMjVIgx7xUEwJbVr%2Fawvapf7ZbuMfsn0Mdrbvkfs%2B1AMzJmoiWNC%2BKo6JB8tLp%2FuimoxIgDaJraJm0CGDngKoifPMzKjMNn53c4GOqUBZid6mHJOX%2Fxot7c%2BP8M7wgsbo5767FnI6W8LyA2RUqJNfeKiYtg7XEUleTG6%2BcKl8xU%2F1pSMEd07Rz6jPxWo6%2Fj4hr3XYOdn50GisRUGYVKo1dHf8Dok54C3WKkR8RMt%2FWZ2aJ5P7kgID5cZBrZwjhncyt0FTOCO%2B9mFCwklZSrkGPxZ%2FfkVPZCJ2qYQjzRmBT0inbfZuudlKNW6gzYcFpyEYnKb&X-Amz-Signature=78c0a0d07067bdccd8ddc5b568cf2c9b5aaa821c858d32bc696acd284c5a1bbb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656M776PU%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T114133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIGO%2FQIdnC7Yjdz8AA4YHc5mshgihSpxu0sSIDM1cyvzCAiEAitsFR%2Fv3A5enRzacVjfQuGKtNHefc%2BLutUmJRpOFNxAq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDOOpp%2FKqhelD95CG4yrcAwHVsg45439zavf8Ylb6JE86rl%2BA6iRXA2epdlQz7UYRn5EMquB5HGA%2B92ysuNXVlOJE3VXJaoRJ85AWdevZGpzxZCf%2BRqKeOoWiZ7d8Gq1CFIwNhRgI%2BBXY0dnTwiQWh5pJadvn1AzFsecbCCcg1eBWv82KZUsVYJnevMFN7a9X%2FGljGTXHKf43m7WYCfMlET%2Bek9A96ThxFuBalXVYJ9erJhYmqGtZGge%2BPN%2Bj78aVfcubBFXk5d0LrXJqt0UaUePL6Pu0nay%2BlWDhwPZfNJerdGMjZv9iicI7XqnUsCH5M85btQb5wnBd7PYnBPhkzUepKIHTj4eGEVQmI6cRwE71wqQuSCLmJz41nYdPIgTN1MnBOM8c5XDM2ziQH2EJTSiPguHGW86rM1akSTsUOhC8jG4hEqYS8C8PKRYNVIRPvT83UbdwOsNXvM%2FYcPHc8EeFGCqH0oiUTBulqOtmrXYhVkfHBjIs30tGtYubaM40UenYABtaHqgoC2T25obCYuVge8c%2FdSbJJskLfox%2BGmUW%2FgKV%2FlDW73PUU3xz4dM7sFQvzN%2Bu5306ArLwWeK4Reexfc5bY3rRex67l1AueYBA8YcFEQfh5TjXkO1agdD4mllRMXvHBaCHIPkGMKr43c4GOqUB1JsN1OPhNi1Mx6uUk%2B0fD9HWUvcXrDlajviGKLYJy%2BDfImuEoKeKjqVMwhwLaKGKFgEp5%2FKMkX7RdXVvHBH7d9U9EtWBMwLVYMAoJ4Fpk53albNARui8m0406JcKuPLd6NxYCiAToUhXHzDdhdS1W1nITlUkX9Bf3O7X6yzHBcdauOoRGMNadKNceQWFDdbUjexUSnljALlIrAZZauV%2FAaAtObUe&X-Amz-Signature=062e09bcd1a4e6cbeb4c682134cdfefb311de7e2fab69a6162efbcf025920445&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YH5OGVL6%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T114146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQC5SSiwbdW1f3s0L2kNoSIvgyCdk05jj1FjJXztxySaRAIgRNM4T9CK7fuwVE2Hgenn3ANKLUWWscwHinbNrL8V95cq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDIa9Jwl6oQhQpG5x7SrcAxpmu8ux%2BkKpZ5ct%2F52JGKAzMex5uqpn9dDNc3MhfhwE3amKiwodUhcoZFCX9%2F1NrX0wcyS2a9CrxbvMbVKokWfl84d4OGknt4TPw5M1sUCDs8Cg%2BcOiszHQXw8NspRmlatGS%2FEzkiKxpxdxzbsrubAe80qhQpnmh1ugMtOxtx1SOsTvOpwpg%2FUjqJmc1Cum9LJT6frWVT63HSHkLxcxk22TeMrC%2FfQZBclDgzMCqOCuuiXWLfhYge10cvlttuC%2BUaKLJ1m%2FxDG4uJSizCX5aMG%2FygqQYf3M6czqLLpP0hMtpzLMVcARs8ctbVGW4jUcp34NRGeL%2FVD2g5hG%2F0oItvk0ttjTUsZ6pC0ZcdJCjmLRiEgDuG%2F6lyf9qlEUctsc6TepihS9eG3CwobrDuN1vsq9UVSMbhaY7ZnXAxVQdaT87Ed%2BeWM%2F0j%2FT7oaJfh7tBtbF2cylftpGwRaU1U6Rd7T6tTAEV%2BnCUeEXv4TwG4q%2FxI7RK7Gf5sDKs%2F9M7PO67XMka%2FJlk3gtMmwXtrcDaoP0JcMc2VoP%2Fb8S4RxqTpNVwUWezA%2FmRDm26ikA%2BfOfGMXOogbI3qeVObcv%2FiZ0qtVGGbaXhKaMDd9g7%2FoWCO5gv9aL6UBRn8RB5%2F6IMKH43c4GOqUBhD5D5cTYl9ZltC3e2jIeygXzH%2BbgP%2BhIkX2Je%2BhnsmMMvIKVCqUg3tBQx8WYsMymaz9HTh8HnMQw%2FFvA9P9f7mJBfFAAbPx1JVZdr3%2BJu7RHzVdQtvughQnorcaJxHbGx7OB9qOFAfSVYu2uEf82%2FUx6lQWeyxIeEgB%2BRbdCOQSDKTvTeOLJ2Qr20%2BDd9GiqsMzUvu8GWZWTA5ijnPCOit7e0lN%2F&X-Amz-Signature=0c911eeb8b138b7048c035a194049db815814c4c74ca43d8ed506c13da099c20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YH5OGVL6%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T114146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQC5SSiwbdW1f3s0L2kNoSIvgyCdk05jj1FjJXztxySaRAIgRNM4T9CK7fuwVE2Hgenn3ANKLUWWscwHinbNrL8V95cq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDIa9Jwl6oQhQpG5x7SrcAxpmu8ux%2BkKpZ5ct%2F52JGKAzMex5uqpn9dDNc3MhfhwE3amKiwodUhcoZFCX9%2F1NrX0wcyS2a9CrxbvMbVKokWfl84d4OGknt4TPw5M1sUCDs8Cg%2BcOiszHQXw8NspRmlatGS%2FEzkiKxpxdxzbsrubAe80qhQpnmh1ugMtOxtx1SOsTvOpwpg%2FUjqJmc1Cum9LJT6frWVT63HSHkLxcxk22TeMrC%2FfQZBclDgzMCqOCuuiXWLfhYge10cvlttuC%2BUaKLJ1m%2FxDG4uJSizCX5aMG%2FygqQYf3M6czqLLpP0hMtpzLMVcARs8ctbVGW4jUcp34NRGeL%2FVD2g5hG%2F0oItvk0ttjTUsZ6pC0ZcdJCjmLRiEgDuG%2F6lyf9qlEUctsc6TepihS9eG3CwobrDuN1vsq9UVSMbhaY7ZnXAxVQdaT87Ed%2BeWM%2F0j%2FT7oaJfh7tBtbF2cylftpGwRaU1U6Rd7T6tTAEV%2BnCUeEXv4TwG4q%2FxI7RK7Gf5sDKs%2F9M7PO67XMka%2FJlk3gtMmwXtrcDaoP0JcMc2VoP%2Fb8S4RxqTpNVwUWezA%2FmRDm26ikA%2BfOfGMXOogbI3qeVObcv%2FiZ0qtVGGbaXhKaMDd9g7%2FoWCO5gv9aL6UBRn8RB5%2F6IMKH43c4GOqUBhD5D5cTYl9ZltC3e2jIeygXzH%2BbgP%2BhIkX2Je%2BhnsmMMvIKVCqUg3tBQx8WYsMymaz9HTh8HnMQw%2FFvA9P9f7mJBfFAAbPx1JVZdr3%2BJu7RHzVdQtvughQnorcaJxHbGx7OB9qOFAfSVYu2uEf82%2FUx6lQWeyxIeEgB%2BRbdCOQSDKTvTeOLJ2Qr20%2BDd9GiqsMzUvu8GWZWTA5ijnPCOit7e0lN%2F&X-Amz-Signature=0c911eeb8b138b7048c035a194049db815814c4c74ca43d8ed506c13da099c20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UM3BP5IT%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T114146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQCOAi4XOTJFtngsdFYoOWFnhHPZ%2FqZpgVQj8X3TPyLtCwIhAOUrmihu%2F9%2B1GTuDIoQgHfHuVqoTg%2F7vbTlsy21Lt17%2BKv8DCBMQABoMNjM3NDIzMTgzODA1Igx%2Ft1bTc6FTj7oENHwq3AO79haJnoqIKWpt0u7jcJSIOQECNe8lr14FXjJVUnQ%2FN6ARnxcXET9pdMsNerLJhpmd7zoql155EEZinXU9eezufZQ0nvSaBxoiCKDXLJgOS1Nv76NDhWfeizsq%2BHnHePZg4I0EU9NzuemIPvsg245gKruXPxYkB14vKOl2bxi3nKAYi9BJcjcv7CmWUvBzTz6FY4VYYG9KbJxV3p5XHRJHJM4cZvMhWY29tIT%2FRmpf4EgZkNYevAczepaDckUlWnTJXTA7sPKcbrQul5T%2BxoUtI4HXQZcH6nfbBmwur0iFR%2FM8qoy12vK7n5lF8BRsix%2FpIjO5zFxlETMjETuJpaWPtJXUqql3loCRxSOWEtw595IAem2EKUPKQdQliU8XNAnBXp7XvO3NZjzq2jjo9jibZ4DVWTB%2FAW2bY498mcvk6e1Ku1dJbI22W11UYUh8SQX5YFm7ANfkkOCh%2BBkhGYKJsSVTmYIFA%2FDYPFS9PxRYfylh0Kx%2FC0AITanSygF1pRGKgiXEt7lBgwwEWMqUnXQ1TBPKXwLh%2Bz60dqh1%2Fpn%2Bv%2B8Fca5s39ktbiwllDOGKhWFXwG0c5xS48sbfhVkCWHUyEtLHliDiKEteM7zyL5Kys%2Bp%2FZgFd63B0cA5OTDI%2BN3OBjqkAVb5cyyOOzgQnrx%2Bx5tL01rIlMO8LamJABzNt%2FtjCtZLfvGAoIctqxV0SpfhrnnHfNrcQBpGScEtVbEJkz4gv88RI47L9T94fH9l%2B1IG%2BWPGXZoh8HDlj0B5Wbv%2B0f3RJotgwB0JmcTaopJNCUMTBVdA%2FesGrCb9PbuBWsbiqKweiOsNVcmo%2FPCqozAA9qywWgM9iDwkJPlY0KNgV3GYpfg4qBJk&X-Amz-Signature=f06dfac04a62f42849d2726ac901e0c9b4f2ff5e7e2bed605d2e1a015f29fdd4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

