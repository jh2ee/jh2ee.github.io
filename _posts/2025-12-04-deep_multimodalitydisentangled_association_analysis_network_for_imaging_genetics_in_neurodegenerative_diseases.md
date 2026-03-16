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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AZ2S4ZN%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T194404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDKmxtF4%2Bs0j43QLcyzNvG9X6RIFuiB7P5nPwnxrbeC7gIhAMgTd9zEGPdy8PwNxCGrTlikCP1BQerYW3sk1h0RanITKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwHuxbG5dWxn%2B%2BpBBoq3AMuoE%2FRELxkG43gcFW5DFwGGD0kKlgFE8iqxVrPd5tKWf5XprSBbYbYQTn24LNHwt9a1nt4IMdxqLVrwhZzQmnPuE%2B1MQyvWZoLvABoANISpXGBnlDSNp2ilKNf1eBXHLglR3LUyIB4FqQZHchXGECrriaTLUIi51N%2Ber21zw0h58JTs6n1n8BCZ3XcYPQDVg%2BvXkI4Y%2Fcws4xNs26MzSQoZRjvLdav2VftcIKDjcM3%2Fal7UAiOaSJ95ZYZBanDHTmNvGLqWivGrZpRzWwN%2F8ZrBMg05GcpxkNIit4WflOOQRoa4KAw%2FdAxe0tldWIauseb4SP%2FaQSklHyTvKjIvwrAsorSmMm8m451laKLshKf68D5Y4ixdXXeu10rp5dOKo%2F2RnnhVgYL7K2blBYgoUyTWrGo3vU97ie8vQJ3eM%2F2rja2tcPyryOVuwZozHmVVYCdvVJN8ke2OWgGOU2Q%2F%2BKriCms44GD42I%2Fr%2BLzKbutPaR%2BKomo3ICHskPqa%2FMDrPIfUzu9QnQUIuHGHcHr7fKq84em7nniqmS%2FrTZINkCUmc5aw7V406y97YBl2bBevdREQDYi6sxWWLK8pSOm7jk23YUjMf7%2B5fTX9duFwoaY1CCORk5XDyrB85WZtTDo8ODNBjqkATe54TZLjY6jFT1VM8n3jSDlqGv%2BkeGMJU6wy6YtoDUl4ktLqsZZyMZJg1qDh65m6z6AP6kBGCipLQAE%2BMGO9tAW2xI0BjEpyrJQIEUrGm5nJ1TJtMv7koXCfc%2FfZooK%2ByIumYUtfqVuQoZSY2IxNf%2FKhISQZvTP4Wc0EX25vI%2BtdRDwH91m4LpVFrM7lebX5jqxtNVo6ED8dgHzVZ6XRpSTTWeU&X-Amz-Signature=d12e0bfbc7ec861dcbb36815264e686dac50ae470d41634b44666bb091bfb871&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AZ2S4ZN%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T194404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDKmxtF4%2Bs0j43QLcyzNvG9X6RIFuiB7P5nPwnxrbeC7gIhAMgTd9zEGPdy8PwNxCGrTlikCP1BQerYW3sk1h0RanITKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwHuxbG5dWxn%2B%2BpBBoq3AMuoE%2FRELxkG43gcFW5DFwGGD0kKlgFE8iqxVrPd5tKWf5XprSBbYbYQTn24LNHwt9a1nt4IMdxqLVrwhZzQmnPuE%2B1MQyvWZoLvABoANISpXGBnlDSNp2ilKNf1eBXHLglR3LUyIB4FqQZHchXGECrriaTLUIi51N%2Ber21zw0h58JTs6n1n8BCZ3XcYPQDVg%2BvXkI4Y%2Fcws4xNs26MzSQoZRjvLdav2VftcIKDjcM3%2Fal7UAiOaSJ95ZYZBanDHTmNvGLqWivGrZpRzWwN%2F8ZrBMg05GcpxkNIit4WflOOQRoa4KAw%2FdAxe0tldWIauseb4SP%2FaQSklHyTvKjIvwrAsorSmMm8m451laKLshKf68D5Y4ixdXXeu10rp5dOKo%2F2RnnhVgYL7K2blBYgoUyTWrGo3vU97ie8vQJ3eM%2F2rja2tcPyryOVuwZozHmVVYCdvVJN8ke2OWgGOU2Q%2F%2BKriCms44GD42I%2Fr%2BLzKbutPaR%2BKomo3ICHskPqa%2FMDrPIfUzu9QnQUIuHGHcHr7fKq84em7nniqmS%2FrTZINkCUmc5aw7V406y97YBl2bBevdREQDYi6sxWWLK8pSOm7jk23YUjMf7%2B5fTX9duFwoaY1CCORk5XDyrB85WZtTDo8ODNBjqkATe54TZLjY6jFT1VM8n3jSDlqGv%2BkeGMJU6wy6YtoDUl4ktLqsZZyMZJg1qDh65m6z6AP6kBGCipLQAE%2BMGO9tAW2xI0BjEpyrJQIEUrGm5nJ1TJtMv7koXCfc%2FfZooK%2ByIumYUtfqVuQoZSY2IxNf%2FKhISQZvTP4Wc0EX25vI%2BtdRDwH91m4LpVFrM7lebX5jqxtNVo6ED8dgHzVZ6XRpSTTWeU&X-Amz-Signature=d12e0bfbc7ec861dcbb36815264e686dac50ae470d41634b44666bb091bfb871&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRLATBEM%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T194404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDDUbb6rjtN3WarirEygDMeRSCyxDfIL4nYybjD8MeJRgIhAM1G2oKXJqyqdUNT5bUQUDGmtX%2FUFDKQZpHDbo1phk%2FEKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw%2F2cG6niZCFmYrkdoq3AOfV0FcsHsOK6gC2QWP292Xe%2B6xmiP2%2BTpcrfNA4qQg3juU3r34U7Hg3%2BmrqW6mlqJnGAvwdaPqX5eOcV1D77gdM4dIxeWzY%2FplU8HEN88Vpo6TgrB7UzNSw12Uux1nUrYnySk3Yv0h%2FGJR%2BBQ3z%2Bc8og2pRNPbVIO5OjJrVBEtaCmNemH5rnbZELcLFAhYl1CgcoRYih9ekTHkgtVvNsI7q6N4u%2FcNslLK%2BSDPpw8siFKp2H%2BEM%2BezhCkuj6MgX27ijdORrV%2BUBr1BL2ivRN5W61DJ9B8t4VGjdC%2FOUJGf2YpK3JwoIy74hU5%2BSB3QFc38Ihi%2BGVvjL13F68YKoD4LZNl7Fd72eidbth5XZkkaG2XflM0WHAVvJnETTnofhuKZMbP%2FkAwkmmhpLLqNxUaZtEUKyw3dJ7wX%2FONcn4eXG1it1bP7WqD2WsWslaoJ3iHx1T9x3J%2BdcWqbTqPI%2FYt3z3ah4Cqv7kBnJmn7kFFyD8gBI7TN9cbG9JEsaxF3oouE74GueiLBcSHtQLRwfsPytBh5PxdxxY8e1kgoFCDLXi6%2F4Rff3NOdMw2HV8QCwC6Bqrf88n8LNWK0YFdaHmE0DeqgenxBqwkD%2FA95FYzNEcDqY7wh1Lz84Qph4zC48ODNBjqkAdJtRRXI3a91M2L%2BJt0NhjKlXUx038HRyjF3RbA8Gw6%2Bl05hmkoy3hbEU6sxG3b0IFiA4jJJ%2FIj%2BX5V0yy%2Bvw3%2FkEtsVblPkRKeU8hj%2F1DLtWawJcY0GkUBCeAFTZ7%2F%2Fer6PG2A6R1dhfQ1WbFInk6Oi9lRD5n%2BqMivZOloaPd8I9l01KfPTOYXzY7QALJUkrN6tn6o0t2nTysQsqHPRNkrZd3Yz&X-Amz-Signature=963e79db1e661be057334249319ba74feeecbb3cf4002327496bca4dfa31eca0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7C6SOL4%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T194405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQCwlRxkGQdWCICf%2Fx8jaee4OllZgjEPFA37lRbihVuX3AIgV71vHlFQ1fm4unA6puXJkfsGN7whMwuEpqMQhGdhpqoqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDICorZakIc9411PKISrcA7pfDbUHr5dcmS28dvHLBNpWHHGeDv7Gz5nnZEYs0lfNevxrni%2Bh6kFY9zNbGikeCDJDklwJJG7UF56A3a2m4UcMlECUh6rhuyyVJPT4Yg2jokWDla5FqVrFwMR6QK%2FCgMzc0GJMvbafvWZ40VcbR25JtKlmiuA9i4H7IzLGqwiuUwbkwwVT5C9q1dYwrcesn3nMa5akMy96xjIW5ZFm67k1S%2BCNF7CiJ5XV3MzNMcDIYSJW%2BrUjCG%2FffRVh5EqeBbyvaEWV5ENgvyS2VD4wjnAmR9uj675fKZmPdnQukIRZO1BITtTBiYoDP62ROUtH5%2BpejqnmO85uGX%2FPUT%2B2ONnqEJFSHPntsybXNvYj0eJRc2lMRsfpph%2BQveZWJJr1%2B1d1KroQiDQMs6K0lW3AhoJ7ooJVwyudu2PsX%2BQkSu3elCi1R7OAccZGgCNVJFrmVdqdxnJE1kTiOAzlcBEJMzwwurcKnBO8C3FOVmoyg3nhE%2FIuD4thMVtb7nmxDeUouI%2BaoMEQ%2FaNzq%2FQghv98B1DB3jpUcHFyelJ2%2BBgZWUuiTtMH%2F8legnkHkuM4CYYM85%2F5JUL6z8SGec%2BCh5pyN8Y71LaLFlg63iVIZh8soWdQEyKTg8FeUYwWfTZ8MNDw4M0GOqUB3ayvXD03awNTf6m4gLSBkW6OPaWN2pcu0AIEz7R6XklLfu3%2FbB0vVe6IZtGee7e7JfabP1AytMah%2F%2Fj97BQH5zLVnzUy2F2ZmR21ibVf%2FNkmRN8lyQAtestVHnrf06VuovBEGw0CESDG93LZze4my6a8oGidPkz%2FvKIJqoNaelSQukGIFqMGK7Jvgc2qmg3dxX7xEZs4ebfdxmAHIi8KrjjuVSqK&X-Amz-Signature=8db1d3d0ec81f379f626706613bcd22dc847ebd5520661df416c8b5fe2785d0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7C6SOL4%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T194405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQCwlRxkGQdWCICf%2Fx8jaee4OllZgjEPFA37lRbihVuX3AIgV71vHlFQ1fm4unA6puXJkfsGN7whMwuEpqMQhGdhpqoqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDICorZakIc9411PKISrcA7pfDbUHr5dcmS28dvHLBNpWHHGeDv7Gz5nnZEYs0lfNevxrni%2Bh6kFY9zNbGikeCDJDklwJJG7UF56A3a2m4UcMlECUh6rhuyyVJPT4Yg2jokWDla5FqVrFwMR6QK%2FCgMzc0GJMvbafvWZ40VcbR25JtKlmiuA9i4H7IzLGqwiuUwbkwwVT5C9q1dYwrcesn3nMa5akMy96xjIW5ZFm67k1S%2BCNF7CiJ5XV3MzNMcDIYSJW%2BrUjCG%2FffRVh5EqeBbyvaEWV5ENgvyS2VD4wjnAmR9uj675fKZmPdnQukIRZO1BITtTBiYoDP62ROUtH5%2BpejqnmO85uGX%2FPUT%2B2ONnqEJFSHPntsybXNvYj0eJRc2lMRsfpph%2BQveZWJJr1%2B1d1KroQiDQMs6K0lW3AhoJ7ooJVwyudu2PsX%2BQkSu3elCi1R7OAccZGgCNVJFrmVdqdxnJE1kTiOAzlcBEJMzwwurcKnBO8C3FOVmoyg3nhE%2FIuD4thMVtb7nmxDeUouI%2BaoMEQ%2FaNzq%2FQghv98B1DB3jpUcHFyelJ2%2BBgZWUuiTtMH%2F8legnkHkuM4CYYM85%2F5JUL6z8SGec%2BCh5pyN8Y71LaLFlg63iVIZh8soWdQEyKTg8FeUYwWfTZ8MNDw4M0GOqUB3ayvXD03awNTf6m4gLSBkW6OPaWN2pcu0AIEz7R6XklLfu3%2FbB0vVe6IZtGee7e7JfabP1AytMah%2F%2Fj97BQH5zLVnzUy2F2ZmR21ibVf%2FNkmRN8lyQAtestVHnrf06VuovBEGw0CESDG93LZze4my6a8oGidPkz%2FvKIJqoNaelSQukGIFqMGK7Jvgc2qmg3dxX7xEZs4ebfdxmAHIi8KrjjuVSqK&X-Amz-Signature=fdd595b4a132a2224dcf0cff9c8427bb55973425b2b7e9d63f5a0f49e7e6f4e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SF3UKYC%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T194406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQCWsI4uDiMMifSXwZhEGPlVlYVvi3ufny35knCrUKKWngIgP%2BZPCIfMBCSrMRABSIIqXUZBZdnM2ig8BBcZW9R5l18qiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDjLZ4A7dU%2FTsvPI7CrcA25luVEENtIZ93cxA0RW6lKyHHLf91ecT0t7S2u2vHIR9FSa4dGfGDuo9uga7sx%2FNZaC2OVM9vmdmCIfbLsXaUdBRmqfTNEx9g0kUP8p4qqj883vN3kY56lKUKLseiMdMfQm3usOfGWsD7VpIVBdEffogbMIs9TLZJa7ZAqqZPdwM%2BlZ20cU1F6PC2MzXuNTvBohnibvZ8Z1VN7MnL2FmNxZXsYRMO%2FBFkLeqOGGXwuD4%2BvvrzQObyg%2BKEQ4kWmEDRa0MwownyLeF9Ug371y7ZBwx4qBxw8whhRmaSv7D77gFhjR1hxOy5y77QHPS46advmAfEJD5JhPv3gbA%2FE0qKY59AKGqPWpHtcGsv1l2cV7FWSMsjFIgFvl6Asl1Y4dO9wPyr%2BbOPyfzaOWE3egHy%2BBUIAqMEXsX%2BrxMkysuwXnABTPveS6rabRmGOIha08C%2FhVV0YWf1dBtjoVmQXt7%2FdruSeV0vNE5zv5s9JnNbWqBnzz%2Fpjzr6vJf1p3UhcBxOE6sWBeClgS0vqTjP1j5O9p8QMZBqHCx2I%2BeB%2BSoMdJYIMXi%2FKoAn3iUmBm7p%2Fji%2BHDoaNqVTrSMInQpPF5EFP7To5k7EJHWIVwC%2BbitWMdUyeaKaIc0NdA%2FQwnMJLy4M0GOqUBU%2BfaT7pOHUjmZMYkVZc0LzAf5pzBMRANi82otkTkfs3O5hsgMcKNWomHtmENVU%2FoOd4QepAHRDUAcgi3IVsx%2FdPOO9ImkXTFPP8%2F5YYFcatsDXwUrTi2pwwrK9BSO629w7AFaMm7QoIpmFYrIBNiSlmbyLrHB%2Bd%2F2eECRjzA%2FQ3g9OtlGZg5dXgITkNqh%2BxqJrYupDEw1ar%2FoYza1F7wG1oWSSua&X-Amz-Signature=d810c9ce9aae39d0253352144ddd6db316e2c291833f1b3eee541d5cf6dc6958&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XADUJOE2%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T194406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIByWFwS1%2F2H3ThUHlVEFaREpMPVGRLvPqBspxMeBqRewAiEA6jk2jvFSiI%2B7AozGa9sRWbWxUvtdM8Id%2Blp6WV8R0wMqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGRCkngbW9H9x%2FzQuCrcA8pnpsspvPU8J6la1P9NBnoaSMVMGVtuE%2FBYpCrEoy7dZcYoCCaWBHFHxXV0JhluQlkAdORwhyn7%2Fvslc89TbIvq2wLak0P9pvkJshhquFO07fmGiI6%2FeHxzh7MZelF7qMl2ezIMl17REIXyR0YmSeaNYKq9sP56f3EY2UEYBdk%2F53o8BvbrjYX7x2k3fAeRdJ8%2BDR9GfwLV4OYmfSFr106NfeK%2BtQqC4cFJlVM1yV3qIuqKbLPDZU43j4w6d6ojjXNY4VuQ%2FH7Lm0mRh1mPLAFxFfPU9PDldbgvqi4wH%2F6rlEdv7v9NECnwpsKpfcGdMiFhj5B823YycKWnRVj5ZfYD%2BVXCskZRNr5CLiNPu6A9szrHmFkJEqTWbjezor0ZBQwP6SuR9O%2BVn47RjO80CoSYgBnb9ycGr7vMnkNJOXuxPkt87qyxW1kDjDDlNMZ9kiJnzdQyU9WEfT8soGjVKIx7srLA6WbpH51pM7Bs201afmsDIZ%2BAYrZJwjsakZl2FbQxNAvnGKUxiM9mLJ%2FlKfECwjLdrALhOaYONJbWpc31%2BFQYZoOcS4DF1sdgWj9oVv2uvRLsTtbJWLBAUS86mRViVp9AvyfUZ2SMws4hxMdwpHQL%2Ft8z8HtCjWxBMIvw4M0GOqUBhVNpt4FSEl07OEeQf8sAkUZSG8Siaj6ogvx7I7KllRwpSmT6rWkxqXNQwZXyx5cHuYv6cuEM1Bfc4abPUEk3DH7jXVxXjU4pC%2BoTBxVCdeZX06SqAE8%2BdjQo5npDoae79vvTP%2F3sTMMVZ3SIqcoUOnz2v8dQRD2Wg2OMm8OOXSxv6b8F0Hn9gTH33GRlN%2BsiGr4uIe7Q6exTNRAU6H1MmIDOxaIx&X-Amz-Signature=abc2e4afb0aff60dd180e31caf070f1581c447134ac6e4244432c25f79d829b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCPDE2Y4%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T194407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIAPXUDmCjaIk4eFso0cyaRkEJSg4LYAv1lhpzkBG6WfLAiEApUz8uvzygxgto6ir4GrUsUK8lfvjnx59qdgjr7qyOLYqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEZHTii%2B3PUlr%2BniXircA4ILDMKNagf460zoh%2F9ny%2FacH7npkmSqbj8Mn7BbiWpJH2%2BNp3kUrzBovkEA72JdwUalP%2BVmFwVAlR8Rg24wjj9zzOWQ5HVcT9BJat8xwahlDLmMh%2FWBcbYg10ZfR4xjOH%2FIN%2FWQHFNuDvKgxykRocy2FD0chmQ9Ad%2Bm%2BmvQxUbWWsxoDUHmnbpGf0vxB7EyxdiVYDPC%2BwFQ86giKH3FUx0K9KY%2BRYx4S1HA50QAqA51kKXdHelCHvu2FpwxQczuYs2%2FTweV3OP%2FUwH%2FR0AhGRotGPY9V6qNR%2Bb7RmSpAEiG8DDYV4Wac8t3To27U66lT5ItIaLA%2FhDpJL5M%2FBfR3dYplXMCQ0vV7tKdiuvbvnoX%2FZEOkSth5HSk9vFRR14iNoKiu6DLWgmYXdr%2BYjuegfoD9VeEpi7qEpaMq8kMdMcC3hYnetjJVrodolRawbRq%2F7aAux31xgRfnouy8EQ0kWAjcLCt9vS%2Fp%2FMtphQdRFdYq217fTchhRfEBQCDzzmQTVmc%2FbLNcgLv5hmnYH3174IBDH%2Bhne8xCIdrOGakNAOnVU9h3zkqKaEuru%2FxYysNJUDJse3NMRWEYdFpBnEsHnC2enFYSVh5pO%2FpoFb4emEbhq5q601DubKtcIaRMMXv4M0GOqUB8d%2BleNKaAmqWVr1I6YfpldhZ7Ctgo8Ex%2F1lLa%2F8o3EcTkZ9E4zjKwGykB3EQbLSCv4K9n9YuwDAs3FYfczwMUbuMzvb3gTNReQBhsZxNxfJZcGJmWuLv0oGFjC5dyOABX%2FWb2ieYBOOYxDUddX7rdspZSB8V2vkfhIc5395s%2B9NBcrTKJgA71xHZ7JbasxhnlBeW028AeNtettW5D6mp1s6SY%2BcL&X-Amz-Signature=f2d6d0fca9cc153161e20bd0db35014d41504432c34fbf6645b7214707d99b3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663Q2YGI72%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T194411Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIHOPeMJh40fc8vw8LSW52vLUbMtfU7S79satirIOhyGzAiEAiQKqqpIj14RVMvwmiLtMqYvIC05t2MgBpKBleXHmOu4qiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHLWK%2FyN0Wb403SQEircA4b11G5IB5jdkod5WilaZjvTzPiPIYsnglDi5ww%2FRa%2BenXfEW03HuFSIoYGfEGYRVBz0OgXvBuLfm5tMo1nOFOQPPZedUSdDm5m4fa5SVJh94Xlt%2FJfgv6220EVsuBqELgaiDoZHmQ0KZkCGJpu8aibyDJHlC8hYes1vPejPhG9lB4hzYbNAIbUuBKmDFzkacBh9wMKEz3ySvwMrpvk1OGGGuIvzmtWrRkXRdRLi9Yt2wrJtadflXJ1M7m%2B6h5A2YyZ4HN0w%2B3TbGwzKZK0SAB%2FEINQ5epuQOfn5%2FWKZ7WrzZFvZiv7uJidwcIVogEbDH6yIBYDQt4VHTKURV2rDLrCd7kR65phmgolWjjRWAPAxAKPFVXTHRFOUd5xf25jBuoRGVTCkPKxkeCuoClN9%2BJnnVGfMokuieOTnCjewQvtxViuPjWzbQt07uONOzda8k%2Fy%2BhGEmhS9Aqs4GWqQOXW59BlBja41tpQrn%2BsdP2R4rPMU1pBFGkvnF8VebICNC5S7j1n9O6OctIVSq8WoQ4985wCADE2%2FI1ltPVAneI4DbWGr5r0F9AJJYC9rQesT%2B00I1KtyThlfxgYraiy0pU%2F2w0i0koykyUTCatjVUEVPX0iXHa4z8mgElEaivMPDv4M0GOqUBR%2FSHZXFQN0Z%2B9fy%2Fjl%2F3yiFmFKEI82lrVMjYpAaoBSYSKvFRFYEJ%2B4tCknQMUEVa7nDGQFq4TEcorAoyUf8rfEe5DV%2F4%2F9%2Fho77F6rHvPMY8YlFSzBpCy6GjNaQ055xRqsHI3PUk6%2BY69no6zq%2BTR5P7UY16bKS3vsIBKAYyINKUC5BMmzL2bjEN7tUFwn%2FqZyJTCZ5EvuxYNK7IVA9dMAK1pwFj&X-Amz-Signature=d38c8c5d1596616ded48a6934b53747f0d894cf12882a30132cac5ce027b93ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663Q2YGI72%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T194411Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIHOPeMJh40fc8vw8LSW52vLUbMtfU7S79satirIOhyGzAiEAiQKqqpIj14RVMvwmiLtMqYvIC05t2MgBpKBleXHmOu4qiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHLWK%2FyN0Wb403SQEircA4b11G5IB5jdkod5WilaZjvTzPiPIYsnglDi5ww%2FRa%2BenXfEW03HuFSIoYGfEGYRVBz0OgXvBuLfm5tMo1nOFOQPPZedUSdDm5m4fa5SVJh94Xlt%2FJfgv6220EVsuBqELgaiDoZHmQ0KZkCGJpu8aibyDJHlC8hYes1vPejPhG9lB4hzYbNAIbUuBKmDFzkacBh9wMKEz3ySvwMrpvk1OGGGuIvzmtWrRkXRdRLi9Yt2wrJtadflXJ1M7m%2B6h5A2YyZ4HN0w%2B3TbGwzKZK0SAB%2FEINQ5epuQOfn5%2FWKZ7WrzZFvZiv7uJidwcIVogEbDH6yIBYDQt4VHTKURV2rDLrCd7kR65phmgolWjjRWAPAxAKPFVXTHRFOUd5xf25jBuoRGVTCkPKxkeCuoClN9%2BJnnVGfMokuieOTnCjewQvtxViuPjWzbQt07uONOzda8k%2Fy%2BhGEmhS9Aqs4GWqQOXW59BlBja41tpQrn%2BsdP2R4rPMU1pBFGkvnF8VebICNC5S7j1n9O6OctIVSq8WoQ4985wCADE2%2FI1ltPVAneI4DbWGr5r0F9AJJYC9rQesT%2B00I1KtyThlfxgYraiy0pU%2F2w0i0koykyUTCatjVUEVPX0iXHa4z8mgElEaivMPDv4M0GOqUBR%2FSHZXFQN0Z%2B9fy%2Fjl%2F3yiFmFKEI82lrVMjYpAaoBSYSKvFRFYEJ%2B4tCknQMUEVa7nDGQFq4TEcorAoyUf8rfEe5DV%2F4%2F9%2Fho77F6rHvPMY8YlFSzBpCy6GjNaQ055xRqsHI3PUk6%2BY69no6zq%2BTR5P7UY16bKS3vsIBKAYyINKUC5BMmzL2bjEN7tUFwn%2FqZyJTCZ5EvuxYNK7IVA9dMAK1pwFj&X-Amz-Signature=907c6bcf0f4d99a26b4afd8066b32855a358e9644208e2b553fe9ef2c23136b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666K36MTY4%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T194402Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDmr37k%2B%2BRNPE0qOh7VzRT5QgHtSyp%2FhXKH%2BmhKh%2FPJgAIhAN74lYDqLekvA3m%2F4nBtzUSghvy0gwv6XoHdWPDuWnfJKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyQSFGPjaHVJHJlUboq3APUoNr%2FeI2dpcZ%2BEkvXYQSXbxRSzUlTlRdHmazDVA5HBmEGAFbOj%2B36VCcAnhb4XnJxxxmxfxPupDuAmL0gfPBj71B%2FBFRblXdvzOqoSjJq87hFrkV5TwQ4AnZZpdFtZeSC6K1zNCrH3lSsdTgjVxpe1DG1kGsAZGEyzLGGXyjIkn%2FXnsTagavxEjBHUcqn6I0Z%2Bs5cyMvchvkFccbiGMW%2FZXVvvDctSb2JV329nLyo1l9ANZQBBzRgQpPLF23HuHF52BZ8%2Fz%2B3uN5HkQaZ2FZW%2FMBF0rx1teV89qsAt8vL5kO6nA6IheeV8VK99gAO%2B8voS0XCoAuK9jpNCVHWquygXSmPPRmsraDK6GFkUB5DtEUXe6OrcNuqHA7tN98l7Ud%2FevSFnBCQWlyI3%2FYEe27BV%2FowdWR5UWCWbddU0hR29v7Y5LkulDfOZIllkbmbxzXvXbSHC7b08GjKN5dg3ILxGLYgASaLk1nwvLN%2F4voEyn7aBbVzoK1zKjlehlYasihqDBjWnc4juwfURJKdtTW82YhTdhdNf74PMAqQoBqnXAsWyBht9h1fA9QqgAF1hswoGpcLKiCluziPkZNYWV%2F7WU0vtty6JQTzRqm4BSUZOMVNcVR7C7A4vccBQDDy8ODNBjqkAb%2FfBc0Uvrx%2F7%2F4s6aj%2B8rq8sB17hTkSxgD4Wqn7%2FAgNKyiBWYwvokjgG1qOUAVDy9DUa49ls%2F7nKE6Wch46XMi69%2BEFc0ryvoyncormkoNB%2B4SPVW0Q3TLO0ydQt0la8RrYS0prtWV4KPMwonV7w%2B4Jh1xJJCG0hJTw3c%2FvgAe%2FRVoGwbSljAoLPWdCaojftPZaN%2BuV%2Fgg4i6H0a%2BMlJ%2FlhLlv8&X-Amz-Signature=e254af2bd64ce9cf616db58afd42f938075f7b8464a2ab11837332531e303bba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SJ3OSX4%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T194412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQDTJlSLFCcRRRxQubsM8AuNR0Hh6MOg7fRrs85jxblHRAIgAZ2AyGexKXayuRAYpnNyiUE4le7SMKWymHnGvRCkpKYqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOfZbmtgY7Qp%2F3fESircA%2BfZFy%2BfdbXsuSu9m7HLGBQlDfAxDoHT%2B4isvkrI19HoSGm5RYnsb2pp0HfrdhO61GLeTpTm5UTjvuQ%2FsgXHtXyLtu7zSWIdbkdT6RyZFNQCHnP0T0AvrtpRTKcVfciNI%2BzjPT5T2ZmKLY11SunNAJEILAdwpURmtWnsuiX5mQ%2Bs2VJIFd6irifGrjC9q9H4vFSolLf6UgNluy0op%2FTewT7LNbxUTlKKMbwIKWAPBv5Y4pr249AZUtvzyFVUFOQ6Pn7O9Ri2UrdGWqbHiS3e%2BTNRlvVXwgqOv%2BTMccc9EiPcDG3SxBMM%2FvtMEnepqrtu0AWumqfzLZwElalFoSm2KjgusHh2FIGdOwICqN9A9YA8DjN32KtZSnDSgxKR0ALXc9B%2FBH%2BTcVI5BOlOWNCwK%2Fxjs4tmawBDEnYbmC5DnnWAQuIlxtuWJw%2F0ZeSk%2BeAdJ5mMOAZcUGHDAtdDfts3nHYiNSbwn2KZyMuSwiW7LZNNFqs6skrYuRx0T5yUo8XAx%2FlPVSSVNGob1T8pu%2BckBzDLsETsw7JqqXVhJb8If9N3bjBdNEk9V%2Brds6u8JkF9ssfJsJhv9VuCmjtGKMfCeNawf167gmBxm%2BwFvCZi4aGFx1kYxiAFL6JFUuINMPXv4M0GOqUBVmQi8NwtIXMVY9sxd1fHGFeDiElNiVJhzgbEqeixycqlSWBw%2Bzf1U%2Fb60Afcd0lQ0Kf78mkthajXuIUp8ePa1prGWeAo5IB2kFGnUPGpqRc0AjctGr8jLAYgCrkepjgxvmneTPHR2VzFaMJXxv7i3wAzxaqlVaYLyp9XiQnEewZd9vPJ%2BTqnhtYfBkmdwTORKnonkKXn3U7OPtpGfx3a63BTTIVH&X-Amz-Signature=a9bdcf7890936d30f8bbfc8400fa3c641a2c6c34dc397ba12a1dbf753a1142f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SJ3OSX4%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T194412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQDTJlSLFCcRRRxQubsM8AuNR0Hh6MOg7fRrs85jxblHRAIgAZ2AyGexKXayuRAYpnNyiUE4le7SMKWymHnGvRCkpKYqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOfZbmtgY7Qp%2F3fESircA%2BfZFy%2BfdbXsuSu9m7HLGBQlDfAxDoHT%2B4isvkrI19HoSGm5RYnsb2pp0HfrdhO61GLeTpTm5UTjvuQ%2FsgXHtXyLtu7zSWIdbkdT6RyZFNQCHnP0T0AvrtpRTKcVfciNI%2BzjPT5T2ZmKLY11SunNAJEILAdwpURmtWnsuiX5mQ%2Bs2VJIFd6irifGrjC9q9H4vFSolLf6UgNluy0op%2FTewT7LNbxUTlKKMbwIKWAPBv5Y4pr249AZUtvzyFVUFOQ6Pn7O9Ri2UrdGWqbHiS3e%2BTNRlvVXwgqOv%2BTMccc9EiPcDG3SxBMM%2FvtMEnepqrtu0AWumqfzLZwElalFoSm2KjgusHh2FIGdOwICqN9A9YA8DjN32KtZSnDSgxKR0ALXc9B%2FBH%2BTcVI5BOlOWNCwK%2Fxjs4tmawBDEnYbmC5DnnWAQuIlxtuWJw%2F0ZeSk%2BeAdJ5mMOAZcUGHDAtdDfts3nHYiNSbwn2KZyMuSwiW7LZNNFqs6skrYuRx0T5yUo8XAx%2FlPVSSVNGob1T8pu%2BckBzDLsETsw7JqqXVhJb8If9N3bjBdNEk9V%2Brds6u8JkF9ssfJsJhv9VuCmjtGKMfCeNawf167gmBxm%2BwFvCZi4aGFx1kYxiAFL6JFUuINMPXv4M0GOqUBVmQi8NwtIXMVY9sxd1fHGFeDiElNiVJhzgbEqeixycqlSWBw%2Bzf1U%2Fb60Afcd0lQ0Kf78mkthajXuIUp8ePa1prGWeAo5IB2kFGnUPGpqRc0AjctGr8jLAYgCrkepjgxvmneTPHR2VzFaMJXxv7i3wAzxaqlVaYLyp9XiQnEewZd9vPJ%2BTqnhtYfBkmdwTORKnonkKXn3U7OPtpGfx3a63BTTIVH&X-Amz-Signature=a9bdcf7890936d30f8bbfc8400fa3c641a2c6c34dc397ba12a1dbf753a1142f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6X3RJ26%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T194414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQCa6O%2FiOcmOtwKW%2FFltFyyeVlUyt9EVIk%2BAuP0CpJs%2BdwIhALqxBEenTtyt7I3715dr1Cl16qRwcG1wKM84L%2BNwkIliKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzOmwKowAARxLm1CoUq3ANyAuoWpVcf5ZlejgxaWDstAha8pUKIj8P%2FNpuHuoxqgxgTLbYKXyxzVWgmHZ8FENT83x9X1LnurZkdmIWS3W6qHD5Z1SEeJ5J89bUZ21uAZBrFS9I1N7%2BibCnzCa6JIUvZwHc%2F1h4znWkjevEaVYlE44kis62PhfF1%2FZhIi7PZY9rq%2Fy549cyZiNMna3tbvMaih1exJZnKxlBIThif16HRjDqk1310OEEYIsIFE0xcZf2d4fFt%2Bf4BbcRhzWgSlYZM2I4miJPS8OhJb%2F5q428gbC2cto6ZV5d7bomM2S879TT3d9wM3pmrAsT0qchV6xVv7xfMz2vapJY99jc8Bh21nufKw8k29qhX3802fXXjuxY33iNcqEnr2ldTU6T9%2FtPjsyYtM4WhoCqPQBEE70Hj52VHSPX6See%2Bu5YerfcSmdGGHukYhdwpQyKY4dovLcy5yWUaGgkn1dHdMTGZwprYQaDxvKFkXjelZf3IxLIkRvfX6UuRc%2BOc9T45%2BSSgJ4hMHsPmJQoT5oOl%2Fqw%2BxGyLJAMp5r2rAYMD%2FEh%2Biyw%2BtLvZn6Gu3mZpuL2t0Pdtc5gyRGdnU%2FvnemnrlA3ae0wnUlQaVSD8iGYlFnmI1QgG7Jh1csXHLu%2B13KQoVjCQ8eDNBjqkARnRcBhdwpmJxkLniywRRJ2OPkZ9xEWl1D8inj5WMqGkxpv0r3WVB%2F9eZsI1b2o5cvVrxw7M0aKJ7dyRJDEinuS71m2aS6T9oAMmqla6Qyu%2B9ACOuiYYTPQj7r95lwHKe2zeqgbC0FIj9zrI72uAtPt1ISqCDSWvnwb7BuJdHM%2Bvc5vMTQTnICFcvPHboxp5bhEEF5e8uiW9oy8RBzRKHW1ttFpp&X-Amz-Signature=407231c80fbcb05ad98470389c53843c702decbdd4bd6981afc6ebdb062f4c46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

