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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2XYQRXS%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T070551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIH%2Ff01v55RiAFDJ0yrQBTU8t7a%2BnDYQTnunUrOXqjR8MAiBzYNjjtyS6NKUjjf0%2BN5pPRR4XS4%2BfrG05Vj3NVPrITCr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMcxDvJK3S62m0EMQeKtwDeZXgU%2BRbhRSAq1Q8w0L1J4na7vFQKJ835K8VR8GDHCg351t%2BEgIXzYCGTtOrOywB0T3DrV0Db7ijIMUTjaSPHR5sbEciseJSThbeQnuPPeUweYvsDb9%2FfTCmKHUpSi1jvMoeJyMFTxpJTJPYolsfeZwhFYxf593i5YqKAGmkKS8Dx638rgsFQoGxLfWJKoUgC6E38GUCCvMXQRrasZaRxMOv3O9g%2FBBsd9OGR%2BtC6Jd2VEg128MZhZQW1Ow4P35tT2kiyh9whSvpgyW%2B24O38%2BJpt5%2F2w8joHeEZVdbfOeMHoWNX%2Fa4aLqTEZD1Xaj7ZHB2qQWVV0oM8qYRgfLAnlCyXBuGG4k9MzTS6BBvNec2FP%2BmbK74ZYaL3bqHneSx64Trb9uz0a%2BA069UUzQlap15AMbfBJoCwr%2FViu3vqVWnBC7QR9qkExJNWOl4U9VNp0mC1tFiFj9IOWk66cTGHXG5uz3DPdJ5y2d2qOnG7NwDZ%2FjC8dVLhTAhn46HbgCq%2BpHopnYkgkVzGBBSkvimKxc32gmtfDIHlJMYHvSFrVi4GO3eDBQ5MmOJx4blakDfXfzcC7B3vpbtCM7GSOj%2FVXY02fxhQAU0HJlj4nMRRli6FNuGbZa9CYyp70awwpYzdzgY6pgFewGXSBltqpOxnwp9XVrOh03yltCYg9ej2m1ZyqFuiduE%2FDc4ajSsLGGvbNMISHQSuXD%2FeAYrohGjIx%2FZceIMmUBosQJcRkOk4ON7nUoAjvEVu2KoPmUflZsEZXRzgES%2FzivCGNG2YZLLWqHAAL%2B8ksmKurV4GXetWvbYUiOBW%2BmnZoroqA6SsEI4J6tBPvtJqdHs2He7kSJCdJk1r8S7gRX9X9N%2Fp&X-Amz-Signature=2e45cbea03acf94283ae4069a38d4279543040570f31d0de5801befeb19c5d57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2XYQRXS%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T070551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIH%2Ff01v55RiAFDJ0yrQBTU8t7a%2BnDYQTnunUrOXqjR8MAiBzYNjjtyS6NKUjjf0%2BN5pPRR4XS4%2BfrG05Vj3NVPrITCr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMcxDvJK3S62m0EMQeKtwDeZXgU%2BRbhRSAq1Q8w0L1J4na7vFQKJ835K8VR8GDHCg351t%2BEgIXzYCGTtOrOywB0T3DrV0Db7ijIMUTjaSPHR5sbEciseJSThbeQnuPPeUweYvsDb9%2FfTCmKHUpSi1jvMoeJyMFTxpJTJPYolsfeZwhFYxf593i5YqKAGmkKS8Dx638rgsFQoGxLfWJKoUgC6E38GUCCvMXQRrasZaRxMOv3O9g%2FBBsd9OGR%2BtC6Jd2VEg128MZhZQW1Ow4P35tT2kiyh9whSvpgyW%2B24O38%2BJpt5%2F2w8joHeEZVdbfOeMHoWNX%2Fa4aLqTEZD1Xaj7ZHB2qQWVV0oM8qYRgfLAnlCyXBuGG4k9MzTS6BBvNec2FP%2BmbK74ZYaL3bqHneSx64Trb9uz0a%2BA069UUzQlap15AMbfBJoCwr%2FViu3vqVWnBC7QR9qkExJNWOl4U9VNp0mC1tFiFj9IOWk66cTGHXG5uz3DPdJ5y2d2qOnG7NwDZ%2FjC8dVLhTAhn46HbgCq%2BpHopnYkgkVzGBBSkvimKxc32gmtfDIHlJMYHvSFrVi4GO3eDBQ5MmOJx4blakDfXfzcC7B3vpbtCM7GSOj%2FVXY02fxhQAU0HJlj4nMRRli6FNuGbZa9CYyp70awwpYzdzgY6pgFewGXSBltqpOxnwp9XVrOh03yltCYg9ej2m1ZyqFuiduE%2FDc4ajSsLGGvbNMISHQSuXD%2FeAYrohGjIx%2FZceIMmUBosQJcRkOk4ON7nUoAjvEVu2KoPmUflZsEZXRzgES%2FzivCGNG2YZLLWqHAAL%2B8ksmKurV4GXetWvbYUiOBW%2BmnZoroqA6SsEI4J6tBPvtJqdHs2He7kSJCdJk1r8S7gRX9X9N%2Fp&X-Amz-Signature=2e45cbea03acf94283ae4069a38d4279543040570f31d0de5801befeb19c5d57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663E6U3RHO%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T070551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQCROBV2hg325yMij0FnHJKe79E4lO%2FggPgFHKxz7TEZSwIgPFsncx62GbZvF25bqIBa6fTCFT3%2BYNiiQwsGHx9L20oq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDOu146RerZ%2Fps8G1jircA23WzWeowOnLJ%2FYJYqaJOhxOQYo6f1RWfS61IRGefvIWDQ15UKh08SVsCCTwDX%2F2ySy7jkgLN9KlYAu%2Fkr5qygro%2Fe7GjJnZ3I6StRaQ%2BiSXMLPGnVKyzZaIckjXsGVjypORiPcAqALMbR5Grt12qPzrnI2%2FeRfy0FnfKsKAhKOWo%2BmMenF3boAICOqldx0wmG%2FRhlg%2FlmY%2FfJawzk9gVQvq4g218sphkp%2F0XRh6qSJ9AXBT1DRxuX0%2FM%2FHTazdIDYkdoiTApYtSrzH%2BkSIN3yLUJ61NfTjK9gR2C5JaPcshmksPAwOBgLoUN2IezD5v4Y9lPTCbM%2BDKE4pta9nXMg0pTFkLheu7qA%2B%2FiJwOcwbFBy8CQ5nSxV%2BY6QGyWjPm16OsR78I8N0HnccZ8t0QklL2NP4GVRSm428i3zkceF5HpofgRm2b7HJD3BCNf3g5YL2KNC6pDf3rGaYUYGfdzPOlK1FA5DGfDDq2UF%2FfSa7mxhLLVSim9YbSjOFaulWpITgpN2TNin0AJhJ%2BQxHCbc2H9wFycHVjIe97SWOkWcj6ajpGpwh3KyKeau9t8LaY2JJSH4E%2FEvE1ZULSUGslrDB7yjQ4h1I%2FQF21VvLJ3SSWvKOeF3%2FHZOz0fBQ5MMqL3c4GOqUB6CY%2BWhdQqmEYehzirMGmVPSptSBl3lj0IO%2BEoG%2Fv6g3r%2BkI33XSfjwxzvWjvMi5pIkKcBquok%2FInx8XbxLwcyD4cCnio55WOiZdILrFasyXCDmq0lgsxouvmGRfpdiM61jWp%2BxrVgQccW%2BEE6GD9Iffi34QEWR7vZLB11mo5FygXZAwPSiGVIDYq9c8K5gNR%2F8FzChiOn6HAYK%2B6jCbTLCWD8%2B8O&X-Amz-Signature=3a7a9c00c52bebfaf4ccf25c4098238a2da9420f81c581b80683928dfc3ef70e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UN56OCIM%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T070557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQD4hONXeJqIv5Xcoq3RRDc%2FwCQdyFSfN7XKZMUQJo3KogIhAKsU67alLK%2FZxPjBXS0J3saxrtfp9b3rGnloWyuoC3WKKv8DCA8QABoMNjM3NDIzMTgzODA1IgxUbLy62DhLsjKZE5Iq3AMaLF1hSN97wf429ZVLBc1MeRgp8HysO%2FOZcLQ62KIF8d9TczsdUhrFZMl3lpeVoxeVKFKkKaCHc4hFamSiYdj82JjWstqHzODtdcOSpsZosWfGRkEGIKseKEGZqt3zeGwR66DU4MzD0BEYoKK79vZkxMVDrDhiIMX6rIVhzzuhmLTU5UTiVRwb1jUd4lsIBtR6RmkJ3B1xl3Y6eWGhxDXjL%2BfaTvMKRs6Vtq3Unmn1hq55fbe34sBqJyslFIgCVH%2FQHTBNUzl67WXsc1vL7GVbtfr4xiV%2Byp6YWXI6vdm%2BOgCrf6qZV0q9cnUmmLKTDwPTwQ9k2%2FXpeHdmDQ8nnuYFSeCJ0vGQ71gAJzkqPpw6My2N5x%2BEu%2F5dQrSuTjK84rI6XhP5FQRy683UPd2evxqcdkCbhMAtCh8zoONZukA7J4GQxLG%2Bw6mwp5JNEUvPJQugcC18hQf9uYuthsXb9U6pqTm77Ymr0fE9MGSgfBthcGMuJhkhZSFS%2FW45%2FrBltRQ3EaHUOIgQVholVIdEUnUmW71mclFHBNl2qaOesHoEAi%2Bgc1DdVZmnqoxYhVgcuhqYPD%2FNqdGUaW1mgNMgRhUuco%2BopuOp%2BOLHpYRu%2Fn8%2B6mmJwoe4LqrzNbWwjDDTid3OBjqkAT%2Fkxm9YxsisXFYqvvETC8fvB%2F0G1x3Vid%2Fr43irD5Tjgrn2HgwMHwJ5XHaQrhdfqZ5XIKCiyMwMGwbr55InXnKMr0mx0FX078HLltw%2B%2B%2B8QUE7dJ6C9Cfuad6zLioAoPmGZcY5Tp4jb3P1uqSij%2Fps%2Bov%2F4ydL%2FckmQnYZkV%2FMcKkdQS9LLBrF3h7gZA4zHu%2FBBQ2AFKGgEpfXdTt%2FaBeyfvWex&X-Amz-Signature=6d7b90670abb6020675943980fb83fd61cdd55ba9a7f079fa06b3d5a899475c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UN56OCIM%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T070557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQD4hONXeJqIv5Xcoq3RRDc%2FwCQdyFSfN7XKZMUQJo3KogIhAKsU67alLK%2FZxPjBXS0J3saxrtfp9b3rGnloWyuoC3WKKv8DCA8QABoMNjM3NDIzMTgzODA1IgxUbLy62DhLsjKZE5Iq3AMaLF1hSN97wf429ZVLBc1MeRgp8HysO%2FOZcLQ62KIF8d9TczsdUhrFZMl3lpeVoxeVKFKkKaCHc4hFamSiYdj82JjWstqHzODtdcOSpsZosWfGRkEGIKseKEGZqt3zeGwR66DU4MzD0BEYoKK79vZkxMVDrDhiIMX6rIVhzzuhmLTU5UTiVRwb1jUd4lsIBtR6RmkJ3B1xl3Y6eWGhxDXjL%2BfaTvMKRs6Vtq3Unmn1hq55fbe34sBqJyslFIgCVH%2FQHTBNUzl67WXsc1vL7GVbtfr4xiV%2Byp6YWXI6vdm%2BOgCrf6qZV0q9cnUmmLKTDwPTwQ9k2%2FXpeHdmDQ8nnuYFSeCJ0vGQ71gAJzkqPpw6My2N5x%2BEu%2F5dQrSuTjK84rI6XhP5FQRy683UPd2evxqcdkCbhMAtCh8zoONZukA7J4GQxLG%2Bw6mwp5JNEUvPJQugcC18hQf9uYuthsXb9U6pqTm77Ymr0fE9MGSgfBthcGMuJhkhZSFS%2FW45%2FrBltRQ3EaHUOIgQVholVIdEUnUmW71mclFHBNl2qaOesHoEAi%2Bgc1DdVZmnqoxYhVgcuhqYPD%2FNqdGUaW1mgNMgRhUuco%2BopuOp%2BOLHpYRu%2Fn8%2B6mmJwoe4LqrzNbWwjDDTid3OBjqkAT%2Fkxm9YxsisXFYqvvETC8fvB%2F0G1x3Vid%2Fr43irD5Tjgrn2HgwMHwJ5XHaQrhdfqZ5XIKCiyMwMGwbr55InXnKMr0mx0FX078HLltw%2B%2B%2B8QUE7dJ6C9Cfuad6zLioAoPmGZcY5Tp4jb3P1uqSij%2Fps%2Bov%2F4ydL%2FckmQnYZkV%2FMcKkdQS9LLBrF3h7gZA4zHu%2FBBQ2AFKGgEpfXdTt%2FaBeyfvWex&X-Amz-Signature=987bc6610a97974f215bff66f299aa087220435e5de6ebb7e7a5260f1a4f0234&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZCVPMCT%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T070557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIGtCYSR4qowCSL6lcKSLqmu9fIDpUzcpJ6f2M1WA1ZO0AiEAtb0iK%2FTw5ZTuAZdrKhLBpdhaF0xXjvW0VVHNGK0Aps0q%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDDOJ%2B1Bpi2C9bm9SqircA%2FBczFZ8dlNbGnWtMaP6t3gxIWupc6izyDGaQC4xz4XaO4anAZrVh3YRr5tlne8OJvpcUx3oy3jNOyAJI1xpqPH7nNHVhgOri9012LQnFedzLvYZBJ084h%2F9QmUdO9sDKuIigpOO9sq4qY1A8YvlJCuyu5BjJaKeCYpHPzw%2BX%2BxAdObYR4qWm7o3Ffoo%2BGTk9DJCi0XAqRqV5Ke7ElgK7gOc%2FR2TZw89pC5EFoDmX9D9W3SR9awnlve3VvQmabhbljI73xSAxlHwrFcDWaE%2FZbeZyVgF9Xm5QNSHDPLEvwz%2FKPCPvKn8AJihh2TJf0tDdcxOpl8QZLSwnkeXT1ANgst%2B2RI8MYVC4Ii%2BFq5a5AaGybpDiX%2BpATzsOgm4nIl0Fvq6DfAN169lpAK9h%2B%2FV3m1YPCUQjBE8HPcm7dxN49sbnRpcQ3RVmL6AA1oQ%2BAXUPZk4jPWJAZ7BDKNq3QaSLCAwT7%2B8mdwDQa2OOOjRE%2FZJ7hK1A%2B417%2BP2G2hgd0KNXD%2BhB74H972T5cLKnF63fEHPySvMApvcmOPD3fCOALC2cW%2BNDfOByokGoydCdFNv4DQV98U8azhTfFLzBdEQCUU6DBSRC1Fp8s7EderLzDo4p8UyhH8aLlWEKgWOMLaM3c4GOqUBdeKN5zfMATZ%2F4vEqz%2B0s%2FK1x6AzuMXbOevcvb28ROsLmNu2Luv%2FewX9PITnKvYIj%2F%2FrPcnDuayU02it5QSh1SJHlEv7zEtlCdediXrrMrGE%2Fs4KGlkFxCFZ65idPaNPYKkJFfd1DPIvaLG939FQBM3CKPjvD7HIXLuZs%2BCx%2FCgeNlPA%2FbJBnxt9IUTHOl5L1aC9DATy8gIrpxLiB1ee3U%2F%2FTrylU&X-Amz-Signature=10e63584083af8bc1bf0f85491e65c2ed8d4a0cda4f60ad5ac33470363c077c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SG3FNQ2%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T070558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIHkxCS%2FlkoyV8LS6KDqkHvy4dA6cSGTu%2BX8iTQUvAdtsAiAbee9BnpQPxo5%2FYYFGVgydJODr5yYx5p7KsvAyTNdAEyr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMJLDm0JjMQdnTzakfKtwDn6Nzw0WuJjKtEAqSCyPkFwBEPeBX%2F6N%2FyIjpFURrfUMQgTo8N%2B%2B%2BU1UgekUauitD04DolsJO78nTFUcGmT14G6uryXvF%2FTeKCx8t3USU8T5kP%2Fw5ax1UnokafBqA77qHI4K93BnW%2FJ0NaL%2BXS%2FA5bTG%2F7Tq493dOd8PNVtlKni2X3Q7CP61TQvGg1mLkUSiCjh0J%2FUVTugHnV4PMnusn0naYmKJGvlNmzgEETWnGR1B%2Bpvy9%2BAxGFw2crkQRmbrtUpqyelCK7srcP%2BfX1AD8Ke7YucIjAJakhWhzHQu3MbSVLr3luw9JxKNlaVapSM6%2FVipG23s4d2LaFOVnc%2Bh6naJytPem05Z5eVr00PI7n08yo9zKInMytPmXCW067NE7iAIHjgKt22G6GkxoZ4wtrwU5Vkx3TFD0T9ab3Tie1bn1x0vZC8ZlDe%2Bil3Evt01QYYZAreWFNk5z949mJbkRfQyOTSrOeDRBP5lkTeiHpMVMdwog1XWaMIQBT0JFQ%2F%2Fv16wrf4pdkOkjU1b86hq3wyt5DUOlLUNcq9YmBWgJMY36d5t9tzzCBaaWtXypiU7Tul1vkCjj2l3fR1t6bk%2BCz3cQpky1%2FepJJDkBEuBEVCsC68U970U54y%2FWR9Yw1ondzgY6pgEbtB%2FLua77T0l8%2BiIWrEKdMliuIUv0w7qGYK%2FysLY%2Bgx7lj%2BrEd76dlUjWBgtWHDogihLuaFEp%2FoWYNgzXm4SshrZDdu1%2FcRdxwYvbdpSwoV7yrFdIJFjqQ%2FbGmLO%2FmHlv%2BUiZ9UUMQKHKp2DynZPw7INbU2cRXqrDkIjG6YonHLf5wh01lklTSvXioHCXMWZkbB8quUu5KO3q65%2BBbTmIKhOqEq76&X-Amz-Signature=5d548110013ee4e4da2787793f4246e07812fbf4e4c9c303a5934cbdd9378687&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663S32L4KY%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T070602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIE7PujYE7ncgDPtnhwVXy1dEKVbQT7UtwCS1MOH312jRAiAaydHM7eXa62kgbkYoCN8sPprByfXG%2BTbYpiTj5GBIMCr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMcMs863YIfHVoLmawKtwDpVMOtkabU1O5Yg6JGYzRG6ze8ZApGMlgirR64rci2NK%2BUozRhynOQ5HWbRLIJd2Dfcer6obwwEVR7ryqUAbz7b3ixnOS4Xcmq5Bx0fVC4EUsBco%2BihiN2p%2BrNsgA3IZmVduJFQH%2FLSHwWwRRsH3MCGjryNzRZa8Ku8DoQmCbVVhu7qSBD69uuGYafk0vqsY53rfrpUssehydOxXeakv0%2F3M53zSnk4dCTV%2FTKr%2BkeJKTIlf%2B40Q5psrhd9lDWPJbgtTI4WjbHujqgsv8oH9m2AjW2u2YTqCq5YsEa1mR8gHXtPZcy6ICBtGsfqn5QU3YIOld6q17Zh35OuPvq4IAI%2FntR4DKwnbuBaUA0uclIIE1ud5JF3z26tiZ7bsa1AIyjuJJSake9Qo1uPU9Tea%2B%2B4SVybD7CFnBXu%2FhhdZIZwmrMvyYp78oJ3OYEX8sW3%2B8Zcglrza90VhhhaMquppCKckNCIcQU0pjF4B0%2F1VBxNfaW1r%2FiAH3Ofve%2FZREdALDAqOxpKeigLRy1E9f7bXApoTruSqj%2FAMbYvJWyOhffy0fQ0PbRSry%2F6wbHM2wa1z%2BLuKueO%2FYZ8svgrA%2FB9jOWS%2F5U2rQS1LDgeVrrWSCbSR2OLaS7sWs2y%2B1yPYwyordzgY6pgErx8wIqr1w%2FYXgSNFi1uvgQP8x%2Bxs87ikyGh64b7g6mNhyxQQLvbVFHubEAC2D7JSfLr084PFTWynsAt%2BRBp2rBIjDPt50Ey%2FBadAWq3fZ1FiBBHxUQ%2B%2B7k3Lp7umDuyKwgrbjatfEdn7OO24j81sGRen2Lbmmsb1pNzlG4GWXbXCci4iDr0FhsJp%2BHDGuhidZnbDgupe6ny%2B7SUzTwXiWljT0oETg&X-Amz-Signature=f8c866ce3b695ee323caa2c254f120a2ee4a86f404f108905c0e116baf650d12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSXAHATV%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T070604Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQD9DiRnw%2FSnQu4tY4yxmwU7kLI4K7yZbSldGeXLeKbwrwIgPe1VJLGDPncc%2B%2Fdm07gcNUM%2F9dFsc3faEnBKr5CKR5oq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDCutAU1vZNDlRLEyoSrcAxT3vdw5Y2OAxfi0zut9QAfcN%2FS4%2Bb9uh4G9VvJtlIE2EIuHnyxiT26%2F3mEPYPahhbwnddE9VxyXBmag%2FwFCitTjO2FRwfswhapwhs5Kca0t%2F3aH60zMp0nh2bIq6G25xJUy1QACMpKVz5lprCjFflSypB1mqiUXrsBUBYK93kGCjVx2%2B9gCU9GpSdnmE8i8YwUKoa50npAbz6otchvfso0JTKnGrGhWxoT5XqO940YkC6VST1eYUBwwEzIN8qvFwmuNO5Iy3KA4FuKvigMJbfj5zVkhUU4wBolBlJ0dwDy5PWXN6l5rpkY%2FK9nuuCF13%2BEdkacMuELw7B7eIdpBWKRXuJVFUAnad1mDZYJzCZsTp4uA2zzHQxtK1Vdp42dydx3pvuEomk7xi8quu7C4ger5M7VubK%2FEsG2LHLgb8q%2FCWCC%2Fhuzk15IyZyy%2F6uAnKhlLKZN6yITpKws0FV0Tbau%2FKwbJTbvISYka2AEyZ39Th6%2BYOaKbRyO%2BaXrLBY209DAbg5HCCvzPrx3ljXeN2Jf5TTa6Qy%2FllHSa%2BHRq38V%2FOTE99DJljcUy9bJk3A5U7goFH7ie3hMDVERZSd%2ByZlq%2FsvBaioQ6wp4mkTZHpnWp8goU9Wz2IPOsoteiMO6L3c4GOqUBZ2BabtN9TN1BFGHtz%2FjxjFy8Y1JcF1AJwfxlnL0hwHixof7fmdlV%2BaUVzi0B2lDMudUShUThtU9ngkuNA1obYmAZEuH%2BPn%2BwgzWUdW6X2cikrHkdvB1W5YLILwO36G4%2FvNSJNbzIzd8HzRKuk7fIxhgl6pRC0c0r%2FBDkXaov5HooABBi85jpIFjfcCyWSYmfMLIZHmfrIwrB6TB1FXGpwDtTkniQ&X-Amz-Signature=6859c101f3c2e4c2230d233a51c08d8cf3cc7974054999de17552c71c8af2f32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSXAHATV%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T070604Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQD9DiRnw%2FSnQu4tY4yxmwU7kLI4K7yZbSldGeXLeKbwrwIgPe1VJLGDPncc%2B%2Fdm07gcNUM%2F9dFsc3faEnBKr5CKR5oq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDCutAU1vZNDlRLEyoSrcAxT3vdw5Y2OAxfi0zut9QAfcN%2FS4%2Bb9uh4G9VvJtlIE2EIuHnyxiT26%2F3mEPYPahhbwnddE9VxyXBmag%2FwFCitTjO2FRwfswhapwhs5Kca0t%2F3aH60zMp0nh2bIq6G25xJUy1QACMpKVz5lprCjFflSypB1mqiUXrsBUBYK93kGCjVx2%2B9gCU9GpSdnmE8i8YwUKoa50npAbz6otchvfso0JTKnGrGhWxoT5XqO940YkC6VST1eYUBwwEzIN8qvFwmuNO5Iy3KA4FuKvigMJbfj5zVkhUU4wBolBlJ0dwDy5PWXN6l5rpkY%2FK9nuuCF13%2BEdkacMuELw7B7eIdpBWKRXuJVFUAnad1mDZYJzCZsTp4uA2zzHQxtK1Vdp42dydx3pvuEomk7xi8quu7C4ger5M7VubK%2FEsG2LHLgb8q%2FCWCC%2Fhuzk15IyZyy%2F6uAnKhlLKZN6yITpKws0FV0Tbau%2FKwbJTbvISYka2AEyZ39Th6%2BYOaKbRyO%2BaXrLBY209DAbg5HCCvzPrx3ljXeN2Jf5TTa6Qy%2FllHSa%2BHRq38V%2FOTE99DJljcUy9bJk3A5U7goFH7ie3hMDVERZSd%2ByZlq%2FsvBaioQ6wp4mkTZHpnWp8goU9Wz2IPOsoteiMO6L3c4GOqUBZ2BabtN9TN1BFGHtz%2FjxjFy8Y1JcF1AJwfxlnL0hwHixof7fmdlV%2BaUVzi0B2lDMudUShUThtU9ngkuNA1obYmAZEuH%2BPn%2BwgzWUdW6X2cikrHkdvB1W5YLILwO36G4%2FvNSJNbzIzd8HzRKuk7fIxhgl6pRC0c0r%2FBDkXaov5HooABBi85jpIFjfcCyWSYmfMLIZHmfrIwrB6TB1FXGpwDtTkniQ&X-Amz-Signature=3f406971a5a59e08c9eea87114eaa9da95c8c74aaecf11235c8f8cd92a8a7e06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642TKISDV%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T070547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIFPaD1xurm6%2BgRd5jWBTPlhe2N587PuR6xSkKDpFOXsHAiEA2NYo42YntXNHCjo28giSBFjNtDRMujgAw1%2FPK2x4p%2BAq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDCgOrO6flnNbs92EGircA%2Fgg%2FTfWRZ%2BI7hFRK%2BIbtgExrZ89gVFA4CI1YqnQRK%2FvRgXSMmPbSy9zkS1H8r2p%2Bk00N%2B%2B%2Bg07UV25bgpvToMb%2FT3BMymwLhiexHuurycY9hA3AN5L%2BdRlbRymJXLoEgnUTTxjnEZzOd4gigoeMttoWFMl5dJ7ssUsod7iqR%2BoSQ7sYYVZBvfvIR5VI7fGZgqUaOCHi3IAJMTnej%2Fp%2FhYC7jJ5xMkNlmjCS0bjPThhdLsS6dgG3XfACqyVXziurKWPsw9kRhw3JxgxmCLg8W4dm7kco7TNkQiqk%2FjlAjmHvZmB8eYzRmY3RrjASy4Xp0UDI9qpX7RrmixrzU4KHjArhoq5uD6OBJD1Hsue3zKnWFvIPbB9O5OTy0ZjkokFL%2FyDjlPeFdIqqEmJMbG5PV9WlYn8lDXPzTJZqnGQ9%2FqlXleY2Ul1%2ByDc6LOkwnYIApCmnstrD5NzqhsbLhdK99ixkMG4vPrhSomD9Hqo7fuc7kQ%2FNyP02r9XRU3M2kxx3X9f6195aK7wwnDUlZWWMffQKjbnxb2YCPnua1f7H1IGZp9yBjSZkbEhPN2PD7yG%2BprGdaT1VCF%2FGdrhKIei%2BXljDscGrjxgWNKzB2rKgZT7%2BIx5ek0v%2FMGrmG%2FtcMM2M3c4GOqUB7%2BDeMnBBNjwY3%2BTpF35QtmGuT3UN3WDrwJ7B7rPsdqw4cxaK%2BTJjkq1tdRBbmYVCGdaG0JJ0V%2BAAP3c%2FqH4JI6qoJtIw7yEWO2l7fFOuaRjnJxuxAOads7khEuPvRvdu1ytpADbwS2el9HWuiLYo0G%2B7OglDB46ivIHRs9hzxbTEcefV0Dd6SK4BZyqllLMXDdV4cj5azq69C5CGRQa%2BlUKBkWhD&X-Amz-Signature=9d544f406be6eaa17cfba04f05974a47d161a251ada41bb609a7e46ce028e684&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KS4B5GF%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T070607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIE6w38a8BcWEP2xRLSaX7Y3%2BlmB%2F9UASV7yjVXPKBRrnAiEAi8cJvwZ1T4B1wlGaNcpwRNUHcmrGFJ8q3wFAxIe4Lhwq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDDUpE3MTgV1AfGjmWCrcA3XKJ8TQ9xXmtjED0XMMtPlK0AZp8ga4mopcwAcP6Zh7E1VuTXE6KDqTpoOblu2644gEQBC5VnHGE6qUjiXd2znhy2EYyM74YIz0fnJz%2FBLSgBBA%2F845PwNIbjWwdGyz7LGworoq3OCvKXWB%2F%2BWLCA3s7p5Pk8sm%2FkpRFe6RujVWJFikBMGpx7Ea%2BH%2FjEJKtwX%2Bmyy%2FS3x%2B9HsIlCi0FX3jexcB4vpBV0IsvmylVA0NfqMzFn7o91v9T7eAUJvrl4kH%2FaI8NxefBEbcyz1aggVN4zkDexmrzZCGdVEyoSoUUpEsPeOjvSiGPdigL%2FgVN7XVBQf9cLYzQ%2BMN6tNukEx7UDImoKMtnRoUYcagwu6xfZ9BDfc85PrEFvIHmFT%2FFV7SndL29UKSTyzw2Z7PcdEGaodQlE6VyFiLm4wS%2F957lCI9ekydbWeV6Or7O0YgZkq5b119ONtKzJqYdsu9MGKncNsnJb3GExxa%2B9HDIcp83HKT9Yw%2F6T%2Ft8B7lc67GpOaBBLFbchvYoDhXVH9pxTbR8QCvhKXxvYlm%2BED1D66Cpd4S3YLAC2dOOPB2ufW3rk90dKFOF8TGLv%2FCNEoE0t7MQMFwIEj8R0bNNLJmjeICOE0wTN3QRmqNJeJ0nMPuJ3c4GOqUBKZHJhh6bF%2Fww2MdBHE%2FgzFR4x2PmKFQ2wzZmY4AS%2B%2FoVO7rcIW6Y8Ol7O8LK5fEpjBWTuwuLR4Iz5u1WhxFtHjeIrzqWIAnHhIjDgd5Cf%2BA%2FoV7CZBFDkOfjc2UB8G7kbm5Yx56DY0g1tVHOdUbYFDOT5bS2Oi6lQ%2Bt0j9SHqeugazCNI%2FazfzrKaDcC%2BkqcMLzD9BE7KXznYH2NvOsujsVA1ErM&X-Amz-Signature=55376ff090da709acb01f1bda07fd753bfab156d9c10662f6614edd0da913e2b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KS4B5GF%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T070607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIE6w38a8BcWEP2xRLSaX7Y3%2BlmB%2F9UASV7yjVXPKBRrnAiEAi8cJvwZ1T4B1wlGaNcpwRNUHcmrGFJ8q3wFAxIe4Lhwq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDDUpE3MTgV1AfGjmWCrcA3XKJ8TQ9xXmtjED0XMMtPlK0AZp8ga4mopcwAcP6Zh7E1VuTXE6KDqTpoOblu2644gEQBC5VnHGE6qUjiXd2znhy2EYyM74YIz0fnJz%2FBLSgBBA%2F845PwNIbjWwdGyz7LGworoq3OCvKXWB%2F%2BWLCA3s7p5Pk8sm%2FkpRFe6RujVWJFikBMGpx7Ea%2BH%2FjEJKtwX%2Bmyy%2FS3x%2B9HsIlCi0FX3jexcB4vpBV0IsvmylVA0NfqMzFn7o91v9T7eAUJvrl4kH%2FaI8NxefBEbcyz1aggVN4zkDexmrzZCGdVEyoSoUUpEsPeOjvSiGPdigL%2FgVN7XVBQf9cLYzQ%2BMN6tNukEx7UDImoKMtnRoUYcagwu6xfZ9BDfc85PrEFvIHmFT%2FFV7SndL29UKSTyzw2Z7PcdEGaodQlE6VyFiLm4wS%2F957lCI9ekydbWeV6Or7O0YgZkq5b119ONtKzJqYdsu9MGKncNsnJb3GExxa%2B9HDIcp83HKT9Yw%2F6T%2Ft8B7lc67GpOaBBLFbchvYoDhXVH9pxTbR8QCvhKXxvYlm%2BED1D66Cpd4S3YLAC2dOOPB2ufW3rk90dKFOF8TGLv%2FCNEoE0t7MQMFwIEj8R0bNNLJmjeICOE0wTN3QRmqNJeJ0nMPuJ3c4GOqUBKZHJhh6bF%2Fww2MdBHE%2FgzFR4x2PmKFQ2wzZmY4AS%2B%2FoVO7rcIW6Y8Ol7O8LK5fEpjBWTuwuLR4Iz5u1WhxFtHjeIrzqWIAnHhIjDgd5Cf%2BA%2FoV7CZBFDkOfjc2UB8G7kbm5Yx56DY0g1tVHOdUbYFDOT5bS2Oi6lQ%2Bt0j9SHqeugazCNI%2FazfzrKaDcC%2BkqcMLzD9BE7KXznYH2NvOsujsVA1ErM&X-Amz-Signature=55376ff090da709acb01f1bda07fd753bfab156d9c10662f6614edd0da913e2b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SWU74OJ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T070607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQCeeXy%2FN35pOSbQxBolbrDpsG1RbCqFpHrVK4IqadqCggIgcoMMm9g3NZDb9HZQKZ7OGor8XZ1a8XmIfHMAdaEi0t0q%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDGGshU1gLZUWxKmcCSrcAwUMsuybX%2F6Q3s4Wn5TIDbqP6seN1Qs%2BzT4VG3EBt%2FzsFAVzU8gO%2FgczjZCjzerq3Qhj6%2BC5UoIqP4tt2y4taV6hjp2luoTTjT35uWRku%2F8oi8AokpQ7FsJbcpuiHgmSYz7YI3VE3TaEoLeBkt%2F3HKYRkRdeDCtGiaz1a3434hEsVCmgU6GzqoPbraVaJEKXXkiuioYocO1JABFHuXVU5%2Fh%2F6zTHSZjAwSRm2%2FW99qS3om3kx5lpMH%2BkRIJuA7MoaZkYkAMleJ3QBk7rctWOZdQvIxSeAF4xs1suE%2FcdT1hH9pChSRVyUK4Zzp2CdYffJToubkCvu9wFobgBJVsxs2FYgLbWTNVwKz3a0AhPWpOPMnF4lct%2FCh%2FDqZAa4%2BvgDLyUc1xL2Iz7nS5ZRGRjX%2B7vScC63ijar3RCNr3wgLLVhyNndBoXGEjgzSF1hCpjh3241%2F70ClpVFeztN6oWstSAaU%2FrzGLW61PuV5dEunldBkDqsnL2U%2FQo%2FI6yEfjdxY1B43tcJsNka91qVpkt57xi3dM1J%2FIlzeiADl4op6o5rUWun%2Bqv1PGL26pTgkjn1cZPxeL4ZnwvqL7%2BcR%2Bg%2F4oLZfJhwUL5wZXScKTvEZ7D5jGRe4DJk1qSlRmWMOGJ3c4GOqUBvEO4fH8UYIB7CeJEHKCRj3HbbfRlFK%2FWUtZ%2FSEF6kkDnTXrgChD0HW0S5ZjVN%2Fi3gu8TPK8VOKVOEQ9k5dqh1tK%2FyTlL8w4f2Zrvmk2VANtN8jqSAkux%2F3ct7U8cpb8vK%2FQ6NxG6qEMowGiMulu2Dj%2FC1RfdDnyKvgbBwFbxeOfIPPDFQVLKuhvhFcBePem0t%2Fllv5KbfaU1De%2FSDVmdeIp9i8Wa&X-Amz-Signature=d190c46261d9d628e20986b938e5c3a04679a9e1664289381faafab2730be1c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

