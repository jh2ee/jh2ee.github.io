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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGEZ6Z7K%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T211743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQDiqDporLQsUZvKd%2FDxhMe%2Bt3ZqwHWn0sl69JGQmZU4TgIhAJlgakW8XGh67kxiBqMW9kXMEK1S%2BNwOM5PLxIOquqS6KogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz6iv5y91kefeXSTIkq3ANflDSBwmugAQ%2FS6qCxV271r9pFlYdenmekeOhzmiGAR3%2BBMIqeEgMRlWrSya5jXfmVtFwvde9yRbE1fSVNVzDUyid5P1xEyma9RzSkJ0Zh9ZQ7Tqel5ZySkaKOWnXI34pVbAxxcKUMQFSnfqGa8iyO1Qhf5mMMmU5IWmOEJnPOatl%2B1FsZjdOajlIfkJKjLEMvMi2g8r2iCVVt9aFO8sHbpgzA5YHDxPLleS8dg4jqF8g5r7bs5KtfxkmhOsTC5TXpSUhlpq21KGNMdGqpYmJMLM74TMCg%2BENKarXUOgHVGwIpnBbys4pcu9QH%2B7NobtKi5XPS8izcWL9xseuu9SN7aARX4rx4l2Y7tydguYboO2d%2BKHdnLwA9W%2BOaa1qnGrAWQtOueYqC1as84b%2BMNvj%2FUvtd0SHcx6SMDvSq6MOeyJDlCqHhwyobyDKZmy1S9jA7djvCpLS3%2BO%2Bt%2Fvtoxy5%2BreIibv2%2FKN1GW4gUij7qDyMcgRFXa6yhpfLD%2FROtp%2FoX0h2dM7lc0Y4CiKM8hUmw%2B3T%2FmGdWebtzwnclgl5%2BuDz1LYlyjMfscQTDx1prdt%2B9gE6Ci8jjaD4lgvKUar0senWATcB8RhF9ixCq0ruNiWLTxC%2F7y%2FNGJ0B4BTC68KDOBjqkAZ%2FgRoWVN8owXay7WCToS0iMD8cspDolJq8DZedBJQG8lOcwfQAbhi%2FaeSAFUY3eR2q%2FBjRPjQOqinHyBXCeGeQX%2Fj0F%2BKaWx5LyQCitwy0PhlxdskRpbaNMzPma32DQzGUvu3zQRYpmLJQhaEvXdabulPlu3dAuDLVvWsbk2X2GKvLRYUQdI1b5TsoJUR%2BLVCbi47HBn7889wpBLi4llRPgULNe&X-Amz-Signature=87cb7d0b9efab11992565ca1691cc27c484946bece2479c49fabd953f799a92c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGEZ6Z7K%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T211743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQDiqDporLQsUZvKd%2FDxhMe%2Bt3ZqwHWn0sl69JGQmZU4TgIhAJlgakW8XGh67kxiBqMW9kXMEK1S%2BNwOM5PLxIOquqS6KogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz6iv5y91kefeXSTIkq3ANflDSBwmugAQ%2FS6qCxV271r9pFlYdenmekeOhzmiGAR3%2BBMIqeEgMRlWrSya5jXfmVtFwvde9yRbE1fSVNVzDUyid5P1xEyma9RzSkJ0Zh9ZQ7Tqel5ZySkaKOWnXI34pVbAxxcKUMQFSnfqGa8iyO1Qhf5mMMmU5IWmOEJnPOatl%2B1FsZjdOajlIfkJKjLEMvMi2g8r2iCVVt9aFO8sHbpgzA5YHDxPLleS8dg4jqF8g5r7bs5KtfxkmhOsTC5TXpSUhlpq21KGNMdGqpYmJMLM74TMCg%2BENKarXUOgHVGwIpnBbys4pcu9QH%2B7NobtKi5XPS8izcWL9xseuu9SN7aARX4rx4l2Y7tydguYboO2d%2BKHdnLwA9W%2BOaa1qnGrAWQtOueYqC1as84b%2BMNvj%2FUvtd0SHcx6SMDvSq6MOeyJDlCqHhwyobyDKZmy1S9jA7djvCpLS3%2BO%2Bt%2Fvtoxy5%2BreIibv2%2FKN1GW4gUij7qDyMcgRFXa6yhpfLD%2FROtp%2FoX0h2dM7lc0Y4CiKM8hUmw%2B3T%2FmGdWebtzwnclgl5%2BuDz1LYlyjMfscQTDx1prdt%2B9gE6Ci8jjaD4lgvKUar0senWATcB8RhF9ixCq0ruNiWLTxC%2F7y%2FNGJ0B4BTC68KDOBjqkAZ%2FgRoWVN8owXay7WCToS0iMD8cspDolJq8DZedBJQG8lOcwfQAbhi%2FaeSAFUY3eR2q%2FBjRPjQOqinHyBXCeGeQX%2Fj0F%2BKaWx5LyQCitwy0PhlxdskRpbaNMzPma32DQzGUvu3zQRYpmLJQhaEvXdabulPlu3dAuDLVvWsbk2X2GKvLRYUQdI1b5TsoJUR%2BLVCbi47HBn7889wpBLi4llRPgULNe&X-Amz-Signature=87cb7d0b9efab11992565ca1691cc27c484946bece2479c49fabd953f799a92c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJBZUSGG%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T211744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIDaConE0B%2Fc5ue%2FkwcvepD75NuQ9lz2BWU9rjedEaQN7AiAdl9lGbcrU0NQnia9aud0mv0R%2BZDrIklfpGxnBXQ1IWCqIBAj9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMHIcnE%2FvjEbNhndUrKtwDOiTLUatiB8FSxe%2BdKFka%2BdljDdHFk2nRS4mPBBRKAlOhFGyEnmmi4BfyyUbNYWoUyz7FDUphaFdVUQoOuCP57m74htXbaj3eACCyk7dKQXL4wmAilXV6%2BkTEoNdUJYjyyQLAWrmGNBvxaeaUITLoHKvMSmVIr5b%2FADs7GIfkULgMEwjjpi0yI919%2F%2Fy9mlIEX7LPQjkgjkSWI2lQ5OJPmMIYu84ZEPepO6PMiMvbOV6ZAlTDkGIvuSeB3Zy3ISj08wC9QpUtDFpDToK6G97o6Kw69gtml6ZHmwTJViJz%2Fp%2Fi4cZOY0xeSvncL3F9HPwBeWSW64m%2F3NECoA3uqF9EMJ1tw3hjxROwVt109OZZjW5K08lAoa%2FIgbIq9oBgkVTh4FjkLRUzi7%2BbOSze9mUAwt9WGCE%2BJ5WaSsKPJb3s9aiDLvx1IRXKxaWV33RRAnWjozjxKA0RuQyGjxZMGImOE0FX15lOLjL87eHoimmdlzqICYa3ylGgbqktnjqSLW8ZpgX8TA7PnyUVXzz4wjTixmCZm93DKIS8SCRUZNBwwI9k7Jlo%2BrxUG3SqCPP3UjnHJ5H0w5gNW0ZjS%2Bn16rKVLtarKvxOFw%2FgPzJh1dFkDeRfy0lAPun%2F4ePyHnow0%2B%2BgzgY6pgFhe4n3SOTCw8shJCpOoh6z0Qv17tZa0cGRzeLF%2BxnlIxfLJqrsufHfi%2BmEFHghSlBRp%2Bnf4D7LQMni4dyelBfraiSY0nwhgDEzXRUF9w%2BXpGS10lsRVO7TLoCm2UBxgx64ouqjuf961KeC3FILI64g1%2F6uSgdgCJETMU9p0FwxNwH0Z4FoMnsuGUp4G2NuUi0HeuFdkD7%2BvhcvSv6TQMcZ2aAMWzxo&X-Amz-Signature=b7bdf4b1eec20dcf2c9eada836babef85264a38b9721c62535d3e79be14d9ab6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXIVK4YQ%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T211746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQClFbV%2BYnnfTq8PoEfVReP%2FTkadQ3DRGe%2BAqVaceDagGAIgIrxfxzZOlENfbljqqDXDKYI9fpH7ilaiPvw4PRgzLycqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM0%2F17AMxdkt4ux3PircA4pKS7tJnFjERQZjTFIb5y4eWZys0gfUny0SohKuuBesFTuv%2B0dk%2BHFk7DRU08tV10ttERpg%2Bg5RFqKyxHO6eqAl%2B8kYh29JNuOC3UbLjv0br1cqhtwbZ2afX7p%2F7sumuUt4EJ%2BnVg4xuXRIPLy3cMahs2aTNE4M7HD33XCaBkWLWHjKwpg0lWd%2BQRL70iaaO%2FXLz7cG1FsHLpW2l%2B7H5gdMRLOpfKQ9541YyffwdrzyL%2FwHaYBthYHTLOez%2BBLOfY%2FTZg%2B9x0OVuYBQ9Ir7nxvdZna68fBMBJAmT%2B9ws83395MmM29jtBvZ4ha0MF%2Flnh1q2DYpnXmTkUqM4w43yCLr4yLyevo48uZsLQzKwejtw5nVpQvAyODohfDVYN%2Fh%2FLmfhUBEL56ur%2FQuAOoAVqDJnZ%2BYIkTbo2vmXpC1aT9fdf8i0iUl%2BFzFBOtHtqEAzHGOgnCIv3W4PvDozEAZLj2PkRy69Hl88DRqVyw8fA9AEy1u4oVW9tfCvR%2FZwxq5OI68CHzR6rJuTX63xEy3I6sPRGdByUG8WTab%2FhkuVMzyrPvmuR1ueCuJHQL7NvMKpXp0wxjffKSpnSDs1XfZmlHzbJ3lfOVvmp0JRGFHDwGsXbrVczA1Xvocx6j8MJzwoM4GOqUBW0fP8Om8Fk5xpdHOg%2Bd3gzlpXOGoOnL9o1%2Bp95VhorWl4rB%2B524LsMSTFzXlk12%2Fmx6ZON8%2F9Zi4hS2pTbRN49IIbKTr6J75ANMz5wV40audToQGdnKVcF8ADY07D1ZcuDa5FGBDupeNGTrscXPz0l7d%2Bo%2FrqbA0UioRxGBScEVSoANKoHTdF7SH%2Ft9MIcVWmlSjrFUlUIxkqKQN2G4LhgWjRAwp&X-Amz-Signature=7fed1261c434a703762d8f9ab54316982c468a3218cc74070cb21c9480e87975&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXIVK4YQ%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T211746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQClFbV%2BYnnfTq8PoEfVReP%2FTkadQ3DRGe%2BAqVaceDagGAIgIrxfxzZOlENfbljqqDXDKYI9fpH7ilaiPvw4PRgzLycqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM0%2F17AMxdkt4ux3PircA4pKS7tJnFjERQZjTFIb5y4eWZys0gfUny0SohKuuBesFTuv%2B0dk%2BHFk7DRU08tV10ttERpg%2Bg5RFqKyxHO6eqAl%2B8kYh29JNuOC3UbLjv0br1cqhtwbZ2afX7p%2F7sumuUt4EJ%2BnVg4xuXRIPLy3cMahs2aTNE4M7HD33XCaBkWLWHjKwpg0lWd%2BQRL70iaaO%2FXLz7cG1FsHLpW2l%2B7H5gdMRLOpfKQ9541YyffwdrzyL%2FwHaYBthYHTLOez%2BBLOfY%2FTZg%2B9x0OVuYBQ9Ir7nxvdZna68fBMBJAmT%2B9ws83395MmM29jtBvZ4ha0MF%2Flnh1q2DYpnXmTkUqM4w43yCLr4yLyevo48uZsLQzKwejtw5nVpQvAyODohfDVYN%2Fh%2FLmfhUBEL56ur%2FQuAOoAVqDJnZ%2BYIkTbo2vmXpC1aT9fdf8i0iUl%2BFzFBOtHtqEAzHGOgnCIv3W4PvDozEAZLj2PkRy69Hl88DRqVyw8fA9AEy1u4oVW9tfCvR%2FZwxq5OI68CHzR6rJuTX63xEy3I6sPRGdByUG8WTab%2FhkuVMzyrPvmuR1ueCuJHQL7NvMKpXp0wxjffKSpnSDs1XfZmlHzbJ3lfOVvmp0JRGFHDwGsXbrVczA1Xvocx6j8MJzwoM4GOqUBW0fP8Om8Fk5xpdHOg%2Bd3gzlpXOGoOnL9o1%2Bp95VhorWl4rB%2B524LsMSTFzXlk12%2Fmx6ZON8%2F9Zi4hS2pTbRN49IIbKTr6J75ANMz5wV40audToQGdnKVcF8ADY07D1ZcuDa5FGBDupeNGTrscXPz0l7d%2Bo%2FrqbA0UioRxGBScEVSoANKoHTdF7SH%2Ft9MIcVWmlSjrFUlUIxkqKQN2G4LhgWjRAwp&X-Amz-Signature=090c74df9d3503502286e0004c84131c87e88d99089527e9b17b62d20d887271&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMBQFKGC%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T211747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQDacknMXlT8g5Ya7tK9w2KSDhKAyw9p9wmEb4hjEDX1tQIhAJLC1OGPQJVFuYE13LwzqQhdHAZCS%2B%2BzBru5wD6M39YBKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxdsFNJtb9n3UgiSLgq3APg0NxwHzuLSTXS2GHY9akgeiOlBTTc5Fl8fm4VsXwM6Q2eha5ik3SKGCwsZIQaawqEhXyk6vlZDZEmOZ81WaV0p6uezipvL%2FU76jIRYAvWSiZb%2FdKrAQCTtdIr3hOPodOG%2BRFPLiYVR%2F6nlSl0o1dccqLnzR%2F6acpYKbBwfDBqciNl52PQIwoMOZQubn06twHvDijeu1NqgdppkYwnIuQuEyg1lJAwXpeQqsk6OIM%2Bs8ypo31zEod4Bw8Ogx3yVC3UhTocHGvEWzWEF0a4wz6bEJ5mVqQaNGxGVwJO8%2BnzlCyEPlLjJ31F9L8uDYaGiVLlL6a1u2w9T0ym%2FX%2F%2BdQL6rEvRx0c0bZi%2FoBcUf75bDp%2Fl1wff2JUbo5LaPS140hKa%2FPVcbGYzxmw8nN4siRW73Ful4%2FAfFcVgVmM3bYQZw0tZ2QLaJKQcz5OA3glv97l7HsdBJVrtOPgAPitG4O0kJdfRPsDPCkzgCwflTPm%2B%2Bb9zk4UEcxcK5jlny04DSen4Agt0nvo6vQrZztNmu1GW3OibhmY7oikPbf4gV3snlcIxKTgyN9aIQetS%2FYs7f2RdJI9%2F8itbozOqVL5%2FNKZhsZhKuhLz385bt8XKiGdxzW0X8av15ehLlrJBfTDX76DOBjqkAZrJbGC4F7F3Ho2jM5XrWp6kWWPxtvKDIBbL40l22W50DO5S%2BV%2Fg5M1Lskr2mxNTsO7AiaYGBF8s9YNiXW6vFu9t39zpB8qtPEl2Kj%2BDVVHufvtUlQGbBWjBBZdjsG8bTzYR8Mt73Ks8BmQ33UMf76O2Dd1J%2Fpt8d2liyz8%2BZlcuvLYYChF3e3cqqnk1S9dZ9UIm%2BMDi4ZE95ROF4Zc25wvDyr%2BI&X-Amz-Signature=1c4f78eaa4cad617c0707129142f9b160c7d530a9c2890300a1cc5cfbac2a8dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXXHRFUK%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T211748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQCBpvFvn3M9C%2BAAc1oXD4BNmURFLuycsndxPuIQuubvuQIhAOOkKcImG%2BZp%2B43HGG8upVIkXqPJaciKAoGfh7sTSbYDKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy%2FY9zcQ9D9mWZlmmcq3AOZeK143Ps1vpGIOwbZ3qQ9zlWiJy4qblsYGCENdu4ggjDmiPUvOr%2BZgVj1zgbIo7ktJOIewDU3drt7Q7CsPtCDN1VJB6NfKYxXrL4By1ihFXmp7Vk3ypD5lVfjt%2BEOq5kxWZorpqoZ%2F%2FT78XuPTrwlH1wyQU9bt8DxVSyJubIkqSd6AY7K0HR2VhvUx0L2DngvSeGmRjU%2FAvL2xGRL0j2%2B2W36YckJJaDTXwziszYiU%2Fk2O%2FOnN9VG2i86NRQus2m2AhzzEi88rxANj9gz12%2FnksPBKNNdMWkeYqvIlS266SXP0uk6ZBJPeoUojSIloFZuNicJvGCbkKPvET%2FGxLLhsyljdq6lHkLDNqVMoKPcxwKvFUOZ2HwtwgsBK7CtOGiHDIqScMRRBM2fmxl4souPpHlMbYOWqSRK4DekjYy2jGPiF8fTunA2dtZxMpvZGge8%2BAR9C%2F2v8ow2wIKmj426qcyme8IAAmRmZfmTJqG%2F97ue2A3HYbRF92df6c6RkQm9fj15tZ12pL%2FIyoXf%2Fvs%2B%2FDyObjnJU6b9hFlaowbtlW455xmbuHus4%2FM6ggLn6%2FhEfJJsMrA6q2vUruTFg9HS%2BT2GkyfGR2m%2F1D3968eMqNZGtDtbU98B0qcrvzDg8KDOBjqkAXeismkIpDY4GUwtdzKLWva3jTLWGTuz1WTG6nI88V10xvzZNlt472u7Fq1QbztWnYrTEOfMXtxNZKt9tQSZSuaeRfmm%2F3lAa%2Bo2mXV49JZSWNkVW26K%2FL9nONluKQI%2BR49CcvZdM3gFPPxjIx%2BHHj4KJcSJbvVmGOVzAvpQbW5uSRYovpW694aM0QhRKS933rvKgMN6wMjQeltMStqAsyn3FB65&X-Amz-Signature=403bad40e5ad24ee2c7d08333657f99e1c19db3730ca1b6a2f8cb325966f58bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VIF7VLQ%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T211749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCICiyh2q%2BPctb29bRzbtTR0LKpMtwOxE4%2B1UovrJX0T6FAiEA3MHkxcfGYGtuMaNCh6ybR8A2ruK6h0qbI0zf4qk4yvAqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMN%2B1oIPT5d9pEagLSrcA%2F9zeUGVaAAOcDaLiCLgY6VNvHn0BIVlviRPXjRn0bcY3OWQBY5YtkVq0k33Ze51763zkCBefShLPIfGKSpZSsGOUX87LXYGou06TlHTuIIF7NpaBB5Zq6wHdHmCJTLP6idQoOmI%2F62nx2FZQaeuWZGmP6pZl4WLIURct55YiY21B2TJLeKE5ufxo8N4S2EdSNPuXOWAq2rgilmXJIu96dTAeoOvyXv%2BFY6iqKdeSWq9Ws4JtnOTPPalgjV4jPjdY2OEqpEQdJ1OoxvBNzXYsfEVGQHk7hdHWOGJ0lktHWialXVCrUNZAGf27JD%2FeoVcWViRXRPqfYLX9tyQkIiDjwK2PrzUKE3qfCQj9My5DwrX85TamxCCotVoj4ms1xTqORxqhtWb8U6tpfYwnyJ9ydNsJBgKdQN4%2F%2Bl51Ft1DUBBDDvDFNuCeaZP8S4mqzdQvmsvvfO6RC%2B3OdLyRopjj2%2BuAydr31gUj252K%2BF%2FzChbsDejw7eT8uyX%2FMwYJYt%2BEXlDLHJUBjl0qD1fKrNGVKQGGPzj%2Bt4UjfWFsjcMzBjD7cFqdlEUAqB66MYrG%2F9P6P%2Bi9alnhRNgBKIvZNtgYh0CwXvCw2bMXHl2mlAEDiFO9KH0mhr7YwM23YvUMKfwoM4GOqUBDNN7SyRyVjU4jyrdADpeHtA4RpcFzCsGScqBITmaoaOef93cU8zL4ClkHFsF%2FH4VyLBwhfaROgvM%2FBHR4ShOaz4na5%2FJK88Of9%2FZPw%2Bb8O13fbrOIRCC1x8eIDl9c9RRmz9TzYrOHQVmKtnlxDh7QNE%2BF1qFMgUr7avaSPqIhGlkHqz0RWtVlM2AyktMfo9PEyI%2BYHfToq2QbsIPIiPKwgAUHK9T&X-Amz-Signature=aa2e095de3174d8d3e5907d4fd30f5d2770cf0a22a448e1815f566132f749997&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7OZPAVG%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T211753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQDdYJiA7V3suEOiS70gnSRTGUQD7BTqCGfAApmj0Q%2B%2FyAIhAITatf5YvhvUSv0Iu%2FxXXuApoTuRXO6Rnfibp3VrmEKVKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx50SApxzP7KEDnPrMq3AMX8AM2MssLRfOVDmhEiTbD0EhzrDm8sS4g7qkKuhtf1VJByh0kVTcCJL0MuefN7dvQdx0tIvFZzm7aDABW3cLDc3zR5%2FqvHYI4dL2g5%2FLkPd%2BjRFwPQ%2F77ES%2BPwBRjYCHO%2BE5zn72NuYwj2VoV8KBFBMSsxPen2eJhPUb9geiNawhSrIsoPEmFVOJqSC%2FlvnuzrVscx%2B3wbJzpP3hF6TZ%2BTs%2FCDXSfanyH1TWcfmTDa3o4pb8Uc6v1AeYoZmyBPTBJ6KtJKAjW4JAAaILzWvdg23c9WbsYLQZDWizWUV08myewKB1qfzOZQLVmp5rsT9E6y%2B%2FHg%2Blz%2F5b64u%2FPQZFP8uLIEocVEX0xYM3pAhJz0P7dfhqbMzqOhX%2BeXtSf%2Ffjrh4ZMdIiGdCmVRLelc254NjTyXChdf%2BV1aRqsTFH0rzFf%2FK1FTILtHEOBbyNrU9pnmiQXYiL2xozcs4%2BuHg7lMA0%2BCt4KW6vcsQGdTtLKfO8CS9hwTR8%2FFQVJrzw1PMQYmNMMmG5dROsBUqWllLO1akrA6bTm3GuOZKYFDiDEV5C4yqhNdId0%2F9zGg4yA3%2F%2BC8XxK%2B8LXtzyuyQ3fckne5FxaVqiKopCWBcRt%2FkzA24c%2FGh25GAGaMCIjCDDE8KDOBjqkAcuVUO6bpLRzvDXGGLHQNzj5jlWnpOlBEoX1nrbug1T70JPqeAH7Wq4aWp5x6SFvZmurf7jxwNcQrH9mqO3NQQX9yTz8FyEom1rx7pUGEkKm3zNFXJ8ObaiFsGhnub6BbqVFQXS%2Fp1O32N%2BtbBbLy9k5UzibG36Fg8%2FEqo6JVXA%2B9q%2FnaZZ0pSWjrXHlbHEFyE7ax%2B8QCwxkj9tR7olPEAxAtRhA&X-Amz-Signature=0ee37b6dbb2a0c99e20d9d21b1aceb9a052b31753055f6af5db21f72c0fd5987&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7OZPAVG%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T211753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQDdYJiA7V3suEOiS70gnSRTGUQD7BTqCGfAApmj0Q%2B%2FyAIhAITatf5YvhvUSv0Iu%2FxXXuApoTuRXO6Rnfibp3VrmEKVKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx50SApxzP7KEDnPrMq3AMX8AM2MssLRfOVDmhEiTbD0EhzrDm8sS4g7qkKuhtf1VJByh0kVTcCJL0MuefN7dvQdx0tIvFZzm7aDABW3cLDc3zR5%2FqvHYI4dL2g5%2FLkPd%2BjRFwPQ%2F77ES%2BPwBRjYCHO%2BE5zn72NuYwj2VoV8KBFBMSsxPen2eJhPUb9geiNawhSrIsoPEmFVOJqSC%2FlvnuzrVscx%2B3wbJzpP3hF6TZ%2BTs%2FCDXSfanyH1TWcfmTDa3o4pb8Uc6v1AeYoZmyBPTBJ6KtJKAjW4JAAaILzWvdg23c9WbsYLQZDWizWUV08myewKB1qfzOZQLVmp5rsT9E6y%2B%2FHg%2Blz%2F5b64u%2FPQZFP8uLIEocVEX0xYM3pAhJz0P7dfhqbMzqOhX%2BeXtSf%2Ffjrh4ZMdIiGdCmVRLelc254NjTyXChdf%2BV1aRqsTFH0rzFf%2FK1FTILtHEOBbyNrU9pnmiQXYiL2xozcs4%2BuHg7lMA0%2BCt4KW6vcsQGdTtLKfO8CS9hwTR8%2FFQVJrzw1PMQYmNMMmG5dROsBUqWllLO1akrA6bTm3GuOZKYFDiDEV5C4yqhNdId0%2F9zGg4yA3%2F%2BC8XxK%2B8LXtzyuyQ3fckne5FxaVqiKopCWBcRt%2FkzA24c%2FGh25GAGaMCIjCDDE8KDOBjqkAcuVUO6bpLRzvDXGGLHQNzj5jlWnpOlBEoX1nrbug1T70JPqeAH7Wq4aWp5x6SFvZmurf7jxwNcQrH9mqO3NQQX9yTz8FyEom1rx7pUGEkKm3zNFXJ8ObaiFsGhnub6BbqVFQXS%2Fp1O32N%2BtbBbLy9k5UzibG36Fg8%2FEqo6JVXA%2B9q%2FnaZZ0pSWjrXHlbHEFyE7ax%2B8QCwxkj9tR7olPEAxAtRhA&X-Amz-Signature=ab54e720fd8d4e03b02ea00ef201273b86f0541d6ff6c12078606a1513ffecf7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7FLQPXD%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T211740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQC6D%2F3nzWdQaCvHLGw7BBEd6XgdMx3rOAEVJls%2BelZC6QIgdY9yxH%2Fze9FIrtTtR5t9iI1F1OXEaKnPkiK2ElGOyqwqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCdC3aSFZI%2Fvstp8wircAxQBFCJkyp8aVXH%2BWA21IFGi3VZgsucyMnq%2BMbpyDXW5TQPGvH1pay8Qiry2EomQRcPG2s%2FBHOWuIMABdIG2wR8hmTFtBViHi0RBpOaeUV0oBerOJK4%2FK3QEjSk9XaElKM5FuKfT9yjCIkziaFAS7OxiqgHNK6lIYaGuz8cG3Z5U6H2fDCCu05Jlp8ciVzk5BC7LqmMCqZ1xtqpFTahKb1i9LGGVCrj4YF8cf4l1UaAijcdVThVHofv%2FYLJYvj2d7ncw80oOw1sCfagbsoaE4JhJKqUrWUPGzBPHpByWLkS16%2BiVnNcIzhMDhjoD7J4h29vR4s4DIdkyj3tHUmJiBMHDdnxtDLOlbTuVXH8GBBPHeOkcjF6TJ7sw2lndxq9sYaoyLElLyLEdIJhtl8i5NBNKMOMCw6PY8FZsixlRqjZ0URj5cc3pAgZPX89uPzi4PcpsWN9jQRsmsHzdYrh2xu66EC95d6bE5sdNtzn%2FnEiFX09fV1Q80WeCk%2FwdJnJjAfusYrx%2F82b91POgLw1oqZ6CFRLaGtxjC374lDAx%2BmbNWr87gcjQsraNkFsMUVd6tbuk7OCGFHS%2BpK%2FdBueFBK5eK0ueYyFnMMbkA3Sknff9yaelFC%2BlkEIS4EhjMOHwoM4GOqUBxIpO3kdPch1WDKmhlIY2LFaZWNxITtp3KZvahb5oFFg9qltkYXgvzwTb2njUwEw9J0c%2BrP73xxXEeseLB0K30e66j1GkWjyLsj1xLif7cMNWm3pLFziHAWN9xoVTQO8qxqH8WA9TOhiCwETwwhxeEMVgcfzclyVsFXTZQuJ%2Fhl7MyfBbyIQ2su%2BcxZJE2NRiPNxqV3IBS6gf3OjOLn%2Fq9%2BrLGW%2Ff&X-Amz-Signature=e6c2232a16226f9774a55cc5f57249bef450fd974dc04ff104f133a34f8fdac8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZARW755G%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T211756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIDCJn1KFHnO5QBWBNxFuueneTJkT%2FUFAYL%2FJYbtq463rAiEAsSWoUAYdIzkJ1WNTG8qyCBwaJSUvkOiF4OBLaLBypEkqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLjz5QBoYYlG45yTkCrcA47Nbrb4STVJY9u60ScgPsm2VNB5%2Ff6nxOIQSTcY2q2LTAtBhqx%2Bejy%2BcCT4HHahHLaj8iSVIMIM9BS8D%2BTl3NhMqyP6KXKG2CgJh24BRV2SMBtf7PB%2Bhij7RGno1bn0ShQNYFwTs9W0Fi9CVFx5I6qEPwNrN2wK6bvDUqTsz3%2FaoX6cpRWO9R1QjDWftBIQBTZwFZImRyWSFboFfL%2F67kiNwJEPYmIo%2FcXPKj8AmhA8Lxe7%2B1r0%2FOSzswvuEtw18Ma%2Bi0DQESuf1bLX7F9TQFjxrnoWUNk3nVwYK94S0MYUNm7erIllS6jY9cHFYIJmSGSYZqj2XH6dI3Hlls1kqyH6zTXakw%2Fp3evGkYG5DpzVk3PkB4ia91cBrFMb5bHoOMfZqhfLPWnKWbGnFBrjFqJ4w4sucUL0I5VjuSCPWW885rUMBhs1y4GIaWgBSqvW%2BHShRAs1dw52gExmHWuVQkYPxDWUlpEStrjioZaNGKX2WVl%2Fwot%2Bofv6DHOOljYSAX8CuvLWP%2BikzpSDmRBSI2X0pPrt1eWtdNr6OH%2BWQ7t5%2Bj3YOyQ8WKooSDWSfAB3f%2BzmIshbvPLmlLR4ajD51F6M8%2FzcCFb7v8KGwP82%2FjgemR1B9Kxq%2FWB007nVMNjwoM4GOqUBxLo61VLRLvHovoDgOyqg9M2NkSRoG78lVq3Kcm5cK%2BtoAxZVHazAFGD9pubYb8GLW4PMXPfY7RXYotPMJVNbLN6%2FqYMOIjB%2BZ%2Fv5xWes1DUOaSkWGNEZhOb%2F8QGJ8PiKpKEKP4hgFtBCl6ies8wJD0HJk7N%2BVPgN5bGZmMNuBtYPjH%2FtIF8K0VrY3t9H20BPEBgNlrow6GJpaax%2BpQw9mBGHrRk2&X-Amz-Signature=ac72182e254a50b34d12037e111feadefb5f7d1f5fef7be073f6d2a20c75bf6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZARW755G%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T211756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIDCJn1KFHnO5QBWBNxFuueneTJkT%2FUFAYL%2FJYbtq463rAiEAsSWoUAYdIzkJ1WNTG8qyCBwaJSUvkOiF4OBLaLBypEkqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLjz5QBoYYlG45yTkCrcA47Nbrb4STVJY9u60ScgPsm2VNB5%2Ff6nxOIQSTcY2q2LTAtBhqx%2Bejy%2BcCT4HHahHLaj8iSVIMIM9BS8D%2BTl3NhMqyP6KXKG2CgJh24BRV2SMBtf7PB%2Bhij7RGno1bn0ShQNYFwTs9W0Fi9CVFx5I6qEPwNrN2wK6bvDUqTsz3%2FaoX6cpRWO9R1QjDWftBIQBTZwFZImRyWSFboFfL%2F67kiNwJEPYmIo%2FcXPKj8AmhA8Lxe7%2B1r0%2FOSzswvuEtw18Ma%2Bi0DQESuf1bLX7F9TQFjxrnoWUNk3nVwYK94S0MYUNm7erIllS6jY9cHFYIJmSGSYZqj2XH6dI3Hlls1kqyH6zTXakw%2Fp3evGkYG5DpzVk3PkB4ia91cBrFMb5bHoOMfZqhfLPWnKWbGnFBrjFqJ4w4sucUL0I5VjuSCPWW885rUMBhs1y4GIaWgBSqvW%2BHShRAs1dw52gExmHWuVQkYPxDWUlpEStrjioZaNGKX2WVl%2Fwot%2Bofv6DHOOljYSAX8CuvLWP%2BikzpSDmRBSI2X0pPrt1eWtdNr6OH%2BWQ7t5%2Bj3YOyQ8WKooSDWSfAB3f%2BzmIshbvPLmlLR4ajD51F6M8%2FzcCFb7v8KGwP82%2FjgemR1B9Kxq%2FWB007nVMNjwoM4GOqUBxLo61VLRLvHovoDgOyqg9M2NkSRoG78lVq3Kcm5cK%2BtoAxZVHazAFGD9pubYb8GLW4PMXPfY7RXYotPMJVNbLN6%2FqYMOIjB%2BZ%2Fv5xWes1DUOaSkWGNEZhOb%2F8QGJ8PiKpKEKP4hgFtBCl6ies8wJD0HJk7N%2BVPgN5bGZmMNuBtYPjH%2FtIF8K0VrY3t9H20BPEBgNlrow6GJpaax%2BpQw9mBGHrRk2&X-Amz-Signature=ac72182e254a50b34d12037e111feadefb5f7d1f5fef7be073f6d2a20c75bf6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7N4NRFU%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T211756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQC44O5%2F1U3C2O4nRq0XZtu1ue%2BoIXKhgdk1A39kqKkmzgIgK02k7vyBXicLzzHyu%2BK%2BX245s%2FessIOBSHtMQbu4udEqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ0c%2FvoZgvX4zo9lMircAzX8Bbyj%2FYwLtrsiYjEz19jyyjkC1tsQesIfcvOj2njYKvSBjZbXOMOf0F6xlNSHNG17uNsiu6FNP1iCuyE9NaTeGAhCsN08DZ4Cp4CAh9cz%2BIaTMl596qll8WmCdQziypQb%2FmVBgd9QafZr6eusQ6h60wyg5aoZizGN0zASfaZKGeLxmJxsj8IaQ00gRo3wKHgL2u8%2BFRWYYPf9e5sPDmC8Hd1hrqihg26y3NxyBWoHYkWsUN%2BjBd3g1cuWRgLDoantEEVaawQbdQIor3UUeStm6A0W79NQQ7Jhhd54%2BUc%2BG2oNuGUssUHYItaKXz2Bygh7ZzsgPgK65MyBDTAvIlbzImEmDCwthaL3%2BDZvMyeyjaT3XPwLf6oMjAovdfkRpM1OLk6rWAmhpLhmB2NWrwYUBQl3sFYsSHEdN5GS23p4%2B5jo20jX56Qqmw4dow8EUU76q8Xm5%2FrhTgMlJcraH1Cg%2BZKqNX4jkFUPr27RulA4ESavWA1Ob2OdIYFMqfEQkHuRS4Z%2BH5Dl7inONNZll07AnH6CAtENV83wePuejWIJUXr4Fcff1hD2VGOOE1zNIpl%2FwgDhdA38iEUgPx%2FjFk0EBWnzkQiU2O7EZrzRB0BhFyihJeJPkVElOwP1MLDwoM4GOqUBBBtTb1WXwr91Rg73QOmegjd%2Fj%2Byp2g3bvvKRrAzlhABjC4%2F21JLmkOTBab0n5FAPIPgL0RnPT%2BYxp8jRDYZksyUBROVTEOX3tOpwfhZuwpNqEz2TRsjw0x4OfsPlaI9fk0roYE9JIFMuWybvi7y9LB%2F9oDW1fG6N1cTwLWS0HKOblm4Jw8SPu18t4zJe8A5LHhBoeeomLiQ5KtXL7mGI7D%2F16jyS&X-Amz-Signature=d02e8f677e981fff5529440918b6137d278e909a98769439accc49db25e0085d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

