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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEY5I4SF%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T101251Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEu9MbErQ382mAlKCcjQaM8tdQzSK129ddoGfIoCCn%2FNAiEAm5d1IBIighP%2BmfiLZjrKpRjdDbI3Sb%2B6hRoOJBOC3M4q%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDI2dgZTJ1B9I08nYTCrcAxIW5bxBTg9aJ7KpX5GvGdx3ZQPTBODeNsBcj1MNKqkc33L9azi421Jlulixk1W%2Fx3IeSaGE9UvNBtT0yGOiywgaSNvVeqmNweHuEnlWUSHmU19VbqMbMulsYlFo1Qu4IRnjCMhKA2S%2BV8EgIw9B63JpXFSvKKw04DB58PxGVYyhp684jXg8s3OB9%2F9kXOedMyfzTwWSpRwaLBvcbl5jtu7PXVe8KExWIMXcRwveZw%2F2BQZ2tD1G32dEzeyvhQmwB%2FaKhyYlW774Sdx15dr4dBtnOt3z%2FlW6%2F6QE1BEPwP1Ps1vFOsJWD5MDPlkY9b%2BRSqKv%2BeinBcwsYXQX88s2JOKlZMTueHWQhFFlThbuDhNx6AxTMDN3jCEzHMlgFycevOFDkpxlhtYFEdjkwpLQQXupT5lAXEUF1zWEdkSu8VplCNFQp7R4il93YahJmySxV75l2REiAbJRFj6dJr%2BdOHutQyiD%2Fnld5GeLG%2BDCmH14Hf%2FIBCTlRPCjPB1xuFZI0%2BIMSWTcct%2FJ1WuSw16VnDr0USH42mfNS4Wy4xMV%2BdaPD620Hv9Fd%2Bye3SEIOB8FYitG7I%2FNxDegAavqyStfLR%2Fx4rnfUK0TxCekXOEbyW9APRoanXY4Nq8hcwiZMPW9%2Bc0GOqUBsY0zMCctyYeml%2FsCLNCHzr%2Fy0s6z%2FMW42Wv20Jnd7zOtop7gJ3n4GFItY8%2FvU7s1G%2BVS1dCwKoPD6pUN17OVIYqil%2BfRBXRkZXiZiO4ir%2FcgkRuNohi4qaF1p3G4V8ryFgS6Nicr1GBvTivjfhJftKho%2B32n%2FJtobKSU5FXU%2BN4X2aNonh52jBw7xOnxoT7zXjWsx5Alv12mdKITf5WFponXlzQV&X-Amz-Signature=495e5c12f836c16e726d2161903b71311929e15138db9d82483313afc6366c6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEY5I4SF%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T101251Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEu9MbErQ382mAlKCcjQaM8tdQzSK129ddoGfIoCCn%2FNAiEAm5d1IBIighP%2BmfiLZjrKpRjdDbI3Sb%2B6hRoOJBOC3M4q%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDI2dgZTJ1B9I08nYTCrcAxIW5bxBTg9aJ7KpX5GvGdx3ZQPTBODeNsBcj1MNKqkc33L9azi421Jlulixk1W%2Fx3IeSaGE9UvNBtT0yGOiywgaSNvVeqmNweHuEnlWUSHmU19VbqMbMulsYlFo1Qu4IRnjCMhKA2S%2BV8EgIw9B63JpXFSvKKw04DB58PxGVYyhp684jXg8s3OB9%2F9kXOedMyfzTwWSpRwaLBvcbl5jtu7PXVe8KExWIMXcRwveZw%2F2BQZ2tD1G32dEzeyvhQmwB%2FaKhyYlW774Sdx15dr4dBtnOt3z%2FlW6%2F6QE1BEPwP1Ps1vFOsJWD5MDPlkY9b%2BRSqKv%2BeinBcwsYXQX88s2JOKlZMTueHWQhFFlThbuDhNx6AxTMDN3jCEzHMlgFycevOFDkpxlhtYFEdjkwpLQQXupT5lAXEUF1zWEdkSu8VplCNFQp7R4il93YahJmySxV75l2REiAbJRFj6dJr%2BdOHutQyiD%2Fnld5GeLG%2BDCmH14Hf%2FIBCTlRPCjPB1xuFZI0%2BIMSWTcct%2FJ1WuSw16VnDr0USH42mfNS4Wy4xMV%2BdaPD620Hv9Fd%2Bye3SEIOB8FYitG7I%2FNxDegAavqyStfLR%2Fx4rnfUK0TxCekXOEbyW9APRoanXY4Nq8hcwiZMPW9%2Bc0GOqUBsY0zMCctyYeml%2FsCLNCHzr%2Fy0s6z%2FMW42Wv20Jnd7zOtop7gJ3n4GFItY8%2FvU7s1G%2BVS1dCwKoPD6pUN17OVIYqil%2BfRBXRkZXiZiO4ir%2FcgkRuNohi4qaF1p3G4V8ryFgS6Nicr1GBvTivjfhJftKho%2B32n%2FJtobKSU5FXU%2BN4X2aNonh52jBw7xOnxoT7zXjWsx5Alv12mdKITf5WFponXlzQV&X-Amz-Signature=495e5c12f836c16e726d2161903b71311929e15138db9d82483313afc6366c6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3C4YRR7%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T101251Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDgIRDZuOWtgyJkp8ziRCFSWtD9Ahg8Y6%2F4hK28e7IxgwIhALLkpg9v%2BNd%2FK9%2FNsmnCMseiFJ4GnLOdqAo21DP3HhHzKv8DCEoQABoMNjM3NDIzMTgzODA1Igwu1JU%2FnJisQHTve1Iq3AOdg%2FpN9uAcKuSJbbCoGQYIaxLvmESLLgJiPze%2FERPbv0XvuIDVoPE6%2FzCDExK6ApF8o1pwSjhOYqhe7W266WZmjz1C3UFg%2BUQECFukPN%2BnweoG62Iqj%2FsMyFXzBypSATRP4UpKkGqKnnDNzLeO14pM18igXoZXM0RMZ%2FMTMGNAt4Hv3YgyW54VTqQCeEEd%2BrlC3KK265fyfQVqbZICQ%2BwYPGkjuh0JKGsDHtU%2BoY5h3qljE52stXJHg%2F%2FKmEM08TpJ%2FGhPN2YPayuqhELc%2B34cZQ8TPrBq7p9cmnMGfzjhSFyX5Be5oZnS4AcK%2FWXGxTqoHP3KQQ%2Frw%2FGzQ2URAGEPQjf7jqN4FEciuwpAzINdW9BMp84oScd2niFBwMKbGm%2BACa95DAT%2BVz7MPQi8jwulZ%2F0BqnQiQOLp9U5TfZsd8ZaRYqTo3Q%2BOiBSt9uYEcoAOawSUlOA2YsJ7JVHw0zOEFc5zfgEJ%2BECp5hqiYnI639zi4nsIzJwbdAM15YcKnkD1CC7S9TIKPMQjkYIkkpXjE%2FX0xm7brvz2cfSMqJHSYI0NMeOiogL27%2BET7SY7p6rz%2FMxEkpoWQGpLEWXtVmTo1J%2FUdju2GpgWIzbtrgpyxX5PHo6eRnyMx1j8SDCGvfnNBjqkARXF6AePx2PoT06M8FyKQYx%2BibbXFmGiV9PIwjhMcn%2BeBfX02IEHL4fT3Qc3LvmcJCZSW9PrtidV%2Buud1fm%2BO1G0aTNMyRSJ0Z%2F%2BYshWnzuOs8TXpfd8emefy8Y79sa258wMpwAYF5f1PYY8HNwWkcfmM0WhaM0fMwSzoOFRJ6loNkaPat2JroWN24SLeAoftdEBsKNyJhPSTMd%2ByC2Ny1J%2FatRo&X-Amz-Signature=b4e1b5a36ad793d586b1c7a6665cd6d13d4b3683266608502611a29a46fb6d98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674H335D2%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T101253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDrH2gk5GEcIEa7wR3jL7gZB2QorUEN6DJs%2BawTIbhLCgIgFhvE6K9Kqi8zULe8EYEz9aZfZBxrkP1AP5rfwCXOR%2BUq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDDijuvmP4ufYS3TiKSrcAyqaXjlwDUJ%2B74rs7CncJbm96y1qyc5Yq31XrOZJiIFBjmACQbuwH2jlgbsH2I%2FB8%2FzCtP2EQIK91plY7Oyd2E0HgMFIyLsGtiLKg0IuScdN%2Br8%2BBasO%2FjR9sLHEqLDShITbFezGXIbLDZy2I85kKBbsSAadY1kwyY4d5YSFB0UimBxksnNQ6gybkTX3NOz7d%2FpbFk1ABrD5Erhjyqz%2BYde3VNP3DH%2BZM5GxHnlFHRqj1k0wjUr3U0SKpbiTtnBkR0oyIIbs4zwuEjWIcz0IE16oEgpivTJmnPc4FDkH1R4enw1PAWboQNBKEARf42o6Bg%2BLtGCU%2F%2BcXTv%2FIhctl5X3sIduABXO%2BvlNFhLcPWp%2B5ENUCKDFpfrYsxihYNkdaRrJoiLXifV0Kv2XGlm8OCV%2BDym1XJtECJW5vzlPVxKaisqMONKItfk31zgDlp23mz275mxGApHCKzsgtoGG%2FlMiXVOK831atMmZ07RQm%2BaqHsHWeusOnELi5%2BFX3etJNYefYtC2ED%2BCb%2F%2BWQI9b1Fxm7fTYxmkmArtDDY%2BoMQc9Owiq55o4Pmn9m7JUViuewGI2AUjgCHKXNMy52teghgkO8nvAQ8T42BxqjOFiAHadiqvkyKM4qK0JtVta%2BMKG9%2Bc0GOqUBhucedaiBqYjTJ6xDKkojd5gHKtb%2FNo5UayNvossqTsQYWY36TYZKP1cJ7RvrQBGFtSVCkUspKSpBjLdRinmFSkCOMuFCYnYGdGeRZgjUJcA4TMB%2ByVZnPasHE%2Fq1kgRq0BNBQwdn%2FLYWXuCaDhdd1o1%2FJt0RPUS1C0Gu59F5rqjnf2OTUQ3Er10IHuVL0nBc39RsfLf4WoDExp3lvr9178jWq7A%2F&X-Amz-Signature=da1a2ab3e0eccc4b5e97b8527a17c35f1892b678fb987a58b5a405d42cf05496&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674H335D2%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T101253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDrH2gk5GEcIEa7wR3jL7gZB2QorUEN6DJs%2BawTIbhLCgIgFhvE6K9Kqi8zULe8EYEz9aZfZBxrkP1AP5rfwCXOR%2BUq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDDijuvmP4ufYS3TiKSrcAyqaXjlwDUJ%2B74rs7CncJbm96y1qyc5Yq31XrOZJiIFBjmACQbuwH2jlgbsH2I%2FB8%2FzCtP2EQIK91plY7Oyd2E0HgMFIyLsGtiLKg0IuScdN%2Br8%2BBasO%2FjR9sLHEqLDShITbFezGXIbLDZy2I85kKBbsSAadY1kwyY4d5YSFB0UimBxksnNQ6gybkTX3NOz7d%2FpbFk1ABrD5Erhjyqz%2BYde3VNP3DH%2BZM5GxHnlFHRqj1k0wjUr3U0SKpbiTtnBkR0oyIIbs4zwuEjWIcz0IE16oEgpivTJmnPc4FDkH1R4enw1PAWboQNBKEARf42o6Bg%2BLtGCU%2F%2BcXTv%2FIhctl5X3sIduABXO%2BvlNFhLcPWp%2B5ENUCKDFpfrYsxihYNkdaRrJoiLXifV0Kv2XGlm8OCV%2BDym1XJtECJW5vzlPVxKaisqMONKItfk31zgDlp23mz275mxGApHCKzsgtoGG%2FlMiXVOK831atMmZ07RQm%2BaqHsHWeusOnELi5%2BFX3etJNYefYtC2ED%2BCb%2F%2BWQI9b1Fxm7fTYxmkmArtDDY%2BoMQc9Owiq55o4Pmn9m7JUViuewGI2AUjgCHKXNMy52teghgkO8nvAQ8T42BxqjOFiAHadiqvkyKM4qK0JtVta%2BMKG9%2Bc0GOqUBhucedaiBqYjTJ6xDKkojd5gHKtb%2FNo5UayNvossqTsQYWY36TYZKP1cJ7RvrQBGFtSVCkUspKSpBjLdRinmFSkCOMuFCYnYGdGeRZgjUJcA4TMB%2ByVZnPasHE%2Fq1kgRq0BNBQwdn%2FLYWXuCaDhdd1o1%2FJt0RPUS1C0Gu59F5rqjnf2OTUQ3Er10IHuVL0nBc39RsfLf4WoDExp3lvr9178jWq7A%2F&X-Amz-Signature=c799e7824d1e952708565a73117b4efce1385d4f7b8131c952d8174325e185e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XGRE7YB%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T101254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDSGc%2B8DMN5wXRxEEno4fdPHDCsLdBsCJevWTfmGgGBNQIgfotwoe03YVrJ5PAYETn231WkVqcI6Fz2dMsqW3VR6dEq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDJYwuwRf0NyGqE%2F8GSrcAzdueu05qSXhJelOIop3f81S8f80C4PbbDBM2rllz%2BQELrKrue87ywm1qAnp2xeFgJsSXSFr5dXSKwPOvrMnjyT5bf8SmAbT2fZbAufU7VqNwZ3yNi844ADdbeUhmqplRByZD9XSteeuOEeVzL1T%2FH3UqWJaC1mwVDDtFqfUSIH33t4VaDKhvHjAlIIAZdUErQDCrDq1g4DLRVtdff%2BL1AbOVaq2VGFGxodJZZe1rOCGwbtfmbE6FxvUcIKJ5upCnqkcBzhKy2tUw56u2zLb2wuLK8uomco%2Fi76AgK3I3MQCjRZGl%2F6MAYTfbIeDGvbEQ6TaMq6V4%2Fk4JoHqO8ZWmPf8fEd5SHsVUrtuvMyMWNYHnlZ9F7JQ5orqBFgJ7sbfG4FaeKrciykWlsZReLQ8DZBGX5%2F0PKMop2UoHkCw72%2BQDWiGb5yxSSB4UsXwK8EBrwQiNI96gxcmLtSwYnyhOCP54IH2rIhCDMHvIHbyYRfDFJtMMkzSSvHu1TFE7QeDmfEscqlr%2Bque2dYcvLSKjDAkmk6x3snWEx6JqcDiEayVkQUxyt3Ccb4mlRhY6VfxQ%2BjaxDEeX0fmvmuM8zaoRPwBvAmqS3OW2SiKZ3K8gFfqezD%2FHvCaBd%2FngqlXMJ2%2F%2Bc0GOqUBGw%2F84bWuW%2F6IIdYh9rby8h044GQSg0DPbhkrMALDOoSMqidD0Y0v0cD9XByEgpO525kos2hfkoqVrBfm60oFTNhAYTwNGXNVWWCMZaApdd58xRCppozFU9mmsNO%2BvosTrJx2mqNGmhFYwkYL27ykk%2BY414EmRfvj5TZASeeR788YRP6n4YHx3wUqAvX7lv9p3YQm1yzbth17OJch99xYwKOPLiSO&X-Amz-Signature=218e78fe8220302676e3d142a0e5228515cac9d499fa421ea35847196652bced&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PUAML7Z%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T101254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGMSHKXRzHx0V11SUixGiSrUV5j2WHtIW9ewlicN23EMAiAod671kIQGwv5iE4sdAWsxOcC8ixF5BEimXVl0TY%2BtdCr%2FAwhKEAAaDDYzNzQyMzE4MzgwNSIMcGXHERBhPFR5U6doKtwD7YJSDhCcSHh7665MwkLdz3EWTlVMEaKNc8%2BiX%2FtGVghPYKCslsncV47dSEMw6EXfrS156oeUpWSnq6iz7DccmJqZiQTM4mURdRhTWySHY5kJRjA5qnukDs1nQLdeuXAY7J4siRggYKYPfL7PsrQ5gcYoFGI32HiM%2BUPTzqVF%2B3ywzYP1QMqJvVZQPD7Zji%2BULruRhNFK5Dqjw2C3Cyq4ICEWf1tPaGTzOCA1X1cFwiM7kJZVQHfIKcgeKAZChTPD%2Fr%2BCbRLP6Kl9caUSScobYzMwfgRVXBi33%2FP53bxwWOi%2BZIh0LJ%2BmCN136tj%2FR0EfSKmwV0dFsTfHfa8C7AfXP7RL9SD9hAiPQgQM%2FnWABMUjsC%2BwayKc5EZ%2B7Cy8xL7SnOahJAh5qZ5inOBSBVD7rIT4VJ1JLW%2F9zNNz6NAn159vZKSTI7st0a0Q1XprOVnbpX2AsRFIndRHIVDfB%2Bdrz3Y67LkNZCPO3OO48AC7fW%2B3OLPYle04Wlr5yq53P1EgMUQihQyihLZfolNmSL6%2BkCG2EtcoIXnQFQ39q90ySPs6%2BqGZ6wSt4KbNBxfcGqAWdCzNm4J9N5oXbMwz88tUHFxv4ePQxZ8%2FLTyMyKa94bNniPTiNQAKUBTBe80wsL35zQY6pgGSszcaO98HmGpZBcyHE0o4plb5td7CHh%2BZnRmK3Yp4bgmJM2h3uWsKIvR3JXuwwrumG6QE5S2rS1Nf0gIbkONlTBeA%2FkBDf5rhzAuBPkR6SKEv0WC%2Fkgu2C3hd2ir7DXmk6IBFv1%2F441m5wF3fSG6NTJJ9As2tEpaP2slO%2FfUkzBOCMRQHcmIwE%2FDPhpTYpS13FP5qECYcwejvSkO8H10927ZY1eoC&X-Amz-Signature=2feef2f1ee1f17b3d2ca2d9e5e1cce65a0c670cc5817aff515df5c131d383696&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YFROMRQM%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T101256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA2N%2BRk9gdYLCGJqB%2BJziPZQgS45vV%2FZxtlXGNbrQ3vKAiEAuaIrJduobkP8yCU3z9mUeuE5mM3KaGv27SJ51ml8cY0q%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDLcCeG8HCkHZSQ%2Fw2SrcA7lBjqWeTJjpJHaFvFFua5gAiOFYjG2zBYZfMsmpEZPty1IHyjj7XZSIX1MvTeVOYFZxO6KOKbH9elAfcg54zZly77JQtAXWPnYBMGC6XBWTQfsjg7QH0PN1IfhxRQbkzsXKDQYc7iO4TL8t6SOtSoOXOSKTpghDMTXQwuLG6uYBh6l7%2B1Ck0ucRA92zX5rjmUUc%2Beqs8tdxwnjPAm7jXUuqWC5Dr5gRPq70c%2FLGPobY1HT28zvDpQmG9VPwzLHPvlnKdo6TWpKJ9UwBTDSfjufAFvshfmFeLRgXphlEYmYRYJYz5MTW%2FlGPVzcwOaC5PDs0rMY2B%2FDDnR%2FbeC%2BKOli44cMGTvaiTiefSbFqSN5ByXhXw7lmwb9TbylkiBquugvOg%2B4yfMfFj9z48sD%2FChyagY1FYdWys7Uewe8JQit2%2BCwQLCxkqk4hUNbgrljFxWFFBHbrjyWgdkxfvqgVN8hO11pj5JiBAiqZ%2FM2HMLAlrj09dVn7dBlDwSKj2Vg%2BGrErSzQSRhZBI66XKE3tDNzsHcmQ7JV3Ku2pkjPvgZZPX%2B%2B4DVmIkkoDXqmJc4RVDS1BDkUW4zPBoElHxp6zGTkwbCA8ktINncJnF6PsJxuJO%2BJEb0F9WQtLY9WkMJy%2B%2Bc0GOqUBQ4rqYsFv7zwL1AjHe1ZA094WLmAiaaLOxSdU%2FfW8oQgEP57nSWYB0C7%2BpS9sFRh4uYwt9IE%2FEZ%2FQR19tuQaUVnfRiVvXKCUrssdsBimnmyyVS6H%2FKdFT4VscAMeNkSnaw%2BxVS%2FX2ZJVRc%2BULnk%2FzeIj6xmdoqaHXr9LyXZ3ZAGF6n6ExsMa%2BHFpPVGQOZn7Ev2ZDGmuziR%2BMsB72jaPz4DwdxvSo&X-Amz-Signature=01ebb58cb6733b96cbf5aa911c9998e79a0aee2a989cdfac175cabb135a6299c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPYBPE32%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T101257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCR3J6qDUfQT8WJnx1%2B3Pi4qlzQ2VfxVFGrlH4T4UtEUQIgPm%2FUssDMQnBqZ6uHn7NNCJ4Gk4R0n%2FfCm%2FjQnkJyausq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDF1Eax53ehFI3fZyiCrcA3z4TFWBsJ0ympTbnNjvMZGfmjlmVqXI20p8Jpslk6wcXj2sioTcyyVdLcqk4ioJQkK%2BOIZ23cRpuihYgjiCZM%2BV%2Fpz8siHnYEbYOn0l5Gds8jA9N%2FuooqqauFmkREO9OC%2F8KZxhN9G8A%2Fhl5ETSM4s0KMgBWUXBfsoC6152Kg1k3tRi5EmG7dCGhYVaA03jL7DeTHKnQqn5LH5pohRBELTSr2eXA3cGZqkQjyzMBBYgQnP%2BSN%2FrxaNXSJwchC1JReMSYpsFAzA7jwoLmwBTTgGQt424tXcNTVHoTCzm1GPRaR%2BiE1x1VTsNtBq1p5XMLbN11zDde0ts2GNE1cWDEcHd9eOpxSoHmSTSX59zXsuSOCajbFIIFKm9h3qBGQcUdNVrwt9aXamPvjn66zU2XtevtF%2FKH%2BO3ViDlpJzYzlrSRbdcH%2B5hVoXWihErnuNxN3DpRmpsh2VBVEbSZvvvg0oFsGjxHQiVYYdcNkO9O0wbKv6w%2Bn76TjcKdhj0eIOGQq7Bwe40EKGcVviNZGjGy875YXdjDnhpidiP3oEuIVqDksQA70izui6E8FzQ1Vtb8dLHQp7AlbxtlSmtR7ZCIGx%2Bffoj6T7QiCxDyoVT6tLZPFK9Kr9TjmNlkuhvMLu9%2Bc0GOqUBXUM1puLjqvMhWc5YyrRxcin4q%2FuB14rb%2BNv3pvDUgoJcG8PVJpOrUEu1qwdG0kO8f3tzUai%2BXZFHuSk%2FBKU5F8BNX%2B7%2F7QJzElgyeNgwz08jGUIgiQWi2ZBcyqwHrWPX5FWu70ufai3AnSnr%2FdxOQVgcGj8ZBQmgUFA1z%2FBMY3M85lfV045Dp9CU8cxPt6qprVc4%2FXbQxLjcy2A5EsaRY4WHGmbM&X-Amz-Signature=99096f8b103f5653c75d91c52a011379507dfb096602d39a02402dd6428a4c2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPYBPE32%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T101257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCR3J6qDUfQT8WJnx1%2B3Pi4qlzQ2VfxVFGrlH4T4UtEUQIgPm%2FUssDMQnBqZ6uHn7NNCJ4Gk4R0n%2FfCm%2FjQnkJyausq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDF1Eax53ehFI3fZyiCrcA3z4TFWBsJ0ympTbnNjvMZGfmjlmVqXI20p8Jpslk6wcXj2sioTcyyVdLcqk4ioJQkK%2BOIZ23cRpuihYgjiCZM%2BV%2Fpz8siHnYEbYOn0l5Gds8jA9N%2FuooqqauFmkREO9OC%2F8KZxhN9G8A%2Fhl5ETSM4s0KMgBWUXBfsoC6152Kg1k3tRi5EmG7dCGhYVaA03jL7DeTHKnQqn5LH5pohRBELTSr2eXA3cGZqkQjyzMBBYgQnP%2BSN%2FrxaNXSJwchC1JReMSYpsFAzA7jwoLmwBTTgGQt424tXcNTVHoTCzm1GPRaR%2BiE1x1VTsNtBq1p5XMLbN11zDde0ts2GNE1cWDEcHd9eOpxSoHmSTSX59zXsuSOCajbFIIFKm9h3qBGQcUdNVrwt9aXamPvjn66zU2XtevtF%2FKH%2BO3ViDlpJzYzlrSRbdcH%2B5hVoXWihErnuNxN3DpRmpsh2VBVEbSZvvvg0oFsGjxHQiVYYdcNkO9O0wbKv6w%2Bn76TjcKdhj0eIOGQq7Bwe40EKGcVviNZGjGy875YXdjDnhpidiP3oEuIVqDksQA70izui6E8FzQ1Vtb8dLHQp7AlbxtlSmtR7ZCIGx%2Bffoj6T7QiCxDyoVT6tLZPFK9Kr9TjmNlkuhvMLu9%2Bc0GOqUBXUM1puLjqvMhWc5YyrRxcin4q%2FuB14rb%2BNv3pvDUgoJcG8PVJpOrUEu1qwdG0kO8f3tzUai%2BXZFHuSk%2FBKU5F8BNX%2B7%2F7QJzElgyeNgwz08jGUIgiQWi2ZBcyqwHrWPX5FWu70ufai3AnSnr%2FdxOQVgcGj8ZBQmgUFA1z%2FBMY3M85lfV045Dp9CU8cxPt6qprVc4%2FXbQxLjcy2A5EsaRY4WHGmbM&X-Amz-Signature=d0917d2f5c937e46ac0f9f41be7f1ee4d3e72b75cc8f2b5ddf72d2e9ba1e478c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QLY5TVH%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T101246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBo8tmrvY5CiKh5Xo%2FAAKd%2FbgRznTVs1x6%2BFXHKKxACqAiBtaDwUgu12LKMRcur4m3j6AgxnDcNoo7WBozUWZehenCr%2FAwhKEAAaDDYzNzQyMzE4MzgwNSIM65coaBd58XRPRV3lKtwDPZPOBoWt37NncZND82gm%2FukVQsZhpmQx4WD9jt3IYnMiQmdoYFw%2Fn1tuGHadSMpsiZorZYR54dTK1fxLVpcuhFCtqa6lsKnJC6T6A4MEspfr69B7UvFD9eCKNUUGmQQSDZTKtuPwohMnDprmz1l%2F1NaryepLQjsXOrzj4TmHq5moCopD9WRvxcRFanyDwTm15oT7dxVbJhcdAAzlbggwc22wWGoMgW%2FcQKqWlnrMBvAdS9BZILq0LySx%2F5L4WanGyz%2BJY1T2oVY%2FZXYtPNc3Kmi3Njlh8wKC2GsDM1wRbYAfkzvwjgSqOLUL56k74F0QRhYtpIv%2FVht9Rx8X1Hg4zbC4LaJvAbx3KKMU%2F5Nk54UTCNGgUsPzXcd%2FD4IaUhq74AKSiAGEQEHUOURSF1wGznTJQlPxohwgO6pxcLvd%2FmMsMoMURa03Ij0DT1bl8ZPDW4QtKzZyiWIeul8FLqgtoqkU2tSGgpoXjF9eYEz4VdZWYOoRnNi5C0Zf5HgzAeAwdlJmWrVaw4l6NhlL4UHU%2Bmr4lER0LTHmbH4HBMimeQFNPki1kMK%2Fz7TxEptAmajP8XOsIgH5Cc76zmsEZ6vQgseBlFKsHjEjpY4CntKfY4Uxt1NZcGC2GGMTmmkwu735zQY6pgFg3R3ajKY1N3Q9X81T83BbvX2CDhYVVIx%2FR4%2FUACz%2BTNZ7xkW6JaDqIRt1dBqGmOL7U2Y8ABQH2JuD1si4641QsAhgw9TjGKJhUQrpL%2FAekRgyIDMnvQ9Q4YjGB%2BOp%2Bq%2B92Vj%2BYf4SmhbS8%2FNQuGKYWUzyjEOZiysgOQykXGCRPbwLkvzfGcceI1pX41YwsivQAXPdK1U3gWtmYKywJeCbG1FoskaX&X-Amz-Signature=9f2779755c6cae14703e7853cea2c569dff5fc90378cca814d5a5241e15cf752&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4RTVCFA%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T101300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC50YIsShb2K0L4xlLzDYobJny5pwfse67hX3khSVI%2FRAIhAMjm8xuVogLDscG%2B%2Bw0F4l7HprpOxH4ZX4KVm6UcyRh1Kv8DCEoQABoMNjM3NDIzMTgzODA1IgzkhNJAFx2UDbwyC5Eq3AMlB531Vsv5nNHjPJ0W3GS%2F45PRvWSBOoNw%2BkK0A%2BeAU49XkJn8ZqOPhAVKi%2FsaB%2BRJOC5SFqP1PaZ1lPe9tSUc4fKZ4rnC5H3x4SLv0f7qC02RQIH%2FSU4lnb3IKMMPybFaUQzUx6AUqsKjbpe4BNlTIZ198FMkKjIODCmZf5mMQH4ZVZ8CdS10V%2FUCE00tj2m3peZzCCJoLHczOpYeO0KIDQ8X%2FIwrmKxkC3XTHW4aSBMg5vey8XbJ4aJRbDorcBXCB4LGMHQ479cS1j1kz%2BMagtubrgf5WeARcTzxmIiaO0h%2Fz7ZoGzVYk8OjvkpfBnYsKpYND1bjQYtk%2BVT51aYcFuTzNgN%2FaObK2%2BFfcIb9PshtGIT9Un6jrey81yVs2U9WCHDvZpZzPAShQaEGpltQArxoFYBNTkHti%2BudeSampv8Dcn3Rt5iNO9wG%2Fpd%2BML9iA3ju5fzsMAIhAPTP5xYRSdW%2BRkGwuFFfobu68PaKE0ctlFuHDF2Ui1yAXJNil3J9knBJuiIV552KtOxPGs%2F6mHt2qh3gisFqy1KhPhB4NhAV2O7xrFiEGKl6lh6SonLWXN9S6jeM5DRIF6e4O0Xp7V%2F0Kxt1ukOWdJjHAOIt7%2FjVp7drmxghSvdrHTDrvvnNBjqkAWQE8UU3EkfKLTrJEGtodEYMmph7amKGZG8%2BysP%2BxfcvyTNRqA402HED6%2F6FuIuO6jcs0ERngkgB8qP0Hfra5e43AQnpgbvSDSfpe0GyBrbw3d6Ar1RloNZlSmE9JaM6OsxbsQIxMYd3WfYaV9maqJDpD8Cb%2FCXOQ%2Fp%2B3GXPnK%2BxyfNvwrXQa1jDXGfAqTeMyzuZC5DNkWA%2BV1%2FypGJF6ZVLkTiC&X-Amz-Signature=8a03c6f8efdc083c781ca38c29740ac52e9ccfb3ff59b3d0ffa71872024349a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4RTVCFA%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T101300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC50YIsShb2K0L4xlLzDYobJny5pwfse67hX3khSVI%2FRAIhAMjm8xuVogLDscG%2B%2Bw0F4l7HprpOxH4ZX4KVm6UcyRh1Kv8DCEoQABoMNjM3NDIzMTgzODA1IgzkhNJAFx2UDbwyC5Eq3AMlB531Vsv5nNHjPJ0W3GS%2F45PRvWSBOoNw%2BkK0A%2BeAU49XkJn8ZqOPhAVKi%2FsaB%2BRJOC5SFqP1PaZ1lPe9tSUc4fKZ4rnC5H3x4SLv0f7qC02RQIH%2FSU4lnb3IKMMPybFaUQzUx6AUqsKjbpe4BNlTIZ198FMkKjIODCmZf5mMQH4ZVZ8CdS10V%2FUCE00tj2m3peZzCCJoLHczOpYeO0KIDQ8X%2FIwrmKxkC3XTHW4aSBMg5vey8XbJ4aJRbDorcBXCB4LGMHQ479cS1j1kz%2BMagtubrgf5WeARcTzxmIiaO0h%2Fz7ZoGzVYk8OjvkpfBnYsKpYND1bjQYtk%2BVT51aYcFuTzNgN%2FaObK2%2BFfcIb9PshtGIT9Un6jrey81yVs2U9WCHDvZpZzPAShQaEGpltQArxoFYBNTkHti%2BudeSampv8Dcn3Rt5iNO9wG%2Fpd%2BML9iA3ju5fzsMAIhAPTP5xYRSdW%2BRkGwuFFfobu68PaKE0ctlFuHDF2Ui1yAXJNil3J9knBJuiIV552KtOxPGs%2F6mHt2qh3gisFqy1KhPhB4NhAV2O7xrFiEGKl6lh6SonLWXN9S6jeM5DRIF6e4O0Xp7V%2F0Kxt1ukOWdJjHAOIt7%2FjVp7drmxghSvdrHTDrvvnNBjqkAWQE8UU3EkfKLTrJEGtodEYMmph7amKGZG8%2BysP%2BxfcvyTNRqA402HED6%2F6FuIuO6jcs0ERngkgB8qP0Hfra5e43AQnpgbvSDSfpe0GyBrbw3d6Ar1RloNZlSmE9JaM6OsxbsQIxMYd3WfYaV9maqJDpD8Cb%2FCXOQ%2Fp%2B3GXPnK%2BxyfNvwrXQa1jDXGfAqTeMyzuZC5DNkWA%2BV1%2FypGJF6ZVLkTiC&X-Amz-Signature=8a03c6f8efdc083c781ca38c29740ac52e9ccfb3ff59b3d0ffa71872024349a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGXJMTDK%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T101300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDxdA8emOK19Gq3DD7fkQd1YLrAbNsfCxVP021hl90HUgIhAOI6UPGKQeqm8MQ2YRnDr%2BHDhWQGGO1y2MTii8Fd77MVKv8DCEoQABoMNjM3NDIzMTgzODA1Igzy2ZmezzMn1%2FjMhDkq3ANbWbDnGyv0xAFZtEuaeb3Ze4LEIp6I8GGYPOCj7AOqI6zNsmynaYZcq9915cVQsEOwJ3ZsehQpw%2Bisyn8uW6wFOpz%2BC8fxqxFqRTKWTneqe4v7hbyJjTxtbw%2FPQVFpNYKS4mhdRMoIE8VwtVgbyvsGAr%2FF2OgoX4BgCU6Ct3y5asD9Ky1TxVl%2FmJbpzchi2hDZnmTk294RRPiFAuULmSgxg1c%2BWQRubKIelZwCYJ9Pyq9hxelFejmL3DdyBmLgIg716lMrEEysHdSVa2to%2BodJtOj5azTY%2Fa8GXIIAkleqdxw%2FcSr%2BdKXy98%2Br9ZLZkNqOH8cES65S8LVKFV4TK7F%2BeBXnfls4045L8XT3YVXqv7LORn%2FMHNwq1wHXvUaCVwerHqF5H%2F0thPhRRTcLPOBObsg%2FBTiB481rUABubXtcXYGJsJ8XrpARRzeWIL4GT7tVLw3pZuioJxtD9VABC2rMGC7Y2WU%2FGlbBj%2BjoGZZVSob4%2FTt5Z%2FKJkq6cK7zjWwg4MMsFWnAck71y6VQS%2BTDxY%2BA666Xvq509MyTfoE6XnZiMgLR0YS83snbM%2Fg7R5JVlqlQCg%2BxwhYil6yGdOOXv%2FYNfMZJ%2Bi%2F7mR4wo8Jbejzfk0uRnK87O4ygPcDDfvfnNBjqkARZF%2Fu8BiUvDoTyaDEHiHCqRXdWoYxUNriAjIjuq99QoROCskxlLda2V6QaUrgnOmg3yb5Y9WUyBbVTrqPkT%2BtSi4%2F6U1IlcZke03YPTanA%2BTmgPcb%2BOy1%2Bwk6AHkUiP1h7jECXhBQLBHJOCCxv%2Bvbj5F8NqdINuvwR76KJDmTgoSi9343RsCltMKOKAxg2FIFJQa%2BfxX5YCDeaF%2FeY1Cuow%2BdvV&X-Amz-Signature=f56644a7ffccd8d3cbf437af0f8617320c5562c92eeefbe24b8f59757e416618&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

