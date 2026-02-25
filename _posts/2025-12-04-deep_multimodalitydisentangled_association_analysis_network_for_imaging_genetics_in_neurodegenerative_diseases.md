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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SAKVSQXI%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T221757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIDbIoZ87kVuJTNh8xcYN04gIw1mK%2FqM835zlcUf4GmUPAiB%2BlACTlWCV9rPIEeeyKYyRauHF87%2FThpiEtwGN3fH7cyr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMEQ55hBg8gGE0%2BxzHKtwDfR7oqtGGSxRL0IOj3SB9sfzDL36lO0v68Da0QkIt12kneRyTe65FRb8NJPF1Nb8GOa0IBXJk8pAqjy%2BW4bC1PbqE2Pq2Ex2RSjjdzwRbWWWO0KVbBwxZi4%2BwmuC97QA3nhahV7Hf3fhsTsvvIsPjr%2F3lqVgRUEQLGRCJkJtlH7emHb5yWXqAZedzkeZ8RGxfnmBi0IlDwqOLT9vQP4SBWXVpEcgPdE3qdDFjg6aVhQD%2F6CwVKqZaFCA%2BKC2tfgVHtE5O3qYSnvT5ndRjBVRArS5fs3AK7xut9%2BhOVcEGVBSYUSV%2BkR3OJdKbXtgGrv1ngKkqlnq2bulcKjFzhPvG0U8rqR4IS7nFdpaW9OotbeJ2uZ6Vdqycn%2BEA5Ix8TS8nPcdrmGYH9wl2I%2FqTCRer3wcYlA8wa7W1d4mURUUvSoCoeFfkQ5v%2BmZvtDSrwbC%2BOdXf17uj7leEe6cnmJOmlbLKqj5LTB1mI8vvdfjTXYdSXqTE%2Fhg5Zrk1PyhIHW9L1VYPGgK8dDc%2FzSFJ1MLPCYFDQdynu57rotitQOvE27WlXdtCaGUbhdbEtGtRG9vJz3hFxcV%2Fpesx0DkPjVNovQbZmgqZpN3DEvlpfVnF3UUomilzzfF0IrO8V1B8w4Nv9zAY6pgGlefG0kvByy22eCVF3%2BXaPwO5w4woeBkq76NW4xHIexh8RbO90WM0jx9y6TwkIJ7qg%2BZRrsh1AXmwleiA6axCkJs2V1wHqrB6D0RpicGuMLSs5jXLC2W2d1hQ7YOg6Es4keG6vkqHBRmUQ%2Bh6rV%2BE1D3GTJgLHl6VPupoNO2jFIIJLyFNuSNRe8BGEyKLMGP0dp6jjpOsPRTPcZo07JsiZMu7rU4ka&X-Amz-Signature=6f1106f9634b11c0ee8e82cf1a4ecd874a99486d559617d41a5718a7bf6c77f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SAKVSQXI%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T221757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIDbIoZ87kVuJTNh8xcYN04gIw1mK%2FqM835zlcUf4GmUPAiB%2BlACTlWCV9rPIEeeyKYyRauHF87%2FThpiEtwGN3fH7cyr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMEQ55hBg8gGE0%2BxzHKtwDfR7oqtGGSxRL0IOj3SB9sfzDL36lO0v68Da0QkIt12kneRyTe65FRb8NJPF1Nb8GOa0IBXJk8pAqjy%2BW4bC1PbqE2Pq2Ex2RSjjdzwRbWWWO0KVbBwxZi4%2BwmuC97QA3nhahV7Hf3fhsTsvvIsPjr%2F3lqVgRUEQLGRCJkJtlH7emHb5yWXqAZedzkeZ8RGxfnmBi0IlDwqOLT9vQP4SBWXVpEcgPdE3qdDFjg6aVhQD%2F6CwVKqZaFCA%2BKC2tfgVHtE5O3qYSnvT5ndRjBVRArS5fs3AK7xut9%2BhOVcEGVBSYUSV%2BkR3OJdKbXtgGrv1ngKkqlnq2bulcKjFzhPvG0U8rqR4IS7nFdpaW9OotbeJ2uZ6Vdqycn%2BEA5Ix8TS8nPcdrmGYH9wl2I%2FqTCRer3wcYlA8wa7W1d4mURUUvSoCoeFfkQ5v%2BmZvtDSrwbC%2BOdXf17uj7leEe6cnmJOmlbLKqj5LTB1mI8vvdfjTXYdSXqTE%2Fhg5Zrk1PyhIHW9L1VYPGgK8dDc%2FzSFJ1MLPCYFDQdynu57rotitQOvE27WlXdtCaGUbhdbEtGtRG9vJz3hFxcV%2Fpesx0DkPjVNovQbZmgqZpN3DEvlpfVnF3UUomilzzfF0IrO8V1B8w4Nv9zAY6pgGlefG0kvByy22eCVF3%2BXaPwO5w4woeBkq76NW4xHIexh8RbO90WM0jx9y6TwkIJ7qg%2BZRrsh1AXmwleiA6axCkJs2V1wHqrB6D0RpicGuMLSs5jXLC2W2d1hQ7YOg6Es4keG6vkqHBRmUQ%2Bh6rV%2BE1D3GTJgLHl6VPupoNO2jFIIJLyFNuSNRe8BGEyKLMGP0dp6jjpOsPRTPcZo07JsiZMu7rU4ka&X-Amz-Signature=6f1106f9634b11c0ee8e82cf1a4ecd874a99486d559617d41a5718a7bf6c77f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WO3IXLV%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T221758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQDiVqb4Ec7G10lmsuQbidTR%2BRVfC3u5GyJ0GxNDAr6vtQIgAauQhI%2FUhyqACN5k1Lj6QrvlvldJCRXMzvDae4cYO5gq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDPxPEWB2q%2BqbByMO%2ByrcA8yZHqk6PTmnDuFrRyT%2FGdhKC%2FePwFIwHe5Gpr1f7rK89Dhn78reC3LHubVlp5hUEXEPwDVh1mpxrJ6R4C2RVtEzR00zgeBMqcWSqJB3Hb99L1E7TUeS9Xnw7cup7MnQCoJ1%2BW4LjIUO3a7DYDPBpK4rP35%2BvwdsB0sfc0h9K%2BLr1vbAVCuGovEiS3OK5StYyQYfgpE08yDSiHYKekOviRhfoDkWEpmmBW3w5vMebYbjc9Jq0d%2FdLn%2FTShP4T4M66Rs%2BBTxnA3DCKY8FctDfTirRXf%2FUbE77DWya%2BgL28mtpOypHvIrrKNnofY6Fo%2BytRvN1vaKQ%2BfSCCsyS6ClEB6pid14iMu4L2e7XiSzm0S0a8CYYxEkQQxAV9xtHEmtyn9kPWES%2BDcCizhb9MaF%2FdG4eiUajATd3BZkJrc4nl%2B30PhUdWSMXhQFcjTYr%2FqvAGz08fob4%2FYrvE1wXWWB2wcG9FNbsAb%2BeVs1QJgcs2JU8S6tmQ1bPIdI%2BYeqTBwZzOwNPjdw7Cb27SSESGclUx%2F8qbDbIftuqLH5Hca4Q215LSYYE5DGso5tnyLh0HKinmx5m54ARYRW3s1oob8gGlPgBjDTm3j8vCS%2FUDePrvwhoqh%2FemX7DJnE6%2BWrkMPPa%2FcwGOqUBDpTalYGbLlHu0w8aC3GnshsvnxrEAC6PsrN4YXrYUoDygSxO51qXuO49JDfGrp2CnXkr3Vnc%2B1UNwEepLbD5yP9XZAeZpdzRou%2BjCged7p3AFEpK9j6ZINAcVy6CXJ6qPwxUgD8SAu%2FvzKzM43qozkyu2atZaoyqxe%2FXzEL5%2FBCaVhBtCVuj%2BXO%2Ff7mYdyPK%2BZbvNu3zeSEQf%2Bzyo%2Bn2SvL48VAW&X-Amz-Signature=602a4172a654826e123aa1f61dd595a340d04f125ca3216b9450e1d2e76a9243&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UG2RVO7M%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T221801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIDmBNVyrs3Mj0iEbyr9G8a2pzeQDEhUnbt1Skk1viNkGAiAoaW%2FOiiU6I61DUsB3RfOPQXzcpuJBLIcXD2n29KsoWir%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMqZus2r5uTcjDSPvtKtwDsctplLEx6AX1wyqpBAms6RT8G04Ae%2B37wolt8Hw4XOMxH1A0lraKQXez5LDJqqeTF1%2BpyVQL5yLUOH1bY%2BPtwerClJq7BcY9Q%2BDfy89p1o2oxR5bYsbW1URppjAXO8np%2Br8cArKiDATtX04LuCk7ckxn4gSRbZAvKEVJ28uYWmuySv4OydnBwFbiKYI87ubtnPiO0hiUHOa6ELk0EzEHIx53OyltANTYPH2NehODJzwq5%2B7s1Kk1dwSU25DCBoQutRCUrOyiYUriLsTDVMK17UPZOerqVo9LBbY%2Fk3INJKwnn3qkqklkvwtLTpXDMLeLwB4%2FUsb6nDnL34I4TToctlKs9sKZ4ksu3GOnR8VK8ltaOWN%2Bdi8sHmzPGyp5%2BAHDHND8vHBKkLORqe6X7zf%2FxMq%2BPHHmgyR6F4j%2Fq53aJV6NQm6JkxI8xyEO3%2Bx2%2Fym1XHnuMpUgxE%2FGOyvan4Hwu04VliEyIgNurc7hKPo9L2A%2FRX9K6EgdxJEmqjc%2Fl901xqXgDXOQTJvNgCuTbK%2FNxzE1041uqAzMmcXHyjyXDoFrPyXw8mvbKtYSf%2B3GeDlbJsMlyJuE0adD4ShZDNvtDUH2q938WuAnk3CoPpflywLOEzcPzOuMq61B%2F5Uwptv9zAY6pgGGAGfbRRapxkQTBijzYNiUT1ziXAlst7VDaADo1bDSMcSe4sxje3%2FmS6otMjk1NWVT1piYSZ7OuhJ%2BWoA%2B%2FUn5p0tHHGiejoFl6ZIDBE7xg%2Fcf7ep04gkRt1Vmt%2BoF1pn9NjB%2FiDY07xyWMer39GOMl65YfYqevIk1rZKYLOSpUHi3qQgc1WuI2aSLkyGlGOhehBaebRO1ao5Gtim117kBZOYQfWUy&X-Amz-Signature=a34f008d3b485f55362b33e1b928f567dfa827913143dab8a3df5cd2c122b672&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UG2RVO7M%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T221801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIDmBNVyrs3Mj0iEbyr9G8a2pzeQDEhUnbt1Skk1viNkGAiAoaW%2FOiiU6I61DUsB3RfOPQXzcpuJBLIcXD2n29KsoWir%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMqZus2r5uTcjDSPvtKtwDsctplLEx6AX1wyqpBAms6RT8G04Ae%2B37wolt8Hw4XOMxH1A0lraKQXez5LDJqqeTF1%2BpyVQL5yLUOH1bY%2BPtwerClJq7BcY9Q%2BDfy89p1o2oxR5bYsbW1URppjAXO8np%2Br8cArKiDATtX04LuCk7ckxn4gSRbZAvKEVJ28uYWmuySv4OydnBwFbiKYI87ubtnPiO0hiUHOa6ELk0EzEHIx53OyltANTYPH2NehODJzwq5%2B7s1Kk1dwSU25DCBoQutRCUrOyiYUriLsTDVMK17UPZOerqVo9LBbY%2Fk3INJKwnn3qkqklkvwtLTpXDMLeLwB4%2FUsb6nDnL34I4TToctlKs9sKZ4ksu3GOnR8VK8ltaOWN%2Bdi8sHmzPGyp5%2BAHDHND8vHBKkLORqe6X7zf%2FxMq%2BPHHmgyR6F4j%2Fq53aJV6NQm6JkxI8xyEO3%2Bx2%2Fym1XHnuMpUgxE%2FGOyvan4Hwu04VliEyIgNurc7hKPo9L2A%2FRX9K6EgdxJEmqjc%2Fl901xqXgDXOQTJvNgCuTbK%2FNxzE1041uqAzMmcXHyjyXDoFrPyXw8mvbKtYSf%2B3GeDlbJsMlyJuE0adD4ShZDNvtDUH2q938WuAnk3CoPpflywLOEzcPzOuMq61B%2F5Uwptv9zAY6pgGGAGfbRRapxkQTBijzYNiUT1ziXAlst7VDaADo1bDSMcSe4sxje3%2FmS6otMjk1NWVT1piYSZ7OuhJ%2BWoA%2B%2FUn5p0tHHGiejoFl6ZIDBE7xg%2Fcf7ep04gkRt1Vmt%2BoF1pn9NjB%2FiDY07xyWMer39GOMl65YfYqevIk1rZKYLOSpUHi3qQgc1WuI2aSLkyGlGOhehBaebRO1ao5Gtim117kBZOYQfWUy&X-Amz-Signature=7a08bfc2d3a50ce51a5f1dc650152e6a2814cf2ad19fb6fb90af96702d7bd7df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2SX5SZ3%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T221801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQC4O%2BdcN6iugA7z%2F0GftYpAQW%2FNt8IjrPBuDKb49Dg0hAIhAOkALX2b7VeSRBdXrOwlbzZT1IPLrZRgMDQsISlYr3YPKv8DCBcQABoMNjM3NDIzMTgzODA1Igxa45GyzP9mPFPlLCYq3AOA46Tb0CrnwMr4kogX4Deoelv2zMzJlEVvffXt0eyA8H8u6fKtHNTy9tycLB8YoeIvL%2FGuItKIflmtqKHOH0dvSY3LhK6SqKn9jm%2FgRcLiB0Yj07pMjhqsiV3kgofIefJMUisklJ5vF80WyoiboIW0LAetkcp9gj1a8440ZpBL5EHob1gbGU%2BZHYVTiWX3NB%2Fq3%2BiPSbudpSDmGezfomQCV%2B85Ffbz6RAteUD5HLJJP1GDSly9hTbTvmJC8fd3t9s7GoEcXpHehgtNMP7U6vHqPzQd7GjvLWCIykUsPHc4NnCT9CLHGotcDFn9VCASKE86UjgI6OwTDjOW2WfQ3VYOQXWlKDRT9zQJBMlcbI0FPNrXrldOeDBJg89cgPOvJheeFzw9m2zmAM1grbUZh3lXeMYms0lvoh0fXs2ZPvBgL2Ey1ukduo4oJa07QKGHHvM4CCvVda53ZzQGa%2FuKKZb9%2FYyOecwxxPQHm0O200zDwZT%2BNoD5vp32niigmNyXEO0068EyCO3X63%2BQHMai6PFpveu8DyqQCyolFYuXKACiugMnKMhRICN3tKRI6kUEKYDPw3INK%2FNTFCttLEgGRCUcK1wKbBY%2B%2BcDMKqIgRJR9km5OtkJF8qk0iCqN4zDi2%2F3MBjqkATTn90C8x1Rz0%2B7Mnmp7QFap18JXpzd7uIqNK2ur2JaTUuDHDzDZ5OyOnx8%2BPx%2BUZDdP5r114oZeTb%2BPAhQWyS9zu16EXkxVsRmhef8YsCG1MUKz0npTo3JFMC8tIPhYDJ8Gp8Nzxz6r%2BDORxCjBa5aG%2FtLFwBcpvifHen3BTXfukkJ9EV7ps7aoNw3VWQrVWOvN80Omxh5Lhzife%2BaEMIdmkmn6&X-Amz-Signature=edc1305733fc99bb9aaa622b1361b2417f114e274e2b6fb2c2cee01b51859fa8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKOAXEX7%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T221802Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIFvM0Xcxb4SfW%2BiVgnf551ADXI8BC6DtIN0r%2FDrp6xsUAiAmaWlCFAkBckfFA6R30SiSv%2F%2BStP489vldSGK8uZakJir%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMDruFwKK3gM0tFcH7KtwDzk2hA8%2FAWMi4aw2byBOb5Q4%2FBg8keHNodeILumud70WQIY6iGXksEjGRe2PRfINur71Ag3H0jyXmhjWWpK5X5aLVmi6B9MfhOe%2F8VdmEhQpOuOGT1xnpUB9Y7pGkmcRsAzt2DOmdPyfnZcVzGWVG%2Fponn35wrLm2Uwbv44qhrPyN6kvaJWLeDZPw2v3MdNAMcRbaU2yp%2Fr72g2TJBRQZuSuSbrRdE18JUYuq1wvrpdi8yhqPNY4DaN2XKlis7fhPeoCWjdzKDrDRW5kkiYt76cniAiNzQjR0CIvpzCpKDZPMPwwGd7HPbkx9AwVB2kP5%2BNH8v8A6HxEuycR6hnKJJGfn3Se6Xd8mZM8CaG10TyUL%2B%2BRl2x%2F2s2bTTBcrSOxf9vZnXzeOkSNi0YOPflDO9nE2Gg0F9Wj792l9JnjZq2Oc%2Bm%2BqFPD50qUpUs0PDpH7J6XmMno%2BtnQ1mVwpyYpBbMPG4pb5C5jUNOEef8Fjj9Sf5r8BNgKB%2BE4BYk0Wui3CL9wyRBL5bPYrI7mK29N1rarlra0ZjgAmVGN%2BMUCDS3vSFAuW6pB%2BeYoCCHupSo%2BqK3NXcfbZb2GqFpGFP3ncWmyFtVTHTHZ2OR4ymBARmICdmLA26W1qIutfBKwwh9z9zAY6pgECWni1nd%2BCOQTVWn67%2BPxmnB5jENvyxuQXw9mZhk3%2BChmqe3kEk0m5tUN5iIUxfkggLr97Mh3QwhyWs5raLSoabkntsQ6o7jGqWl4Qw9d2oHmEboZVfQLkXjg%2BR9kLN%2BXWG5Nz7IDtRAYxyWJvnYA3ecNq%2FRP8Qk%2BvMULNDtnWzSINf51Ss4ixxnyS20MtzVKj7skEno4VmvDusnp24II4wiW6fAbO&X-Amz-Signature=767224b7cd8d40901586a1ccca380515472c27146d939413e72644a1e75e204e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVSBMFGR%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T221803Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIDSFHi1hvTi7AT6%2F99nbamTfevMUT52urnj3Nfo0pQeyAiBNdiMP3sOFhvTji7YlBBHXulu8vdB%2BxARPIJ7qQaiKvCr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMUOKHLP606etAIlRQKtwDmlz3IdpAz1phMAtst%2BbBGJhHcGzUMFc0ALDBqe4S8rqmyQYGuxYw1dI4GBQn%2BALqa9B1IA11WjaTHm6i6XfqSulORAFWyMGlmJTsJOmlabyJNuBBzZwKNUwSImhMz1b2iyoWL5%2Bv5EwJtcc5i4CmO3U%2F4kSn9ftzYPc89fE6NVEgVthCM%2FU6tyCPF3D9GdC4x1tZyqYbecpTIk9IIh3vWRhpE0UbGFLrDpcgnE9Npuajk3Z1na45dzcZdO%2FfCnGSnWHs22R9Ts6Kd%2FWFjlAgqrjCiHfw1nhXAI4AMUf1Tqxl1j3IfBLTTjUbDCXGSJGV8I7SjccNUu%2ByjztIbWID8TQfRW7aEdBbsbSIwNWA0WD0bqv%2Fu2RohCd5GolkgWacyUv9nlY%2FaEqN5amrGpBW9F1tZqwKC2vPvAJllVIxOkZOwfTyHWgjtg%2BRr%2B79Pm8QIM6SimkM7CtuNv1%2BviWRqzxCL3NUdc69ik1GPS3BznATLkOUYCzADoCUne4Zya9hZpvZMcGStiLPN7tW%2FHm3u92XrD1AfYbKBOgtsLHJxe1%2Fcrky1Q1GjrjlZ87Lb6zDXJfKt3C2yz7y79c4vJG6qcLChpT1f5%2B38h%2BuINom%2B2msI49dnMDtOIV8wMgw79v9zAY6pgGzQxYq2VuuQnQdg2JIGDc27Z%2FAHEPD7u%2FDqXbsirvc3NuD5xiWFJ7pgQ%2BUzoYV1odsHYZ4DsAs44nDlUpLKOwttHrvKxCYwatJEKSWyrOZ%2FvmfgkixeMZmhWAVGsHr11wy0O10qaanJeLcc2qsCqoik%2Btzn8yQ6DfAf9CBicBx%2B6cBRze%2B0nhusmtbZDT8%2F2sCAyZR69e5f97cK9r7jFWo%2FxtCUlEh&X-Amz-Signature=4cc07be8f9eec2fb9f7f315928207d7852b8cbf3ea25bd413d37af61f410169a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GJDZH3J%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T221808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQCAeEMptTVUdK4SaShXwHT2VHyJ%2BFJjiWjDg5OQvApsEAIhAK3dXuEhvVnMguP%2BdBwtCakDijeSs1MuxidSS8jlYIEBKv8DCBcQABoMNjM3NDIzMTgzODA1IgznJo6LmvBNCuBYZyMq3ANMhGVpvaZ2JgxZ2nD4ZgJn5dFBp7xYunZbtb%2BSgkZbPj0P830xcq%2FuDJbjYq7BOfuGtvO9doGv5kXVXJuz%2B0Tm2fb1uiMa%2B1QKFJonhCPZjAVX362GaKdnKo48yzGuemPAKuO2%2BFtuCrKj5dyw87dthJdvjqPCsite2dMZ2jC1GvsOCw3nvsqGY8WkHH0g9TMkEgAYrbd5thhl6nxSvPbEhhsAD4K9pCVMhf%2BPJn9KCHoZ4eGGXaQZy9aqjOWp%2FitONoZwqRPrwNMemzvVtqk4JZlsdz2CX6GUJ39XdHUdguXOuq8CNzXJ5bzZpCJJQOWqGg%2FhfSAC7bFYdmsSwM0do014ITlnxxbwkTRWv9U4EsZFJ6NEF6%2Fn43Hrvgk%2B3SwaW3RSJgKso9czpVB%2BuJbjc3qXBv3nt%2FzvTCs4%2BZOWRn5mPwEhbxFPRqDo5eaK7fVp36F1ULSlKYdn9Jmj4Xi%2Byn0pWpPflEdxorzLQx%2BfPogGv8JQcM6%2FxCRjVgWoMMJsE25CJIE77CHcdiVRCOk1De8M0CKVZChEfD5z%2B6QEsYaSCWtv2%2FWGJIlNGvySRI8LfbhaPUGWKjjVhspVPt%2Bl41nDJMypUopN4q4MHo4K12hlBADqEOTh%2BitgGTDp2v3MBjqkASm1VrZNvIyGhV8qISphP0NagP0BZb06iIKRYGcciot6SHjm5gXjTKNeNpNfvk9GWHIsz4aMBRXgcR%2BBC9%2FXsr6TK4P%2BTndgoGcqpHIxrqNjBsxpBMAdlLAXy6ica%2Fp44zaPcN4n7LKhYtswUoNy47SprzOZOoziV62OpvgCvtfc5XG3GXRZJww7NR00MnMsiy%2F6uVdn8KcFtnueaZzuX0jcuAJh&X-Amz-Signature=3aa779779326357d5e82d4863ae225c434d4ca8655035c985bd446c3e7f14535&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GJDZH3J%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T221808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQCAeEMptTVUdK4SaShXwHT2VHyJ%2BFJjiWjDg5OQvApsEAIhAK3dXuEhvVnMguP%2BdBwtCakDijeSs1MuxidSS8jlYIEBKv8DCBcQABoMNjM3NDIzMTgzODA1IgznJo6LmvBNCuBYZyMq3ANMhGVpvaZ2JgxZ2nD4ZgJn5dFBp7xYunZbtb%2BSgkZbPj0P830xcq%2FuDJbjYq7BOfuGtvO9doGv5kXVXJuz%2B0Tm2fb1uiMa%2B1QKFJonhCPZjAVX362GaKdnKo48yzGuemPAKuO2%2BFtuCrKj5dyw87dthJdvjqPCsite2dMZ2jC1GvsOCw3nvsqGY8WkHH0g9TMkEgAYrbd5thhl6nxSvPbEhhsAD4K9pCVMhf%2BPJn9KCHoZ4eGGXaQZy9aqjOWp%2FitONoZwqRPrwNMemzvVtqk4JZlsdz2CX6GUJ39XdHUdguXOuq8CNzXJ5bzZpCJJQOWqGg%2FhfSAC7bFYdmsSwM0do014ITlnxxbwkTRWv9U4EsZFJ6NEF6%2Fn43Hrvgk%2B3SwaW3RSJgKso9czpVB%2BuJbjc3qXBv3nt%2FzvTCs4%2BZOWRn5mPwEhbxFPRqDo5eaK7fVp36F1ULSlKYdn9Jmj4Xi%2Byn0pWpPflEdxorzLQx%2BfPogGv8JQcM6%2FxCRjVgWoMMJsE25CJIE77CHcdiVRCOk1De8M0CKVZChEfD5z%2B6QEsYaSCWtv2%2FWGJIlNGvySRI8LfbhaPUGWKjjVhspVPt%2Bl41nDJMypUopN4q4MHo4K12hlBADqEOTh%2BitgGTDp2v3MBjqkASm1VrZNvIyGhV8qISphP0NagP0BZb06iIKRYGcciot6SHjm5gXjTKNeNpNfvk9GWHIsz4aMBRXgcR%2BBC9%2FXsr6TK4P%2BTndgoGcqpHIxrqNjBsxpBMAdlLAXy6ica%2Fp44zaPcN4n7LKhYtswUoNy47SprzOZOoziV62OpvgCvtfc5XG3GXRZJww7NR00MnMsiy%2F6uVdn8KcFtnueaZzuX0jcuAJh&X-Amz-Signature=974af6e200f8da616991f7918974bfbd3799e2c081b132b7a11abcd7649b791a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627JEQRHQ%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T221752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQCZ0JaCK%2B2lUfkTgxlHLiwt0QhsXtc3r%2Favhq52VMly9gIgCDZSTJCXLSYVdaRKiIYxj3Z7OzBip9BoV1MiPZAWWzIq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDPg6EyZVi6x1adGAdyrcA1AI4cDIGAImZlYg0pM88hpur5Lu04qBfrXoFWtii7ZcyWW26a8PcG6934aiC7Pn9kaRjJwQPIUtl1u7B4PriquYZNGfwAvIz3by8NKLwwQlBCEm%2B6eT%2FVpkp5WlqSKSC2ExRGxYl1%2F0wRNRjlV5YzaXvnLIMAwwj9LzeunYZJbhRJcM09eDCh2Na%2FpS1FLToodjsY3HBI0zMboKIys%2BK837MaahvL8K7MYMo%2FYo9viYpctIvcp7BaTxPkUDtsDcf8Ww2H2TB%2BzPHgizPlJIHNxTvoo9HtNgn5N8SJK1eqE1p85FU5rK3FjBEo7dn9r91HFX6yy8BxKQ8PpEUXs2UQczb0WkJwn%2BrRSrSwOp%2B6EfwYFL5%2BJZnzUsEdc8Cf1Ihr%2FfFPDcJiR71uGoBiy8jVPfoU46EJhhPwgodOEF61VbxhGJ2hOcpxHBS8n3mCV5XP%2Bes0EFw7pk%2BX6WtHbYedQ0OKbdVjo%2Br6Y1OYY0p6P9Ro9BD7%2Bwxt9wWX8DtNuxh%2B1L0qnQCSsVxYZjxcY6%2BchkQYQt7WdcKeTsfdj7sH0YCjH3N0FJqRCLYk8elHDNJKM5Id3JciZbQCxK6GUdegWWHV37wIt2bdxCmFh%2BupB2AU9ESAYn%2BqYWU2zhMOra%2FcwGOqUB1dBIV1EBTN8LIPlxJauvNn6JDnVZZKzC0AdYbFAoH3elQf48D0yiQv7iQ8Tq5L0ZsLAZi%2FQKr9f9fl6SBMsCIvpLoU4C4mrrJifeeYqIplXdm%2Brm9SprrZ5Kc3t%2BwAMtfKKdsLryuX20lzLrHoOzz9GjqcWqTX0sIHPPXgyBvwNe0Ef7AYG6hBSS8YY%2FHxl%2FrKA8dJQf2ObSWGVC7vRyT60K%2BjGj&X-Amz-Signature=3c98ae2f7fa63068ffc7c7a221df8b1a764e1b104e2f0d15587eaac398681e3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQF2PGCO%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T221811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIFVYqcwvK7Wh93pA0j0rsKSGiRh6Z8CFAGaOiNRRydePAiEAu5cCkLYF%2FsCdL%2FqOFSr%2ByY4R8RXjV1NjwdO4ovZj9poq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDMfPHOKc0jmfSPUZiyrcAxg%2B72M4fYslm07pBRDP02AWyhSp%2FuMN%2FWe%2Bl1FEAqGw8G4es0hupF%2F09CcfbyFfENviimWz3Zh8h1gAHXtTXNd7s0ZSgSgmwkIJW3PGwUoVnVKkqZ5LgKx7fXwgLBrjDKVOSFm2YHjJLA8ktKsy84tJT9hrOKpzNUZtMwdxsPj0L8Qp79NGS%2B%2BhZkN8%2FpYddbMC3uBaFErELQVnYN3iKOqlBMlYgInxgC9EcE2cN%2FPRBjoQXVPsGbRPtkpoQhEshBGGaaKQYi6l1rOUFlcDNsllSEH4Dg2kHqCtMjaFBjWLYgGeDMY6%2F97xpLBrSd8qh1i3wlW6HtG6u24EXiTCS4KY7%2BLDeIK4BEU%2F0%2F2mh8nY9P%2FMavu8TjHvNMaUHMwxCI590%2FOb6g%2BDeC8D6v%2B0NAVaSwWN9QOg85jM3OLY0qGZyRA5tCJRIEnxQ85SKciW7MLIpqwpTUf36EdvlDfHFvvhW8vS1dH%2FKLBQmU3WIeSHigMpAJ2qLQYxuHGu542k4tcfoIG1gMKAomQjpKtcMs6V4IwihU%2BDgqoHLw%2Bu%2FQiy7%2FPMNvXrGwgDUx2mKQvxkOaqgaZLpuBqc9lZiuKjY4ajuZ6Zg%2Ba7NYspmcMho0wePdSlnqSVmDvzuSSOMLPb%2FcwGOqUB%2Fem3RHIhU3RsuZW1EfIBPlBr1kgt680dHjdXn0dlD2HmQReDmYBkZt1OuU%2BmTEVifLOx%2Bd4YDpcjZygXLOXn%2Fu9NhJ4fGm5QNlbEnoQFyKwIUfWthjKCFTpg6DxT1nyAQvL1duT22Zgk2clRzD%2BNNMF7W%2F7g9f6QwMuM%2B4Nh%2F6KYTnCr8QYJ5g%2BKVW%2FrZChTYnbCMfm0H17YvQn14xodQj8jFwBp&X-Amz-Signature=54345ecd7296379619f217a2d01f66b9adacc0f7a40c1a800c5d199baf32e4eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQF2PGCO%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T221811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIFVYqcwvK7Wh93pA0j0rsKSGiRh6Z8CFAGaOiNRRydePAiEAu5cCkLYF%2FsCdL%2FqOFSr%2ByY4R8RXjV1NjwdO4ovZj9poq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDMfPHOKc0jmfSPUZiyrcAxg%2B72M4fYslm07pBRDP02AWyhSp%2FuMN%2FWe%2Bl1FEAqGw8G4es0hupF%2F09CcfbyFfENviimWz3Zh8h1gAHXtTXNd7s0ZSgSgmwkIJW3PGwUoVnVKkqZ5LgKx7fXwgLBrjDKVOSFm2YHjJLA8ktKsy84tJT9hrOKpzNUZtMwdxsPj0L8Qp79NGS%2B%2BhZkN8%2FpYddbMC3uBaFErELQVnYN3iKOqlBMlYgInxgC9EcE2cN%2FPRBjoQXVPsGbRPtkpoQhEshBGGaaKQYi6l1rOUFlcDNsllSEH4Dg2kHqCtMjaFBjWLYgGeDMY6%2F97xpLBrSd8qh1i3wlW6HtG6u24EXiTCS4KY7%2BLDeIK4BEU%2F0%2F2mh8nY9P%2FMavu8TjHvNMaUHMwxCI590%2FOb6g%2BDeC8D6v%2B0NAVaSwWN9QOg85jM3OLY0qGZyRA5tCJRIEnxQ85SKciW7MLIpqwpTUf36EdvlDfHFvvhW8vS1dH%2FKLBQmU3WIeSHigMpAJ2qLQYxuHGu542k4tcfoIG1gMKAomQjpKtcMs6V4IwihU%2BDgqoHLw%2Bu%2FQiy7%2FPMNvXrGwgDUx2mKQvxkOaqgaZLpuBqc9lZiuKjY4ajuZ6Zg%2Ba7NYspmcMho0wePdSlnqSVmDvzuSSOMLPb%2FcwGOqUB%2Fem3RHIhU3RsuZW1EfIBPlBr1kgt680dHjdXn0dlD2HmQReDmYBkZt1OuU%2BmTEVifLOx%2Bd4YDpcjZygXLOXn%2Fu9NhJ4fGm5QNlbEnoQFyKwIUfWthjKCFTpg6DxT1nyAQvL1duT22Zgk2clRzD%2BNNMF7W%2F7g9f6QwMuM%2B4Nh%2F6KYTnCr8QYJ5g%2BKVW%2FrZChTYnbCMfm0H17YvQn14xodQj8jFwBp&X-Amz-Signature=54345ecd7296379619f217a2d01f66b9adacc0f7a40c1a800c5d199baf32e4eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WIGA5BYL%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T221811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQDE5RowIto4hSPJenNIE2KSmQp9oYnzbk8FAVRD57CP6gIhAIX8GtfChPuZmJosVePtfnEqpRY%2FvgvuIJpC3aQ%2FcFcFKv8DCBcQABoMNjM3NDIzMTgzODA1IgzHt6p%2BUXsFgLIVoHwq3APcOIWLU8S6oD1KfGHA7mu2W%2FNNt3T%2B9S63MrlAZxCvPOcdO7NlwILr3apY%2Fm1rZq80KU7m5tPuYkYYfCZ%2FDF65jgn6HRbffyAA9Lizmet6pfSIVDIhJ9ws9PWI4lcZzkzltbfIXIRA1yGhxwVv6uIAQyLUp9kmAYIT4wqhmA9Xcd%2Bx1poNxDCXwrBCWlTsOZofonIYwbWAmzc3dZIoZrr03%2FzTNKlZWTQsG%2BgipoNz6dwXiFhIj70tXo8QB31NiQRh%2BqAnP%2Fcy48TJUFxVcvO4oclI%2BsTs6m%2Fe%2FhCB%2BRaJJLFmSn%2BkJqyIijh1WlO6OIacsBmbBtKiIEVRa6jbFN8uAV1BqCo5PNxIhCwfE6fxxRc2wYyj1VxSJncMJ04r7%2BibHsXfBmgZa%2BdtxEndgywb2M%2FgT4Y0bGKC6lWwBFG3iVdMoLN8za%2F68FTBDUmM3xBhbSmB0GCn4S4cpZs13r1b%2BSzd2gRHFsrAqitH%2BxJ7tPSHVV8X07D8j0M0N2ZLiW3H7THJz1WU%2BgFE6A5P8RXTT0ExoAn5cR%2Bx1LPTp3mCr7TrhRJ1wYS1FunZB%2BHyMJQCu%2FzmnnGQPLS3Q%2B7oTfiyt%2BUk0gV%2Buu%2Ba3JhFxXMGYwfkQQt88nKgqL9oojDU2%2F3MBjqkAcroPRFGgZr6WPOlSv%2BEADWsZ5uk4uCCMOegz%2FpZtlTT1DF6%2BuB8DeWHandSRgqgW%2F7N4ZUjMK3eQ%2F4AWDMJrDsG4p9aMSz2pUymCWIzYnt8%2FtvrGWslStMv6HyqaPqsvEa1FdpN5kpt8wF5CnMf06OYTHMlnkpGyMD7qjrHCxvBO3gl%2BIBqvxfkSUu9FSFpBi6YiX2hEQvePjiRk48X1tZVt4n3&X-Amz-Signature=a8eb0983d49fa1a699c969c52996ff4c3c83a6adbf744ebbd3bd7f2f3ce381ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

