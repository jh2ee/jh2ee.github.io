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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SC5XSGPM%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T111216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIHhYofZFqO4tOOOlWc1ghlzjFOS02JqaNmLTI7EtX9mfAiAZBXUOBFutXSrNoGSHQeNc4sIGSxhCmSnZfrCayQ8ubCr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMyCVCZFn0j8QO3dt0KtwDvvqKgf%2B2aZ9xCizYMkfeVjXMLXLVdrnTIzXMKoHq05C6II7kkGQbFEGBtAz334T4HnZlk2ndCgH5p3ITj%2BoCDm7iv%2FjZ5gcNyeIT4CfDPqeuIDv9zaviKM206mP0uWC%2FLuCmUHMSeGLJL7qFQdfN6MrCHItKYfhrqJBMgO3tkFuafBfhiQ4aFMU%2BlmNKUTMdbc1q0sUgb0O37r%2BkCK16ZQgIvdh5h2s%2FRPclIzpLQMD%2F3bJdofRCesmGyKDp98AnG8U7F0Tq5cac0mwXF3oTuSuZGVMToYLU5btwZRW9JlM5DRfTTjfBvwAz9mNeFJrPy4tY16XDKHiTWh6joTYfHf9I4Ft8cvYuMYnhOcol1OgMpVCc9rbWdNjG%2BiLMejdIcC7bQooGKLkcSjt9Rr4YuRRR0zofV4jlEhzoImIhkxlayH8%2FDDNtNK%2FwNsIX7NPkg6eiKWPrcnCbVBU%2BOYES%2F8gJ%2BW7%2BALeGT7kTIyfbPqIflCgOVCvNAHvWPfDvivrVf3TotSKNpm2TB9OjdByDN1bzQlgmkVTCZ5ZFSOTUjxVfx3vtgLQBE9FXNVASdEags02iM1caWj6M2NGmQigq9BUlu1OWa8ohjLbO40A8VcNcDUTJ%2BmULs2YWm%2FIwzc7GzAY6pgENj4oe7EXC503NLshUuvO8vm%2FqHQC78GxcugudomnwoKz9ct6m7UyTwFlm%2F6XI48dChcsmqPLEkRK21%2BPKu8hPdYsJZwruBuuQi%2FNNYFHJvnVN7qmzoPAAdZ28Df16rvKaP8Ym9xIN9eMB1re8O%2FVcpSwkFa9cisGhtrilPNaf7mELwCVdMP3mmiU4JS%2Fu76M1IrgvwLSpdDuDwf0UbZpVkl3%2Bnd%2FP&X-Amz-Signature=2a8288a241b043cfcb3beb0f3bbc5015682ac678185c1fbd45bdd081ece53da0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SC5XSGPM%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T111216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIHhYofZFqO4tOOOlWc1ghlzjFOS02JqaNmLTI7EtX9mfAiAZBXUOBFutXSrNoGSHQeNc4sIGSxhCmSnZfrCayQ8ubCr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMyCVCZFn0j8QO3dt0KtwDvvqKgf%2B2aZ9xCizYMkfeVjXMLXLVdrnTIzXMKoHq05C6II7kkGQbFEGBtAz334T4HnZlk2ndCgH5p3ITj%2BoCDm7iv%2FjZ5gcNyeIT4CfDPqeuIDv9zaviKM206mP0uWC%2FLuCmUHMSeGLJL7qFQdfN6MrCHItKYfhrqJBMgO3tkFuafBfhiQ4aFMU%2BlmNKUTMdbc1q0sUgb0O37r%2BkCK16ZQgIvdh5h2s%2FRPclIzpLQMD%2F3bJdofRCesmGyKDp98AnG8U7F0Tq5cac0mwXF3oTuSuZGVMToYLU5btwZRW9JlM5DRfTTjfBvwAz9mNeFJrPy4tY16XDKHiTWh6joTYfHf9I4Ft8cvYuMYnhOcol1OgMpVCc9rbWdNjG%2BiLMejdIcC7bQooGKLkcSjt9Rr4YuRRR0zofV4jlEhzoImIhkxlayH8%2FDDNtNK%2FwNsIX7NPkg6eiKWPrcnCbVBU%2BOYES%2F8gJ%2BW7%2BALeGT7kTIyfbPqIflCgOVCvNAHvWPfDvivrVf3TotSKNpm2TB9OjdByDN1bzQlgmkVTCZ5ZFSOTUjxVfx3vtgLQBE9FXNVASdEags02iM1caWj6M2NGmQigq9BUlu1OWa8ohjLbO40A8VcNcDUTJ%2BmULs2YWm%2FIwzc7GzAY6pgENj4oe7EXC503NLshUuvO8vm%2FqHQC78GxcugudomnwoKz9ct6m7UyTwFlm%2F6XI48dChcsmqPLEkRK21%2BPKu8hPdYsJZwruBuuQi%2FNNYFHJvnVN7qmzoPAAdZ28Df16rvKaP8Ym9xIN9eMB1re8O%2FVcpSwkFa9cisGhtrilPNaf7mELwCVdMP3mmiU4JS%2Fu76M1IrgvwLSpdDuDwf0UbZpVkl3%2Bnd%2FP&X-Amz-Signature=2a8288a241b043cfcb3beb0f3bbc5015682ac678185c1fbd45bdd081ece53da0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466REG66HGC%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T111216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJFMEMCHx8LPtW2g2ayIPI2VyuyU%2FC%2BxflnFWLK43Ir7bJhwN4CIFNfIuyjGjMZj6WvrgskCFf05JflQ4AJpmzYKLo775YyKv8DCBwQABoMNjM3NDIzMTgzODA1IgySWD%2F2zBpDAGIFTLAq3AM%2F74HHSa8FYOFUKBr8M6BVwUJdlmY7797fZimrU0p%2BJyrg%2FBk8LrbRZI70pbnymtbaodINGZnYNVetqZ9b3ve9E9iLnbHqRNtfZlIrEDK87jiquUmXWAuBZTIP3FnCyX9L440vR%2F7OwliQvcd%2BgEw6j0n1fZelE0xPTmGGMcmo%2BjFUYjFA8ACzN%2Fl8cOqYZ0KGMUWLSkqFXCoPwcsIIlR8Hrmpj7XKA6dKesKvNzsv6fyXY5%2Byhd59InsXC1dDUdA4nawQqSCqbeeODOeiXQwk%2BgAK9n6t3sTYSrp5dNjY63MTlbLKSvpMlT8rqvc%2BFC0APXvS9dSJ8UmhAIWG6rEMbHbcmVVt09A5B414m3BOyYx81rOV1OxM6G7f30MSMygFGF2BCdoipAwRhkyalzX2dYWVd9pVHEpDr3fACeEOxO4%2FUdx3D5%2Broo3PPU7olZm4ii3WBxlYDH2byMxdz7UYhvufuuiN9bhHnSn800GThpr7G0XCyBRMcc1lA8uKCthe7%2BtrEmPzBD%2FryBsQn%2BM0SNon0%2Fajm4St3xBJXKaTjSabYZRySUZY60hymeVb5y%2Fy2jZVHPoB7OLpjyHHWNACCRp7hWgezHhsSN7Dsyv2gMIjOR49T8x2Tw5mUjCozsbMBjqnASzTLN%2FYUf%2F%2F5B1tt%2FNvbgzqH%2Fw8lnYHNEp%2BOVSMKLpJG4R1CwLI1BJNURwI06flWyJSAkWRKgD545%2B1iPEUM82DkEh5LEcleHHfk1eEe1MDC1j13rE4Ego5TVzUUa7KlLuDgSLC0ULE0K2HwWhmGpo8q7pppJk0sjVbhk9lLRtpUQN%2BzKrUAeYo1%2B3iKkc8kEz7DFTbogS5TxcNmTAsppfAbDCtZejv&X-Amz-Signature=9de6283bac3c2771df2964ec790718719b1a26ff8228e2bf08df1315aa1d359e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDWFYYJ6%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T111218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQC8O8%2Fyo3QeTpnQJj0yxoTkLeGs3%2Buk29JvtFuAE6LlIgIhANrOH8j9xYnqSiF4Kfd9FOfpLsAVAaRoSCuvI6%2FN5Z4JKv8DCBwQABoMNjM3NDIzMTgzODA1IgyUTBmXDUlaJNv9UIUq3AO7XdWNumlB5duhTwcujsc2Yj8FsxGjdeSlU9XTeeCNgw177POO54j3LaPCL%2FY4Ta1HHaD0SRYwhfJSzwKzcvLS7tzxi6jnNzyBghohat8HVMerXrqhAPp8dp6D418KcuoW%2BrJZVgumMBSri9eBiZGqjHcZUqeZsqKyvpeUfJUcE2z2C5F9%2F6k%2B%2Fx1zN0i9pMMf12tCz5FLeCA2BW9YjtC32ciGvSxQRtpdYV6qtKrYvzydfN%2F3K2%2FdeqhmyLXeOoFAtWvIodnLpshBFTd1TAdZ4ZOcn9EDsvLJC6rjRLNJO%2FGqtKyOU0HWmJj%2B2ofzPqMs4PwvFb0cJ4tWj3kdjC9l251SHPTKQYXLnmPKXcnjCQHtaZUobq0TnamKUSECogbDzOW6H%2BwJ9e%2Bl6scK3bj1fmiiG0W8KHmkvOrIGJ9KdkwnPYQpT5XGSmDDdQhOTkaSzT98RdMgunVo8TyvLc0x2HaQIdJMpN7WT1QC7k2YOY3TGQIU901GGYimljtyu6FzxGJ%2BLUG9seE5M9rEGGRl8qumw8OYEhyMaMlbcBHqSJbzMzJ8frS25c%2FroWMLXU9SAl1Qre0cH6vARuRNR1QdmWtiewEIqokahBEqnVgzqkcFBbZPXF%2BKq9FcbTCezsbMBjqkASy7Xz9TqnbatqeeB%2BcZimr6femIrF73aYJtMLnhDgTnM%2F6eI41a7JuT2byqPLKHrDSJl3mjQsYJE7U8msM6ahh2N0vsdd2lOuD33BhLWHoLX%2FKgHY7ZntFWnc8PujTERpMX0BCfEQJFK19SDd2B262U10oL7XFydplE6JKSYPpvm48NbxzWMnCT6ReRXS0LvMCPaibKta6fnyFz9uDKc8wHAwh3&X-Amz-Signature=afcaddf80e5aa628e37c4e3cd29e0c50037fc3d9c12df4890819133810403166&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDWFYYJ6%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T111218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQC8O8%2Fyo3QeTpnQJj0yxoTkLeGs3%2Buk29JvtFuAE6LlIgIhANrOH8j9xYnqSiF4Kfd9FOfpLsAVAaRoSCuvI6%2FN5Z4JKv8DCBwQABoMNjM3NDIzMTgzODA1IgyUTBmXDUlaJNv9UIUq3AO7XdWNumlB5duhTwcujsc2Yj8FsxGjdeSlU9XTeeCNgw177POO54j3LaPCL%2FY4Ta1HHaD0SRYwhfJSzwKzcvLS7tzxi6jnNzyBghohat8HVMerXrqhAPp8dp6D418KcuoW%2BrJZVgumMBSri9eBiZGqjHcZUqeZsqKyvpeUfJUcE2z2C5F9%2F6k%2B%2Fx1zN0i9pMMf12tCz5FLeCA2BW9YjtC32ciGvSxQRtpdYV6qtKrYvzydfN%2F3K2%2FdeqhmyLXeOoFAtWvIodnLpshBFTd1TAdZ4ZOcn9EDsvLJC6rjRLNJO%2FGqtKyOU0HWmJj%2B2ofzPqMs4PwvFb0cJ4tWj3kdjC9l251SHPTKQYXLnmPKXcnjCQHtaZUobq0TnamKUSECogbDzOW6H%2BwJ9e%2Bl6scK3bj1fmiiG0W8KHmkvOrIGJ9KdkwnPYQpT5XGSmDDdQhOTkaSzT98RdMgunVo8TyvLc0x2HaQIdJMpN7WT1QC7k2YOY3TGQIU901GGYimljtyu6FzxGJ%2BLUG9seE5M9rEGGRl8qumw8OYEhyMaMlbcBHqSJbzMzJ8frS25c%2FroWMLXU9SAl1Qre0cH6vARuRNR1QdmWtiewEIqokahBEqnVgzqkcFBbZPXF%2BKq9FcbTCezsbMBjqkASy7Xz9TqnbatqeeB%2BcZimr6femIrF73aYJtMLnhDgTnM%2F6eI41a7JuT2byqPLKHrDSJl3mjQsYJE7U8msM6ahh2N0vsdd2lOuD33BhLWHoLX%2FKgHY7ZntFWnc8PujTERpMX0BCfEQJFK19SDd2B262U10oL7XFydplE6JKSYPpvm48NbxzWMnCT6ReRXS0LvMCPaibKta6fnyFz9uDKc8wHAwh3&X-Amz-Signature=d9622c661b3aefc70ee26b8ebce29fc80e4cd439745385d1acaf340fba9a89aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TBAXK6V%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T111218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIAtBVp01Xt7T7HqaclMnazXyuTjocG8byaTFJHTD4y39AiBSzRy2FxcYdkjQR7Hz7LYtyduJrIeeUbROqw5B41rQWyr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMirmDtDkvXJJwixp6KtwDVrGlkWLJ%2BDn4jkC0DPNVhYnPs%2B6zta6bILfBcfK4wNVyPOidUzlsLHMMa9%2Bsn670P9VcPjRxMqGQ9KZnlsYbHzfF7kabe%2FS30j%2FwsKBTJMmxLIXkqeepLs0%2FJYqq27ZKZzEKdL1pnvArNRUdnc%2FCOhhUpylL50pv9fWEEJ4xVc7vkkuOTPLjKS2ZocpPLey1T%2BhekOU0CZG2jnvHYKG4OSdqCrrbwIbjPWhjY%2BG2gqCx2cASl6k9aDkSvHpyc4nPcwMxr3xSvovsi9SinPIpzKvC%2BMPv4Cg4oh7z8aNDvo%2F2d7tThNyopzUAMwKFrAEX%2FgJfEVS3bYJhRNbvH6nc1CZjesZVXI2LpqhwauBoA7DgqoOLkL5UJT895bqvhvBdT9rs8oiQxH47K%2FaUwotvKTsKXMva9Qd3rwF0S4pHdAahUQ4wIOfdU8xWSUEvKZ2ACI6En0IDuIpYMiGoTyTariqLGauDsIjwCXxp49JiDO4L3HTrM%2F1By4y%2FOAf3O26ujlY%2BoLOiXO%2FQ2acsI6cBg%2BdMWuc%2Fmaf8sYj9axQL8iEtyIfYu79k4xd11sFkSR6GyjnvFSnvfoYCLKPrB4eASbbRxCNGOE13%2BpU0iJZL9GQ%2BXUafGFUj9DwSE9Uwnc7GzAY6pgFXBzHftAcxLL2mkIC7NnLa2VMX0X1ofZE9DIld%2BJsSVSgBxQVDEUP4CY8bF2gYYLWih210S8UaO06Ta4wHnwLtyMhlkrP0cyxoi7YF516k6SBcexinxTbbCvxG%2BCPd3MKX76E25xERdgps7QcIdpmm21%2BlrpA5U8xi9MWbslG4Aqibmn9x%2FYDiOfVL8bZSalqQT74Dr7rDVlZT85UfxFBtYN9F3COh&X-Amz-Signature=2a7833f92dae0f3fdd6f5de9f9d41b7172662d124e19234500455655d8a99114&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625Z4GIDL%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T111218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQDoYLmwrzdM%2Ftp2MZvPqxF5wOKWYCPqJyzAGiiaSRDDPAIhALQfxZvgOxdRvycNGyilWroDJxDCzmHnQCJyGkwuVd3pKv8DCBwQABoMNjM3NDIzMTgzODA1IgwxsVS8OqSIIKNFM0Uq3ANGVxeyvTMQLZIa30fLcmeHJ1Ffrwdn0fEGEQl5Vdyf574%2B6AoscjZdnTxqg3XlN0NCFU0H1vebmHwpjaWFkVnYPofjjCQHKOG5HuhvcXOB0jmge0tE4ADH6JUi1%2BRSCjnYvDxo8guChCcUsFdIJU6KB6OskbPqVq%2B0w%2Fl9Itji94g5r%2Bjprkkk7V4UH6GAo0AchA9RH2bQ%2BcKTwMCgYCswupc7GqQ4MkDFesczhMh7lV66pCjWnpHGINFOPwHcie%2Frru6PW9D%2B7PyTrGLxPlegBA5ZGrTNbKbwhVPxeFh0qZTksiUU4k4p9%2F3Mb4%2BwgQlRf8QCM4yrEWec1EQ2JBTTjSraXnsdlk6b301qNdrMh6ahGqKtHOjC%2Bpaqn2pTUc5A9zwzxjdcLZnYj7nFcf5zes%2BQnidZMhwjVlKx14xPM%2B0JXB4ac4UzRANS%2B8DTZTQKobzcVzJ03xARCtNu6GGrbyBIpuWveYkHnZDtNI3lrAj3mpi8IPD41YVIsVo%2FUtSPl%2BuuKkK7EpSxHB1Vv%2BW1gUctgPm5sQuSoEis37iwL9bgqBUk1sJNm7bz0Jr1Lsq0eZ7ahHHaoqv9GScVQjUbEiw1scmcGbEEQ6JK4CWDVvmp8rZ0qhFOJXW4CzCUzsbMBjqkASRAqDbE5pbCDCJ6qDBUFrZMbTxN3nEz6tlJOFAYwQ3HEfTAmgx7qRL4ePqwDf4w8%2FanlQ6ea%2BcMSvENSg5viB%2F2M0R%2Bik8wPsv2iwXyVAYaeiHlNg%2BhsRqXUwF4K7Z3CL3qkJflfpLTuafSyY6l%2BoVD23UsXmT8ttL1ZEiEmILZ4evStSVml4KmyDFJJiCMdgMW9VVvi1t2%2FVIWBGWaOhd86Zvd&X-Amz-Signature=9f7d5fbe18c9fb7c959894596f6294e27af11b44abec3d53a13c2cd5681272d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q3K4HUMG%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T111220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIGq9kMGZKvI8GnxkfdN2jgbUhmKcpC3kAN1oEHGyr%2BeIAiEApB5J1OBEGfxPSt4gmy66OXg3a53tuaeyswNY%2FrUtCs0q%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDLLo7keS22a02xfiTircAwgevek3mWwqWU%2B%2FYYADtftudHr6USHh5oRu1xM1V1KELyqLv6njxISDwq0RvLU5dNGxOdvkGdjBvkmYOb3tDSQyYj4cWu8auEpAiBkYgRE40S8hMv0kSU5nsNAcbaGsRgzDw0w47hC3kNcfpvhYrL8wfs7OQ5%2BoMP%2B2zUKjCl%2Fq2QsaZ6WJ5y6qU0HguPjGnwjTsfBy1n%2FK2Xc1oMtTy0nibcKkVScY%2FpWHbliY3wl2VR6ffMudPNrwpOMMy7YXaeZvzREa6HkpUFnEjJ8dia1E2EBIRkdEQCTs6pmsfXpIEwg1tIhBIapUK7Z556kRfuvjU%2Fg5rjmwqOxT5BRtcpabqe%2FxPxfGcF2AI16e4ADigkYh55Ycjf8UCAraRK87ZaUHT8yult29dNZ%2BSn47Ue%2FhjyB%2Fw13DV%2FIa5ZRVXt1zf7%2F53GwipQ%2FbNZcCCkvR5MyP%2FgtV4u9Smd6%2F2nIgQuir4XCFwEm8Q%2F6JL8937zPS7jaXxHxLnQCxylbfNbUUpmCYODqmWrID3A8uoCFVjoNj6yPhCeVjUsG0hoEovDgxc%2Fty0iybjSPpk56XsNWgu48kSRFoSRTfwEyuGPtQdAkWHmLZm6VrckEZHUiyUTrFtoCyipH2HImiElDIMPvNxswGOqUBEuUuEhXICKYEPWjmo9a%2Bmt%2FL2NCXuAIWkoT%2FyJvsRP1p9ey3OM%2BBTTmwuU0Q%2FMSG7NgGttQLN7tSdaXtq%2Bk%2BsZiXm1S5LC4wFRkoLzVx1Q1yobDstzaYcRaAmh45Ql3vOHxLyIbAVWji9H40gxF0osYgwSCBxGQbHvADww8VtiIm%2F%2BT57NyuJzsfl4xLWQm4rm4ZMdOyw53GXD8JF8qyG%2BZ9ia2i&X-Amz-Signature=9017e1c43a0f861f8b5f1f9aeabb5ff9892ac5e7266ca0490a1a866b33a08a93&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYF22XDD%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T111222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQDQGoxtrw9tvHzU5wv8hNyW8Mb21SGWNFjFtYRJE%2BAgIAIhAKvRbuBQfvcAFET%2Bb7ztdvTHECPqJwxHSEXhuH%2BO1jvQKv8DCBwQABoMNjM3NDIzMTgzODA1Igx5HdADolIcT6qae4Qq3AOdJz8deodbb5LR2ZhFs8vhcTQMnc4KecTi%2Bbi1ahSMjwU6qV6lvxIk4ChlflcdbX7VwXR9QEXmsTqoeUpffh%2FAaH3HWRRRqnhdcn8JpdnuhUcW5TvO9dW%2BCyFXBemNAqX6NQyaCvqv0ixgSm%2BvMl9nIbdRWIjxNtdBgCEpWKCkXf14MCxuWeGKNOLfWJinlkgfJ%2FxS7n3WXoTmxFYtAg4j%2BL69lZOsOiauWQgh7tkHd%2FmWOcAdM5PM8aIRxSNDbUUnrDKA3fZiLgZRTiliJvcr1%2BDI0dg56242g213iTznzC7%2BTU%2FqHkPpoASRdlOGhfTWOD5IHpG27S9xiPSrhy1%2F9XNlPSnBjfTp8yIxX5y%2B3DRN0OFO92lqw6gB2qHmNG8DJJNY0CvpKItU7c2iOKCTZiOUU0KQ2pd%2FvGIZ84UcBfqXjgUz6G1RtmgokxYucElToGKZs1QdI%2BB8JpJYaThJf78YIjkR4IhyKFopZJBJaAlUkBpNTkv5tou6%2BbU1UKeLkoVu8QcJ%2FdkkzmGgRmif0YV7C4jvv8bd6muxyeuESSvEd6NBlCxCGKChSqAMOuz5T5InRRv5MnCB3U3UHdipuom5lPfwco7QTch1jp1%2F95iqSKi9CKNkFq4gbzDjzsbMBjqkAVqpvxdJkoCM%2B43FtvnLwrNcMP%2FPiDqWZkmpHvSKOmk0%2Fgl1AvpYIsKLrudsgQ9hCajC3IHqzfHv3h24jeFRh3Wcf%2F7i3KnXNbDAEl4YtvfUHUxRg3%2BeJoh4%2FX2TF7WWlJkT2EVjdmh8XHxI078fWCrWb4k5YHxtFbr4vKHRmAGDxFpSG6JHZ53ARdYmSB1vZC7%2FyuM4FPLrauSNj18tUM%2FSCVAr&X-Amz-Signature=1edff51a9566e3f9fa22e10de3364e7fc1acb28125da1886c58e30120aa45a09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYF22XDD%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T111222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQDQGoxtrw9tvHzU5wv8hNyW8Mb21SGWNFjFtYRJE%2BAgIAIhAKvRbuBQfvcAFET%2Bb7ztdvTHECPqJwxHSEXhuH%2BO1jvQKv8DCBwQABoMNjM3NDIzMTgzODA1Igx5HdADolIcT6qae4Qq3AOdJz8deodbb5LR2ZhFs8vhcTQMnc4KecTi%2Bbi1ahSMjwU6qV6lvxIk4ChlflcdbX7VwXR9QEXmsTqoeUpffh%2FAaH3HWRRRqnhdcn8JpdnuhUcW5TvO9dW%2BCyFXBemNAqX6NQyaCvqv0ixgSm%2BvMl9nIbdRWIjxNtdBgCEpWKCkXf14MCxuWeGKNOLfWJinlkgfJ%2FxS7n3WXoTmxFYtAg4j%2BL69lZOsOiauWQgh7tkHd%2FmWOcAdM5PM8aIRxSNDbUUnrDKA3fZiLgZRTiliJvcr1%2BDI0dg56242g213iTznzC7%2BTU%2FqHkPpoASRdlOGhfTWOD5IHpG27S9xiPSrhy1%2F9XNlPSnBjfTp8yIxX5y%2B3DRN0OFO92lqw6gB2qHmNG8DJJNY0CvpKItU7c2iOKCTZiOUU0KQ2pd%2FvGIZ84UcBfqXjgUz6G1RtmgokxYucElToGKZs1QdI%2BB8JpJYaThJf78YIjkR4IhyKFopZJBJaAlUkBpNTkv5tou6%2BbU1UKeLkoVu8QcJ%2FdkkzmGgRmif0YV7C4jvv8bd6muxyeuESSvEd6NBlCxCGKChSqAMOuz5T5InRRv5MnCB3U3UHdipuom5lPfwco7QTch1jp1%2F95iqSKi9CKNkFq4gbzDjzsbMBjqkAVqpvxdJkoCM%2B43FtvnLwrNcMP%2FPiDqWZkmpHvSKOmk0%2Fgl1AvpYIsKLrudsgQ9hCajC3IHqzfHv3h24jeFRh3Wcf%2F7i3KnXNbDAEl4YtvfUHUxRg3%2BeJoh4%2FX2TF7WWlJkT2EVjdmh8XHxI078fWCrWb4k5YHxtFbr4vKHRmAGDxFpSG6JHZ53ARdYmSB1vZC7%2FyuM4FPLrauSNj18tUM%2FSCVAr&X-Amz-Signature=781b8dea04e91d6b90c5f6194261618de4ba1486050fdaa274f8abc9d93119af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4WS24QG%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T111214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQDeqZSJuAjpaeQIXZ2xqG6ijNCmyGruozf8D9OCNAVGvAIhANrril%2FjH7usMOea7J8q9I3xj2Ur0ejxzRCXBv3ip5IBKv8DCBwQABoMNjM3NDIzMTgzODA1IgxaXR4%2BKBOOb%2FWLamcq3AO5BGDzkzBMP7E0E9rEaLJCB8dlyq6D5Hdf%2Bke5pkIeSAChySFXTobE53vCNB%2Fxw%2FwM21fFyc1%2F6ZSPJFFkdUf6JAz9JwV3oF8JS%2FtMQUiuS%2BEIE7ruQorS5AbvKsaFIAxLkqbO%2BDrpRBLhzHNte2ZxkHSSJXTjbY3d4cCvKRmYzx9JxE5rEUXtAKWP9NR3OEAYVKTgAOisRyj%2FjtTGum9vWPub9uc1SmIzTmzEhIzJNPZEy4JQYRl47glaztigndqomgRnRVdlG76UAuv%2BzZzSofN89TyhoH3Qs4XZFpDOF%2FIy3RcSYX389V6PCvEA4ehFiTp8Hp8VXf%2FgECUiL7zMeRGk2AOcmBt%2F0pFealXpK0bQl4f%2BIiI9Vamn%2B8a8F3ZJiTPvX6pk71F%2FIiZE9TUzfL2idXEmT8TejQoSIRZhbHyMRnR0CvUOV29gEd6lrB2akA4MbSsnc1TzoYz8AMRPtUthggxfod%2Fts1hVV6VLeiMJ5Lg9%2BOIu2nKlOSc9r909d1u941%2BTXo13QwuzlW8nEuVmE2mgZGoFXOVGB0IgEDZvhbTOXNHGH2lLXdfMUcAxjLl9yr8VNwJmnh%2F%2B17cUZvHs9BSGcYmEkaUKA0KxZwdX7DD2wq300nxFTjCnzsbMBjqkAZexxNMj8JF1QumCP4IAoQesnwsCuXV4OJg0ZLFS3Ix2spzQLuzXQ6n61DMmSTFwkx6sHsmLmj0lYUcTHpabKmiShfPRmyUa%2FyVH6AQxtxOYKkT%2FRyjfFeSirNYOJg3zd4pB3AWiJLSyXetnAcOO%2Bcx4rcuGzxw9a%2BKUMwIXxcM%2BlLCXZtcKK%2FovVj8ckvuHECpyDmavqI%2BBG3q1w%2BQnY19tN2Ob&X-Amz-Signature=4f069ab1ab6b784787f732e14ddd7b168d04cfbb1ea9cd88c192c5a78797e9cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672WRKVZR%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T111224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIGSMM30oGhuXICBks1Gn4gI4E65W2PCUqreEseW%2BS2fLAiEAtDSNnfu6VeI68yDQ9kdcGbkyNNlg%2FjmCcbnM7POcK10q%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDDapPBIuQR%2FDZ%2FCmPircAyLvYSKlQYIjFNgNpm3anqPxNx6WswJFYi%2BgWR9k9Ccve%2BIKzbglvvoQlF5jMNSmNlifhoa%2FMe6hyTpU0f8Hk8UgL%2Bgj1gO6NsFRPXOWve7B3wZEZqpG9whB3zwxgTMkrsuQ1m78PzeGTMX8uiSWLf84pbAe%2FmPjleM1nx9dRN2ncQk1ADodKQDws3ZCEz4IHDbs27iRVid72e3OLlBx7L1XVEFU5t4kPoL%2FJW%2FTRAaVekj0cB6qtats85vQ00olCK95TEiKGSDcMd3m00Jfx%2BC5raFfkazxBCTUeYlX3GEkzsD9cQB025uKjMieUUKeEZiDnNhV499UvJ6xRrK9nEBDxa35oul0okVXryBpsgKqqfQ5JO%2BwjkmIzegx2QJI%2B54tmqEVJppYfOQBmnfj0NKa14RKAHX15zRy6Zu%2FdIX4WS5xDtphRJ9OWpTSEAOvFeGvTRQSqiCKgdV73AwTwLKX%2BsnurzW%2BwCAqF9VfVnLEipQ9YxyucjqlUFLyQ4E%2BRZvLV%2BY2PXBvgso0C1girDAU9TMMRopTFEVMCbDpi6iBsU832Jfc%2FQy%2FGlaqk2%2BUzsd7bOS959WMltKnNd35hUDcC10IKIHtqQyeKbwe7gDx9cv5jo5HE1E4dfnfMP7OxswGOqUBJoEMs%2Fsd5GpR4H6OMGPJwa4YUh8PNZkqqWGZkKoos9lA0O6c6TxS30Ftrf7yR%2FCzGdcKO77T4f5M2Qq95LevxZFI2B2ubDLU6wxiUD2BgNVOX4jh9My9t1RvV%2Bhk3%2BG8%2Byq1GkSHKeNJ1fVFHOTst%2FCNuvm8v9T8e7l6viYl%2FUO7TAHYMsYq1EIaoIP9msGzjPwRWobtzZRNKrZe7HpOYQL05Jly&X-Amz-Signature=e12297e4423a1d70d8b364c21b2ed9bc28490840f22cc4505f0b47556c24f495&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672WRKVZR%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T111224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIGSMM30oGhuXICBks1Gn4gI4E65W2PCUqreEseW%2BS2fLAiEAtDSNnfu6VeI68yDQ9kdcGbkyNNlg%2FjmCcbnM7POcK10q%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDDapPBIuQR%2FDZ%2FCmPircAyLvYSKlQYIjFNgNpm3anqPxNx6WswJFYi%2BgWR9k9Ccve%2BIKzbglvvoQlF5jMNSmNlifhoa%2FMe6hyTpU0f8Hk8UgL%2Bgj1gO6NsFRPXOWve7B3wZEZqpG9whB3zwxgTMkrsuQ1m78PzeGTMX8uiSWLf84pbAe%2FmPjleM1nx9dRN2ncQk1ADodKQDws3ZCEz4IHDbs27iRVid72e3OLlBx7L1XVEFU5t4kPoL%2FJW%2FTRAaVekj0cB6qtats85vQ00olCK95TEiKGSDcMd3m00Jfx%2BC5raFfkazxBCTUeYlX3GEkzsD9cQB025uKjMieUUKeEZiDnNhV499UvJ6xRrK9nEBDxa35oul0okVXryBpsgKqqfQ5JO%2BwjkmIzegx2QJI%2B54tmqEVJppYfOQBmnfj0NKa14RKAHX15zRy6Zu%2FdIX4WS5xDtphRJ9OWpTSEAOvFeGvTRQSqiCKgdV73AwTwLKX%2BsnurzW%2BwCAqF9VfVnLEipQ9YxyucjqlUFLyQ4E%2BRZvLV%2BY2PXBvgso0C1girDAU9TMMRopTFEVMCbDpi6iBsU832Jfc%2FQy%2FGlaqk2%2BUzsd7bOS959WMltKnNd35hUDcC10IKIHtqQyeKbwe7gDx9cv5jo5HE1E4dfnfMP7OxswGOqUBJoEMs%2Fsd5GpR4H6OMGPJwa4YUh8PNZkqqWGZkKoos9lA0O6c6TxS30Ftrf7yR%2FCzGdcKO77T4f5M2Qq95LevxZFI2B2ubDLU6wxiUD2BgNVOX4jh9My9t1RvV%2Bhk3%2BG8%2Byq1GkSHKeNJ1fVFHOTst%2FCNuvm8v9T8e7l6viYl%2FUO7TAHYMsYq1EIaoIP9msGzjPwRWobtzZRNKrZe7HpOYQL05Jly&X-Amz-Signature=e12297e4423a1d70d8b364c21b2ed9bc28490840f22cc4505f0b47556c24f495&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JWV5VIQ%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T111225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIFnzRUOCAOufTA%2FJE%2FPfF0qiDMWGKfZRIU9XFyPwinj%2FAiAplTLS3x3hzrL8EDi7IxRV1srYINI6iyHvIgoz%2BDfgcir%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMxACtvmR7LN8QtydaKtwDo7ta9TYJNUx4QWR6cqoJPOQXBDyHSma0WGwNqwoKG9fvE4onOWAQqF%2BLPnsClrS5mrbht1%2BsvLbEBQXu2PK%2FUDsPH%2FFr77sNeaxZlztNnmejdvixftpTmVF0bM2mFCu6i8vYuQV9p7LtEQ8Kb0Io8WZgH2QnY44AQx5c3FIYyxChtnCsT%2B6LxnScRKdiMdM3e3uaSKO6mGTSJXw8aNt%2Fb4POjgKm1kNmiaoUf8wY1anyH0VcuAsV4ikiNYVJqWTXS%2FgW9ZO7DGGxTH9Vzp1zI8kOExRAE6bR%2FPP9hCJTG82JftlE6VfIcGwpyogev%2FtKCCQ4CFYExb27zVMlV%2BhNvEe5fqwh065HtwSV87HANu8AH2Jhvh2Q85OogLPTLQAMfJbqjv75CtC2HL%2B74%2BdTRhqoVAMOvLITtbNmWqC%2BCoHfb%2FnE4LKA0wpTojLEQ%2ByCNHlgbAcETkltgJnaB3%2FBEwqtO9WWIaoPk8K%2BcTBbLICQVLItFf1koOokaO%2BtFlRbmuijbGU0Bur7F6vLCzr1NnNfsi74ikIl4ZuRYo6a1EVotiPbc%2FUER9W8FwqaSzETHj3PoTmbj37Fo%2B7BYbaTGx6zMVgIavZb%2FnS5lhCw18rmvulgBDElU28jjCww2M7GzAY6pgHll7gKNPNeVXKRATTQj9BQ8Lrs2CVWV7biQZxQyCVRWEPnjrAIG3YxmIf%2BKvYXEDCye8UfVI7CR7NpTGJM9SXAbKyXN1igE1Vy4wGhZ9OmJS8%2FXbI1UI0Fai7oqDUP5Fu1i0Rvz9%2FVrKt5mzk768Ft6ABFG3Fj48AjJ9x4daGLtmKl45h4CupI3YiJQE%2Fp4%2FDnfQDdGtDqKIks%2Fj3Si4UzHqcwhyZU&X-Amz-Signature=2339be69b39c601d3d67a9e0d070c57c49eb0925bae408cf06ec2c3c6cf99ef5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

