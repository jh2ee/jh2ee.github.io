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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667AGQD3UG%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T212232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCiYgKpShM%2FUDEWozQKC4CyW%2Bj%2Fxv3ZRzukpTrTEonPiAIhANYxedPwnR0XRYtuZs2MiXhPbgvhHTw6PtZgIAcJHtBBKv8DCAwQABoMNjM3NDIzMTgzODA1IgyOdmrDvQq3ez0Y2S0q3AOwYxh29Wvfk8ikfbmzPbX4y52SA5e9gsRHQlavcCZGDfb9Y%2B711Mfb24I4xw1Dqc9swY2zVj6eBCpLvNGuCGM%2BD8hPzJa6KxmEexaRU6REe6BWIZsK0DL8fzrEc%2BewbvJ4qVeFe1BDHduDLGlrIRHEqV3S5cEd08O24YdrDJNFF4Z8FW3khfBHxMBfIdefQIYW4qlKVz2dm%2FSMG6c8ijFfaKeGC7HM7ybgjeIbP0Ydeex3dX1kdott2uluaNDfmjtSgE4ZQc2Gqmdeu2C0QCBbECdfTjEB5BrQpR48fflrWK5oaJ5XN6xB75bZECOb0yyUBymct0x%2FyC7nQgs81xiwC3XRwELEu%2Bz9Oupxw0CCcl1IhAChBe8%2Bs4WnGiF5ZvBdvP8atMBGXkDtekdjtm2qI3zgH1GEM91nAU%2B8IVovphfFLO0ovf38QfGD6pT24YujivMm%2BbsOSj5N3RRy8wnIETXysJVRn%2BtZvoVj67p37pYnmRt6cedk3U93XpOn08Wt0UkKSnrRdvdt1jjSDHyLgDuDL86tj6L1vmpj6bauxdmGpGh3LALTw6EVDoiLwRVlWuSeSInI0F%2BQsebTURdUmiSFFLZsUusGmW%2BjegonrTczqwUs1vcdsefOYDDZwZTPBjqkASJ5ex176mGgR1XYadE68XwZ4fKnjP7rot%2B%2BfzGrZMJbasMTBKTKbWeJkTxs7OuqOfcZt50BhmlgnOuFuz736Ov%2BXu1su%2Fsu1wS3XXhhDFHfj%2FPA8mciYXhDCPTie6G2JMB%2By1%2FLw%2FZlov4kWITIfJke2RxXxwnaLVc6%2Bu7q5lXPd6e963MBroEn3UZ1aAND7DtQaEM7fGNSNulEctyoGBZePvO9&X-Amz-Signature=6670ffeb75f014323a50b7c3876dd9064f9a46033c0164b6cb021a6bb3bf4a37&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667AGQD3UG%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T212232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCiYgKpShM%2FUDEWozQKC4CyW%2Bj%2Fxv3ZRzukpTrTEonPiAIhANYxedPwnR0XRYtuZs2MiXhPbgvhHTw6PtZgIAcJHtBBKv8DCAwQABoMNjM3NDIzMTgzODA1IgyOdmrDvQq3ez0Y2S0q3AOwYxh29Wvfk8ikfbmzPbX4y52SA5e9gsRHQlavcCZGDfb9Y%2B711Mfb24I4xw1Dqc9swY2zVj6eBCpLvNGuCGM%2BD8hPzJa6KxmEexaRU6REe6BWIZsK0DL8fzrEc%2BewbvJ4qVeFe1BDHduDLGlrIRHEqV3S5cEd08O24YdrDJNFF4Z8FW3khfBHxMBfIdefQIYW4qlKVz2dm%2FSMG6c8ijFfaKeGC7HM7ybgjeIbP0Ydeex3dX1kdott2uluaNDfmjtSgE4ZQc2Gqmdeu2C0QCBbECdfTjEB5BrQpR48fflrWK5oaJ5XN6xB75bZECOb0yyUBymct0x%2FyC7nQgs81xiwC3XRwELEu%2Bz9Oupxw0CCcl1IhAChBe8%2Bs4WnGiF5ZvBdvP8atMBGXkDtekdjtm2qI3zgH1GEM91nAU%2B8IVovphfFLO0ovf38QfGD6pT24YujivMm%2BbsOSj5N3RRy8wnIETXysJVRn%2BtZvoVj67p37pYnmRt6cedk3U93XpOn08Wt0UkKSnrRdvdt1jjSDHyLgDuDL86tj6L1vmpj6bauxdmGpGh3LALTw6EVDoiLwRVlWuSeSInI0F%2BQsebTURdUmiSFFLZsUusGmW%2BjegonrTczqwUs1vcdsefOYDDZwZTPBjqkASJ5ex176mGgR1XYadE68XwZ4fKnjP7rot%2B%2BfzGrZMJbasMTBKTKbWeJkTxs7OuqOfcZt50BhmlgnOuFuz736Ov%2BXu1su%2Fsu1wS3XXhhDFHfj%2FPA8mciYXhDCPTie6G2JMB%2By1%2FLw%2FZlov4kWITIfJke2RxXxwnaLVc6%2Bu7q5lXPd6e963MBroEn3UZ1aAND7DtQaEM7fGNSNulEctyoGBZePvO9&X-Amz-Signature=6670ffeb75f014323a50b7c3876dd9064f9a46033c0164b6cb021a6bb3bf4a37&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZIYCCJ2%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T212232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIA1a7SqTzeXyT057DePgWmJMv66T%2BaujTYWfmQjP9aWZAiEA%2F6klIc2JTeC%2Fxb%2B7AukYsOpu8vkopiqQ6mwwX9jjG84q%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDAcC%2Fc6Rcznb%2FFml4ircA6m2h5JE9PRIbja07f2DUERXSzLbfK0iISv6EpMAZqspTmqL7PwN8KliHOas9wzNXUQpCaj3KR%2B0EF7dXJ3PrgMwcuAS%2B4Y4xGDw1PEYxoNAKB0yJSM2jX%2BSRyhayyEkjZq7Eovw%2FjISy%2BTvK7d%2BA3kCOqF3AnvvPHwjlh6vXvT9PtZOePbVoBYBTDDpoSjmcD7CfPFI73aIw06eaOPK4VvwpuURL89RfL2QYEg4yzkm7kJzNhVLH8I3HXZaWVyjr1dioB39AzdkgsmbjI9cJEXjPqnrJ3YQXbarmikPVOX4cd%2Fq29iFY0QNcUjMOTxyp0SXcfHr1GyXYfauWin4a3SMhkQUlZ0tfPtSdxfTV8AmMqbw4tdtJIY%2ByvallhZygHwj81OKJNPmHhdGAF%2B1v2nT3ygmuw1euZxBG6hlDA%2B8AiPhCm9hettyKFtQsS7qBb2RKezHoqqWsop37wFgb%2FkHYQW9OINkvmQ6aIsYOPp%2FXxT39%2BO5migK5VBcdRhp%2FJMHnaisx98Jw%2BfCvfwcWiaCt6q0wEmr3tNzbQPhkPFM%2F6Dmdo9zgRvfIXyXZ4XYmhQY4okT%2FhO0YAPLYCSUzL73%2BOiuw3sq0wHPLsDkYuuUpGG3PHbya%2BknGL7UMOvAlM8GOqUBy3cXVjDlcKs6T9mc%2B2TpZozeRxU1gsedN0vrInX%2FkNHON2ZbDcb0n633mxYqf0WeR4oJo42FY5qsZeBmq75QUJe7Kx88xc2sGf6hJohN%2FxRcZw6nqWjrcVN1NhSsLrkP%2FxJGZwbb4Iico6ArnTYjgBOGGFO6TRghsx1D%2FdL5BC87Og0lGlfIcagIaBBrGSxWvORZsUUJQ8jASOhGh5ev3kz63RDJ&X-Amz-Signature=a522c104fccb81d842f2d34a1b00b60e33a03b59d9bc076f723ff5fa37a9235a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QROHFRJC%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T212233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIHpqOJO%2FO1yGwSFFF4QpGwiv8X3QUeMmIvk4hZtfhyqnAiEAveR27XFurfaAh0QFibYnZebwp8lYReaKDpJh2%2FBghTUq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDO%2F2DnRtNZXyCVqiYircA0YwFr%2BRjOAAcNx%2FGIOpp5UFnuuLFWaYcOlycOXQaubeKwLySMztcelYdziX5GPadR8AYwYpNYpqECA5WIaRD2BXOxEHubg0SgBC7K1rWi%2BYOaIlfg8mUBXbd6jll689E9fC7KNheP7xjCIN1mYDjmr1iEbNDQj4uDokQAts8K0kEnNktofoyVftXG69Wmo2xvaVN80jVGUfxx%2Brq%2FKSnvSF4hG2bGzR64hyUNyjhTrefD0JbDma8D8xRUXWtw2MB0aHA%2F1EqYmFq9L5wmhitMv0sC%2B902x%2Fv%2FQofhV2sGmmnHBQsp71PMaut05GnTnFYMuqSB8cymYWtnOVae5vS93aEU6bSCUHLCIV9gsPvUMPZ8zkmqFxPaa245WV6guEfpitU4PDQFxFFpNdEICEkFUC7Ga1e5sTrvsbzTLM2YY0eroT8Fl9VubCfYT6V1IyqfijO9x8gF1xZKuszHwzzrM0C7st5URpjgmgUbhW5hRyxlkbPG0jhYRHgj1lLy7U9uzDASQlZGX%2BREzP91wYFms259X1gnYhW8V%2FzpD1GX3OtnLaBaZLq6uhJfcBMZb2bct5uJGS71QM4I2LVg7MA3bu9yuSP0eeIEg5bdINBYTfQlbAn%2BlY8kwPcPz2MJ7DlM8GOqUBnudhkVCa57%2F6iT3nJxV%2B3EHlpHUYMGdI4%2B%2F592EePgFVrJGBiB089%2BzY0LBSpcgnBj85Ttb32ZNdVhhyojSr%2F0K241pZEdixybdN1A58uPPYiSPj%2FK%2BvhYtm5eUYkiyt1qOATIdW%2BrRUt0PnXfnT79mKh2PggUItuNi5nU8818GRiVQJMqSYnwzbubBi0X1oAO1QtVnMCC7qVUcMLROi3cd0%2BP%2FR&X-Amz-Signature=b3ffef16560bc0923b801e9a09b2f212db779ed862bd7ad3ddd6b3352045718f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QROHFRJC%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T212233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIHpqOJO%2FO1yGwSFFF4QpGwiv8X3QUeMmIvk4hZtfhyqnAiEAveR27XFurfaAh0QFibYnZebwp8lYReaKDpJh2%2FBghTUq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDO%2F2DnRtNZXyCVqiYircA0YwFr%2BRjOAAcNx%2FGIOpp5UFnuuLFWaYcOlycOXQaubeKwLySMztcelYdziX5GPadR8AYwYpNYpqECA5WIaRD2BXOxEHubg0SgBC7K1rWi%2BYOaIlfg8mUBXbd6jll689E9fC7KNheP7xjCIN1mYDjmr1iEbNDQj4uDokQAts8K0kEnNktofoyVftXG69Wmo2xvaVN80jVGUfxx%2Brq%2FKSnvSF4hG2bGzR64hyUNyjhTrefD0JbDma8D8xRUXWtw2MB0aHA%2F1EqYmFq9L5wmhitMv0sC%2B902x%2Fv%2FQofhV2sGmmnHBQsp71PMaut05GnTnFYMuqSB8cymYWtnOVae5vS93aEU6bSCUHLCIV9gsPvUMPZ8zkmqFxPaa245WV6guEfpitU4PDQFxFFpNdEICEkFUC7Ga1e5sTrvsbzTLM2YY0eroT8Fl9VubCfYT6V1IyqfijO9x8gF1xZKuszHwzzrM0C7st5URpjgmgUbhW5hRyxlkbPG0jhYRHgj1lLy7U9uzDASQlZGX%2BREzP91wYFms259X1gnYhW8V%2FzpD1GX3OtnLaBaZLq6uhJfcBMZb2bct5uJGS71QM4I2LVg7MA3bu9yuSP0eeIEg5bdINBYTfQlbAn%2BlY8kwPcPz2MJ7DlM8GOqUBnudhkVCa57%2F6iT3nJxV%2B3EHlpHUYMGdI4%2B%2F592EePgFVrJGBiB089%2BzY0LBSpcgnBj85Ttb32ZNdVhhyojSr%2F0K241pZEdixybdN1A58uPPYiSPj%2FK%2BvhYtm5eUYkiyt1qOATIdW%2BrRUt0PnXfnT79mKh2PggUItuNi5nU8818GRiVQJMqSYnwzbubBi0X1oAO1QtVnMCC7qVUcMLROi3cd0%2BP%2FR&X-Amz-Signature=ae4b93b2c66dc0c3de0d01a9477e04c4048162acbd8cf79368d0c0abd517f04e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTTM33WO%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T212234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQDVcLCUKA%2FjdNsALrVrYMQVpwMubCWnD3Qk4z%2BsyIqDqgIgFckFe%2BtzMoBhhBZ7JTEvQhjigwf2DOXT5JVtg5izdwAq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDGYkv0S0x56iefpouCrcA3SCCYCDl4atclYjYkkXDZeuei%2Btj8u1PLoBX18B%2FXvsA%2FeaxHhDhwN288K0WZgBRDfay61%2FEVzWjK4Nd6IRCQsmmbUx0kywZlwn%2BvKfTH1Pkd1UILbb%2BFvZX1p1Fp47LjTkl7nLIyQLqHNBdxtQKRBAh5Q8pBachGQZ%2F51%2BXJcW6UFucKFMiC6Ghad%2BgaddkeAvEt%2B%2BRcfq%2B%2FesA2ybfaekPLmyJqZbn7%2BemG8LKQ%2F6Pnv6zZBctnThzwkeIjlLYu65Sn5cg9bHbyVxfoZLA2vH9NCFXv8PCjo6KAwEc7NZGUOvE2G3Jo7xz0vBjbLR6uFG9DYpvC8yHZ8aNWDEnXwND0JCprjqhxs3UGLSWOYlyJ4pobrGcSGx8w4FkYxm60T7Lv%2FXBbrj5PUH6kl7mLZWy%2FpaECP14taAmpIjyBcEJl1ERkh8rXl%2Bi%2Ff9B3l3SmZs17mDBH%2Bmo%2FOb%2BWCy6yu7%2BxZRdwpf3FTktj%2BOnvn5xjbUr7Ew%2B%2BDNUSUWDRF6oI9rN0vq5%2FF%2B72TzGg0dnYqaVUXVMvUef5vawsOj10cGEfNC81hFqTLu16TS2aWt2mF8tgqy1NIC1ZyJKmvH9pQAKznFTMXvWgXqix9gXdc%2FRZDhvdkNPlVKfn9EMMjBlM8GOqUBwvYYs1E9acrZemLVs2B3cXcFMIM9kVt2bfhFSFzF%2F4IPX%2BbP%2F1nnSfhZNiX65dlDoTsPeK0ovMgGkwpMzDqIeQEcut3d4J8rRNo%2Fhxy1G6XW%2FxOphjxcGyY7jZa3S4tPA27CkHHztAO1k0hpmYJojNQBdkYHw0fKKX7bxuBCnCE8rA2gM3v%2FcIS8rVYwasWTRhGnJwXGEmxWzSkX6tDWFT6k7kdT&X-Amz-Signature=76f2967c793fd321c30c9b3b8a0ddfc41c566ed5ba98d3df49171be2bfa67629&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTLQHT55%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T212234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIFaU9pQ9ZSvR3QF24gBdSrbD6QBn984wmlfZtkoo7x5QAiEA9V7YYkJp5tpXaMh4ZahZRPS4SNNqMm886tn8TkWaY8Aq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDNgtu%2Fs%2FvXcN%2BsuWVSrcAwPfjWDfPcOuLscnJuw6qWTL49IP%2BqwtuNUDReJGo6IMCBG0gC9btfZ1w9IDzHWjNCQDEm4ut6iCffkxf4vkui4TK9NEzejfogp3jwm4XOa6XiVDJ%2FnrzOiaw17%2FMJKzbTrWU62FR7RNErceDkOmwhgMuWGtn02gTz84IGtAIoRHbXOREr%2BmLptGXKVpJ%2F7r9Tu9F2Ao3F5fGq1uJoympaZ1vP%2Bb%2BmLABr3xd3QaLeXtUm%2BYh4k%2FJE8W70I4lri7uAdAfFak98Nw8XjMrwUvUFqRLEdQwPNQ2lo45m0gKqOz%2FpczUff7tfn7k7mHJJ0RP7%2BcRc392AwQScKJOB8jQyzVsPzKSK7i9s45gIiWTsf8gBLMmbAgtJl0ZwEaps5mJY%2FucXSTaHwxCVTxUlVjSNN3N70t9ZHWpUvZqFlohCc2eEVa5SLi6cZd%2FFeIljofhiv5x0g%2Btyj5fOOvhb8jEXFG%2F2KW0v2sOnepu1thUQWigjyKwkf84sBm3hRk6sdHkzVliLN2OgyvSxZZvUYv43btntjvjo5Zwt0Hk2EJ0b6OImc9124eYFf5ROWcOZc95HANjEkvbq7bVbB6LqZw7ohUPix7eL%2BJjkP4xDcII9vv%2BfTQQsyLuxv1%2FUVkMI%2FClM8GOqUBj1cQKps19xZof8OvvGMylErb9VMtIYT4lJiCQQsVzT3RtC6jTo7GLAaShGqBVpHNXH1614hHrIvEtCkvzs5H9SDpACU%2FcU9pYIdY9FwQrzR2IDYs%2BbsHQNp2T89xQGKE1HmkmgI1rWIDIIwEWiITnM91tQR0hdikxOFRHtVAVyoREEFSEQhosXrWSUJcKwG8zwRkbp8A%2FmtOH2hJvR%2B4fZOGInXr&X-Amz-Signature=e266cf0da9e3650f75970f32380d7b6189f37446002eaf0f8d35afe19b9b3030&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2Z2N4ZR%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T212234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIECwcYQoz1icQomDwpUaRichzBJeYiRGpMgArKxdYYl6AiEA7F8glWZamTyYJw0GBMiqPNyGFYztiQdBSzNIBjUQFd8q%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDEaKXYnw4ZuOlu5lQSrcA7EAT4MHEHl3%2FeNm5fiSUH3thQDeOkr0sTXNheLWnvOS%2FJXDF%2F8NtLnvgapzmjTogwTBOnpCLXwUOTCXYRfr%2B%2FYzhdOjRaZNr%2BFjSt5%2B11bjA6FsZVHQMJ8K7Gis8fn7LJms38mYyt5F2EosdHNCMrzNeOcoOdHkSP4ZJ2EM%2BDcMnRw2WnuVaptOY5WPVf7yCnuxV4WPfiA0kzAxf1F2ocBwbz%2BfA%2FHmgaR22%2FfEwXLb9qDW26ulzClyToaNFQm4qJM5XVG8nLRkoIbsFMdN5AXzDz%2Bwq3BscPOMbC%2F1%2Fx4UWzFL2dLJyWVReoS51iCMXw8smNYakFggVDa2XQjtbiYzq6RELFdBHCtaE5jVTXW3w5T1AK41JU%2B8MtReLUh%2BQ3TPqbrTej2e1RKH5XrPC0x5Ird8StPpg%2BeF59%2Bq3LHXOcysOc%2BOFwtiDIjVAc1KlISx%2Be9n1ieyDrj9CmGz%2BMLWWIpetKX8VgGlSqoOmIfcP35jvyZx2T720lonw8tmDhQzrDw8DEapwc%2Fq9IHSbkJKpUSEDNgTMVRjtz6l7kO0IvEBeGTpfKtoNnz12FqGS3QHJeSMtvTMSeezmCBZxqmwNrB1oNNiZUd7LdiKx1HKzmPvNRUc6GvED0COMPPAlM8GOqUBvZ4JiZ4MgYIHnwKXLYwahwZyd%2Fj6o7wz1OcO5etsnazC%2FTQ70QZ19wmaMMHQB4oPoreNZAWoj%2F5%2F%2FWH4x6Eh3SOyzZeHng%2BKbJvkWT5HhgiD7r5TcgLNbz3rkxChXrde%2FfjHv%2Bd%2BuUhsL6qNLHiP0pZ9HfV66NRE2ehoxdEROPmg%2FgiSBfQ117gMhzqspny0jqm7yg4Dh2yFDmZIonNOkhtFOF05&X-Amz-Signature=2eb0a78c6422486dc4d833eb02bbed32621cf0c15251f5144d48e334d4cda4e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PERQYER%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T212236Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIAavoPKz1%2B1QOWbg4UW6ZlJpUW%2Fx20aCgdYrswap699MAiBGN1p3W5BUqK%2FCUsDn5wRIz9QJaiqdRP22XnFO7gQQGSr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMMmBXNSy3AgEezPkaKtwDRBs%2BrrzQ504BflSQUSUG6eagHAgVEd8M9hUqMkU2GdOPSsVmCfphoY7snF6vtehGRzss8%2FXLJRirdhqEVOMitBO8vQS%2FujJvNnmn5RCjAuWdRDHGX1PmBmgZN4tzfm0spanFPpB3Yu95c4TgE%2FGE7iWw2aiOcMzfENemcTqVP8rKXB7%2F1EhjZ5a%2FEZJEeIh9wGTP1SFHxd8%2Fc37AQGrPMkGDrV8wfofTN5PqEcni2l9u8vsPOnnSC4guuUkmL6FxIpxriGujiM2xhHd6vlvQN5%2FkTnU4a1rJ2s%2FN4xCatE20wHxonUPEYzcQzo4Mn6oJ8zd6sx7%2BKWYOvI4cQkdInyo7zT0GAOwowcHXbx03MOzHt87NBpJlbfCI%2BXQksB8XWqkfgsJKHBrwDNrAbWMPaZ4FzWLKhtM96N%2FFf%2BzuuRLPz675AYgsOrdXJm00Bv5GtU5qSXz%2Fvk3cBTo2eoaQ9rsdRXYstMyA%2BYUNJctf2z2Laf9RINYcQ%2BiYqX5y3H9t0PyhhwoOGfE3F11JwGGckhoGJTexFv9uQouS7TB5wZ6UkGDl846%2B03pYih%2BQr8e73q%2F%2FYNPlQayhum%2F%2FB1deJk%2Bjko0EGJYeNWxAa0Q5qWenNK0VT2uQbvTiPcow7MGUzwY6pgHVGdxBzB7%2BI%2Bk5xjZbDYVh%2FP8S9gD2FePQonpf9UfobGZ1QTeD%2FIdI00rewrsMkHsmClXGGknCpfjivG8fq%2FHmeu9k30%2FRwg1gBMEu4XelCNdOAYTktUyRmwFYkupw%2BNp1yuzNaHgeKNiV4Es8LPSC7qYU8OC9juBIK21D5KGv4AahC5wWJto3ASyILK986Zha76hmZd56oZ8jpaa5bdvGOz3UAEdD&X-Amz-Signature=7fdcd8f57e9eb10e18207128df324a8f480cfc77b0b09d049346666cd626f0c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PERQYER%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T212236Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIAavoPKz1%2B1QOWbg4UW6ZlJpUW%2Fx20aCgdYrswap699MAiBGN1p3W5BUqK%2FCUsDn5wRIz9QJaiqdRP22XnFO7gQQGSr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMMmBXNSy3AgEezPkaKtwDRBs%2BrrzQ504BflSQUSUG6eagHAgVEd8M9hUqMkU2GdOPSsVmCfphoY7snF6vtehGRzss8%2FXLJRirdhqEVOMitBO8vQS%2FujJvNnmn5RCjAuWdRDHGX1PmBmgZN4tzfm0spanFPpB3Yu95c4TgE%2FGE7iWw2aiOcMzfENemcTqVP8rKXB7%2F1EhjZ5a%2FEZJEeIh9wGTP1SFHxd8%2Fc37AQGrPMkGDrV8wfofTN5PqEcni2l9u8vsPOnnSC4guuUkmL6FxIpxriGujiM2xhHd6vlvQN5%2FkTnU4a1rJ2s%2FN4xCatE20wHxonUPEYzcQzo4Mn6oJ8zd6sx7%2BKWYOvI4cQkdInyo7zT0GAOwowcHXbx03MOzHt87NBpJlbfCI%2BXQksB8XWqkfgsJKHBrwDNrAbWMPaZ4FzWLKhtM96N%2FFf%2BzuuRLPz675AYgsOrdXJm00Bv5GtU5qSXz%2Fvk3cBTo2eoaQ9rsdRXYstMyA%2BYUNJctf2z2Laf9RINYcQ%2BiYqX5y3H9t0PyhhwoOGfE3F11JwGGckhoGJTexFv9uQouS7TB5wZ6UkGDl846%2B03pYih%2BQr8e73q%2F%2FYNPlQayhum%2F%2FB1deJk%2Bjko0EGJYeNWxAa0Q5qWenNK0VT2uQbvTiPcow7MGUzwY6pgHVGdxBzB7%2BI%2Bk5xjZbDYVh%2FP8S9gD2FePQonpf9UfobGZ1QTeD%2FIdI00rewrsMkHsmClXGGknCpfjivG8fq%2FHmeu9k30%2FRwg1gBMEu4XelCNdOAYTktUyRmwFYkupw%2BNp1yuzNaHgeKNiV4Es8LPSC7qYU8OC9juBIK21D5KGv4AahC5wWJto3ASyILK986Zha76hmZd56oZ8jpaa5bdvGOz3UAEdD&X-Amz-Signature=162576acd2f9892745572ce89cb5caa3146114669984c4abe8a37b9ca0557e1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZ6VQYKX%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T212229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQDrdnRVbYWyfZu%2FkIaDn6JFk1Vk%2FeTRE%2F7oD33rTVbxtwIhANXEVPVhA4%2Bxgv0PSRJw7BAanygsI1MtFwKgz03T%2BgHOKv8DCAwQABoMNjM3NDIzMTgzODA1Igwr92twV8cAVLdrAvkq3AMCUt87%2BmluVQthvtVIhNn%2BbWbZzl0Sltefa5rjy%2BvMETpm5hsDZpbPv%2BjkiaI2xeo3eAubCcEzhSIm8R8JbUKGWZPYpZ9z5gHcbMhKUELi0JAGtbYoP4fX9oy36gLL5vNHp5pxS4uxldcTYnNj5iSAiU9z02GD%2F0mkyT0m7qxDbZ8X5gOywVJr2tx2KLq%2FdACS%2FizbFPvP7gi3oVnVGa50klpr886a%2FuFM%2BVt3XhD7JZk%2BiOGBjTycLa2smCEy0fR%2Fs9lIwTCY06%2FJABjcSFmqQ%2FwfPdnx97wAwMw3pl8PzedZ3GiXwBQXOO0ypNtVRDuqGmY6%2BxRlS5Ls47CHW7plqMQ7Q%2F0RDJLOqWMiIdJAaSxX5gOgyZ3FpvXOCHdyKuPKH2rF7o2mFttEtbQNkjPjP4%2F10znB2EVMZGhlGHOCSiHRCqTB%2BgkA2L9Ji6zO%2B6TdkgSsYzZ8H3QzkvsKHkZRKNLio6AAcMWOVE6kgFSm1wMerBDaPVJMSnjpBfMhc0cciYSMO4MYAW%2BAUrGw%2FkB74eAZZHVAxokhegizsnBqEXKJlimpqwLRcZcIiTg%2BMPTF60VNOVY%2F3WMgzh8q6o6YE5Clr%2BqUyvZiSRo64ng8ozWsNgzrN%2BwQLBf8pzCcw5TPBjqkASedobQ72aL6XFRLs3%2BiqBaMTMEbNH7ULxmyqa8IcAOKSkl3EsIDFIdPfxuIAQeCi535KvVEEFehKB%2FZWUHqvsMYBqY7ACkply6YadYe8vrCm%2B%2FbuliI0jqzBvYsP4cmAUvM70JNVxVhrAYKX1B4cI0MoJRrHU3YscODGr%2FRrYBYrZQCWw9RkS%2ByQWSIMS32vAkvI0sRgA1vGXL6h7CnE4UNSxcR&X-Amz-Signature=69db99c35e5b250836ce5728ac78aa794827235231337e9866c5f95b4e6199c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FGXKQ46%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T212237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIFN%2FMXmoFCafHJ6FmkjRL5NOiw7omxpjzhNxhefZGpP2AiEAmMQ20PbF9GdDtvwp8Fgs4B13f7waI%2Bi%2FcTSVPwAdTEgq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDKRxpd2aZYXIEnKdECrcA94aaevLCFt5e%2FED%2BKvzmtGPImOiwaQXiuwlzDeYa5nX75MfN9yhNbDJdIs%2BzpiVxXariotyXGVN7OVPn1vmjmCwzXtEOgpWLU5qO21fvKizCsoGI0A04xmH6WO9OI0qDQLZzQHSBAZhhsDMpiLo021X%2FQ8086D%2FRlAvuyo3j4SNTFcODCgYBs9U4%2FyhqeGy0SaEH5vtO4LIIqPYiRVX%2FIXvLie6npgAmmS0E8mtb8%2FyBX1lXc45XIu443IlciIU%2FAhXwoKtVme7maS6YSZbIwXW%2FhVYAJTxm8HJIdfaIKPtcvephSt9l2GPtkY1ou%2F565G9uGg9CeaaqonsLNcqgLGot9149jMuuvlbOOCzg06RCDpdcUSdL79iIbs%2FN2T80m60PcYYPyjvPe9mD88X4rfhhLrz5Ylu46Nq1RvvCUDYTCxnhE2fgdGa11gnmT6aD%2FZMJZsia9LPVAs0RuWYqbEPq04%2FYswoW3OE7ycL4HXhLJZ6LLjAZg4iDtGdJUOruNdz6sCIhVCHDuRddPhHhJvJnKXn3sdlWbv%2Blk%2BifVagImRgF4Besa0f5YhkK2yTbRZG6Bi7T8yVwzZ0tKLspiiLBDqDrB0SoOtfbOZ0MmZHs2eKb%2BkhgSZYnhCoMLvAlM8GOqUBc33KKPZtoDAR2Z5g6pBmceGWbMDWrL9js0bjIxLcEB0seneV2IHe%2F3hM5440YIdAiQzAPBEgoQnV95KtAz8mEqXnmVAKvR88TAvafV3jzS3ZX9WbN8c6Av7kCC9zb0ctc6auil7qvVBlQXAEWjKqT%2Fu2W97lWXwR7%2B%2FK83o%2FPQUKpxIfyx88N10uwXvFCtlICm3CsCdoNzrbGJJ%2B3DyZ0lGMKtvt&X-Amz-Signature=b4e2a2dd1999d7bc8420a490b6e65e4b0b425c70098a231d834b56443d4a04f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FGXKQ46%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T212237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIFN%2FMXmoFCafHJ6FmkjRL5NOiw7omxpjzhNxhefZGpP2AiEAmMQ20PbF9GdDtvwp8Fgs4B13f7waI%2Bi%2FcTSVPwAdTEgq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDKRxpd2aZYXIEnKdECrcA94aaevLCFt5e%2FED%2BKvzmtGPImOiwaQXiuwlzDeYa5nX75MfN9yhNbDJdIs%2BzpiVxXariotyXGVN7OVPn1vmjmCwzXtEOgpWLU5qO21fvKizCsoGI0A04xmH6WO9OI0qDQLZzQHSBAZhhsDMpiLo021X%2FQ8086D%2FRlAvuyo3j4SNTFcODCgYBs9U4%2FyhqeGy0SaEH5vtO4LIIqPYiRVX%2FIXvLie6npgAmmS0E8mtb8%2FyBX1lXc45XIu443IlciIU%2FAhXwoKtVme7maS6YSZbIwXW%2FhVYAJTxm8HJIdfaIKPtcvephSt9l2GPtkY1ou%2F565G9uGg9CeaaqonsLNcqgLGot9149jMuuvlbOOCzg06RCDpdcUSdL79iIbs%2FN2T80m60PcYYPyjvPe9mD88X4rfhhLrz5Ylu46Nq1RvvCUDYTCxnhE2fgdGa11gnmT6aD%2FZMJZsia9LPVAs0RuWYqbEPq04%2FYswoW3OE7ycL4HXhLJZ6LLjAZg4iDtGdJUOruNdz6sCIhVCHDuRddPhHhJvJnKXn3sdlWbv%2Blk%2BifVagImRgF4Besa0f5YhkK2yTbRZG6Bi7T8yVwzZ0tKLspiiLBDqDrB0SoOtfbOZ0MmZHs2eKb%2BkhgSZYnhCoMLvAlM8GOqUBc33KKPZtoDAR2Z5g6pBmceGWbMDWrL9js0bjIxLcEB0seneV2IHe%2F3hM5440YIdAiQzAPBEgoQnV95KtAz8mEqXnmVAKvR88TAvafV3jzS3ZX9WbN8c6Av7kCC9zb0ctc6auil7qvVBlQXAEWjKqT%2Fu2W97lWXwR7%2B%2FK83o%2FPQUKpxIfyx88N10uwXvFCtlICm3CsCdoNzrbGJJ%2B3DyZ0lGMKtvt&X-Amz-Signature=b4e2a2dd1999d7bc8420a490b6e65e4b0b425c70098a231d834b56443d4a04f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SEQFIG3%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T212237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQCf0%2BoiCoTnMU%2FKxZ6dBTgDGusk4DnMD03YhdBB8RO7TQIgSOEXewRu4ZmQHc8MNfnsfJIz9XSFR8MCg5B2fGHFTCwq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDO7opGKbMKXre3mS4CrcA%2FKV3LQ39aUsIw5hk1bYYHfxgL6bvfCAwbwKwtR8yl6svx4W5sYGUK4Yiso51%2FkqgqL7p%2FKGID9VKYH3EqaqiizsalhWKEiCOS0b6klQA4pHHx0f2V%2Fpc7TWg9g1rK5537wKMGMutua6lrx0NtjIXKqqkZiu3OBeaWc06QvLkIHcYdXevK6VOmZLIzZ%2Bj3JoKFikQfW9HHDJcPZ0tcSr63F8JPGwdzGrgBCgZ7M6jNDvNruyh7v8Y%2FuYS0SRQ2HXjrpAwHU%2FLDJx1IzmriCRkDsDIZmoPIxx9FD1Y1fo4xvrVnpDsdQfTcVX4y5U5eMKnZRJ49ebEaRtT4%2FEp%2Fm5gA6HxO%2BWcK6Tx7xF%2Fzai%2B0%2FkrMUouFqWMvXpZIs8PaHBdv7yktFI7Wd7ApIX6XNHVFGJh1v8XFZ1UO5WTtMjNwwjmWf70Lv%2B%2FQeDqGxG350sAfmIRWk%2B6v6jDJFCulBF3jyryDtBsHpZW2iiGNPGk3CQCRJ6yHSJBqOhByUs2SfXZTiLninWPFXvwL8UInc7uLe6lb5oUketiNz413pU%2F1SEhvXCorMn4ytb0owA7anC4jfssTJKYrQKLlQjuui%2BNDH9oIW%2BSTaDjvuQJWdsfUir92yWrI17MrOjjM1oMPjBlM8GOqUBEX8hkDUOLknfN3twiUVpF4TbByAcGAGoE5riZ4ZvQe7jOBlb%2FjmE771dyy%2BPOREXxPkLMMiEKCEpxsmv8PyUoH4g0vLyX4ZC4QC7CNDFvqyqTSld4mGJ9Iysz9ozBlE1f2JZDGp2eZJGuKbWhVpJXPHns8iFbgzekab%2Bw4NOKr4CXyvxAP1eXYbkFEp4eQqhzM0L2OgCG6AfKGwN5zUFCXI1GBFw&X-Amz-Signature=cab7142c3786d5050e5ab1d137279c4a502c1edf7d09294e7e323f1331841b71&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

