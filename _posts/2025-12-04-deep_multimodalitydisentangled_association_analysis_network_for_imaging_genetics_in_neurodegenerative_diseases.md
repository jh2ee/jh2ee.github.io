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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIPQYKQN%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T201823Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQCOg78sOXltv7l%2FmDdTqd1s09QVjOT5WacOcDO1QhwUlQIhAOMrY3718NWuXZwxygy8TVcPuu4P9ve4sRWGPP7nRkrSKv8DCDMQABoMNjM3NDIzMTgzODA1IgwBX5%2Bfh4L%2FsZhX7hoq3AMvhtGnFebr9wtjT1ju5OS4pMBWBTdxXbwII5K7cPw91qn37bMqrY4oEHakIJZRWsLkGl3us9qK75frwpwrqlQFEiSJUFUZpDjug1yyNFOB0HP6bjsO%2B85ThRZzPkcCUeM6sfWqOyC5Ok01s5T%2FnntZZENFkZjV4LyGkQh7olrTfqjtRN%2F7XMLBaO16jcWvHCFThow9gHqgEIaepf3NIA2f415KvXL9djAzYvRVFpSLY2fvyCIcLuTmhd%2BNTt5yvwDQ2KliC%2FId8df8iX8AoVEvnuD%2BXuL2uDXaJkPig2OgKNgRlqQSoy9dW%2BNS7GhydtlYQMt2OfbD852MjdAXJ1g%2BPDWxMbe65DqNxRzT%2FR0kQjmI7pHB%2Fk8vxeoZwtgTb5eFAG3vXNaBpwG3wm%2BZ%2BB4vKQi2cxeQudT7gTLqXbZKgkY4FQw6%2B2P%2FU2IVNkn6quWWXy5v3eBz3h7h25cFThU8AaTGbcPaHFnDK7YIAp%2Biv9krA7V16i7jgQSHHPHjIx%2BMDcwPoP2VqEBJnSnWCjQagI97yizc3tg3Rbd%2FWb8ebCtOeD0xW6d9v%2F6XbOeMxaqKfNL%2FlpJfxIPrpY1jMBmSNDqir4ZlLeDWH0Tmtuk9Vg9oqzlXCD%2FGfNxPjTDjmrzNBjqkARE%2Fkzbp4kxpW6sldILIlzuqKzzHtQqrCfLU6oOsErEA8Zyne5t9Zf%2FYbSYF8lJJ7eL60S%2FF37kcdrBdrYy0%2FoIpH9SbuEVw6LE3iysFrf46NuuByhBcpzPc9MClG6477OxD5xjZcGuLE7tQ5wenk5LuuoMtpQyN213%2F479UThgIvU5x9oYgyL4tO%2BOmDYnQ9Z9awLr%2B3L9TwxCnXVrpCVGul9ty&X-Amz-Signature=5d836d990990353d8b97b63601664e4d9ce6223450f081173da2d42446aba4cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIPQYKQN%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T201823Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQCOg78sOXltv7l%2FmDdTqd1s09QVjOT5WacOcDO1QhwUlQIhAOMrY3718NWuXZwxygy8TVcPuu4P9ve4sRWGPP7nRkrSKv8DCDMQABoMNjM3NDIzMTgzODA1IgwBX5%2Bfh4L%2FsZhX7hoq3AMvhtGnFebr9wtjT1ju5OS4pMBWBTdxXbwII5K7cPw91qn37bMqrY4oEHakIJZRWsLkGl3us9qK75frwpwrqlQFEiSJUFUZpDjug1yyNFOB0HP6bjsO%2B85ThRZzPkcCUeM6sfWqOyC5Ok01s5T%2FnntZZENFkZjV4LyGkQh7olrTfqjtRN%2F7XMLBaO16jcWvHCFThow9gHqgEIaepf3NIA2f415KvXL9djAzYvRVFpSLY2fvyCIcLuTmhd%2BNTt5yvwDQ2KliC%2FId8df8iX8AoVEvnuD%2BXuL2uDXaJkPig2OgKNgRlqQSoy9dW%2BNS7GhydtlYQMt2OfbD852MjdAXJ1g%2BPDWxMbe65DqNxRzT%2FR0kQjmI7pHB%2Fk8vxeoZwtgTb5eFAG3vXNaBpwG3wm%2BZ%2BB4vKQi2cxeQudT7gTLqXbZKgkY4FQw6%2B2P%2FU2IVNkn6quWWXy5v3eBz3h7h25cFThU8AaTGbcPaHFnDK7YIAp%2Biv9krA7V16i7jgQSHHPHjIx%2BMDcwPoP2VqEBJnSnWCjQagI97yizc3tg3Rbd%2FWb8ebCtOeD0xW6d9v%2F6XbOeMxaqKfNL%2FlpJfxIPrpY1jMBmSNDqir4ZlLeDWH0Tmtuk9Vg9oqzlXCD%2FGfNxPjTDjmrzNBjqkARE%2Fkzbp4kxpW6sldILIlzuqKzzHtQqrCfLU6oOsErEA8Zyne5t9Zf%2FYbSYF8lJJ7eL60S%2FF37kcdrBdrYy0%2FoIpH9SbuEVw6LE3iysFrf46NuuByhBcpzPc9MClG6477OxD5xjZcGuLE7tQ5wenk5LuuoMtpQyN213%2F479UThgIvU5x9oYgyL4tO%2BOmDYnQ9Z9awLr%2B3L9TwxCnXVrpCVGul9ty&X-Amz-Signature=5d836d990990353d8b97b63601664e4d9ce6223450f081173da2d42446aba4cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466243ARLPN%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T201823Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQC7u6hgBKIvmInw%2B2ICeIqtebrks4%2BLvjwq6KwQT2hyrwIhAPjAl8tSEqHJoFk2ieQfam7nqv%2BScpQHEj2js0fb%2FYS1Kv8DCDMQABoMNjM3NDIzMTgzODA1Igy03uk%2BMD1icKDhnFQq3AOGsIGCjoOZXFBT8prMlBS1fWvELb2mU4y54SYyxtINOl0%2BpzbctwUFXshfEZa7dEbSviUlRAVsNrgFXJT%2BajbyLjvIftLlFeEOrpf7TjRfxzN3N6A6pCeETrZxrW5aRYSoDD0oll9eWPQdxkapTkQB0aEwU%2FqyLtDoq7PZAsAHvMLI9GCQdf8Y1NPidhCi4CRvwM3tUW3mR18Rw0uBwLghuqwxqrifteyUCw1R84Caut%2Bx61YEHFVGnOjkVINzatkI392a%2ByROxesv5pOIypqCaofZBKXMW0TBsUFcldiQoT9pCh0B%2FKKJk5k4M39YJNtsprdeBdZKn%2Fb%2BIjXgDmK3nKGTe4i171Y7etRtrX2bNZMrfRn3W8WVAXT9zES71py7FArwW6Jf%2BHeiB4NEbmMupOsnqi1hwu5vBAo%2BPDTOmtrE4Dsbn4trsV3tCCWrqk8nthQpK1tmmw%2FOCdnfRc%2Fbk38%2BWCClscujXc37igo9yi8DtNN2Y%2FS2VM1m9YfUMMH7fLYjfXWBl4nlAhWDjXmQT1xEo8CnnqP9inBarWuiUbXP5lXhDaj2iPZI3ZN7efgwOxUgZdGnqd7rsluOYWtPchhX%2FSAAXrSm39n6UvMyQhEM2LrVp0W8kzMUQTCum7zNBjqkAXEJ1KDD9WrKdConDtWnq5oKbRWmKBxuxooLMXNegK7TllJslfOv5wPDqNskYOAizXrpxj140j0O6HrgdlyNP%2FyHyYWBRTEXsBeYJzhArb0COH1nFmfhLiS0P3OvU4FSfWFdmpxj3TDCIPHBrjaDDGSWFCLFr%2B58kupB2mHsqit3U%2FjTUlJUz06oNcOKmzrDg5tohcqxf81%2BdovDApTp%2Frqar9fn&X-Amz-Signature=c77f86f4eb1dac9135503b29afd3d29e7d651f9cffdecc287e82198af0962fe7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLZCDGBX%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T201826Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQCc5xqVAhXo09L7JE4ZGzDZuSurNIxdfs1p4cMYOIkncgIhAOnazJPg5LYxQFPryzPsbR%2BsCVe6w4RTTjzRQusy1XnDKv8DCDMQABoMNjM3NDIzMTgzODA1Igz5I%2BBEffdTyRaRE%2FYq3APZGphCTdd140DaYrxWJJJ%2FHp3p28a7RBYSup3Gm92Al57XgeADSkTRaz12%2Fck%2FfVS2vJ0etpjCuHzyBppQb1I8huFTqdtAjpKUO3yFVl7kaUDj8yWsQGcp%2FjyDgwM5SN9GjBc339R5WVR0GUf96X5sPjTx29M4QN96DvykdBVaWqMFbwMoYIzpJe%2BEDCs93r1Osc3lYNqulpx7vRGRfts2OhL1f6jYu%2FQRERrON5UZAzGRGQOkgdED3%2FWf1t%2BA7aPPcrm10Ms7pZZFzzNC17DRplAQRBNuV7lynP34zGnXlv2qBUBAm2G%2Fa%2Fh7%2BdsYGpL0evy8S%2FeXVuiGt%2By5Z3RnV7jtfyQIYeRqQdAT2A%2BfWpszYxJ0FztJ8oWM9tJIG47930ynlDJjmFt2gYi7DeQuwsE4AJ2GMsqeOXf%2BlgUyTjyrhtOCEb9DPmtKionGZe1He%2FOvpyBKigMBtch3RWzdT7rjX5%2BUNEF4gBD91FfAEGT%2BGDY9PCKb%2FVoNMGuS83hyCOkXsgT%2B26UqGxWKWhe%2FCA7STW3kq6Dqc18Q4cdqeTnvfI%2BnljcFhsdDnTJmodLTKBwB48zubzPsMJ%2BPNTp3ApZwQ46iHgDIAGDPhqymGpIjNOsP1ZD7TBWVszDomrzNBjqkAa1bnrbgktlqbcTrA4LkWnUcM1ZkdL6hAveOkOIWjsDeqbp8YougaBPFHamLjFDaFBgawhVKWSHHJoydZKzqh%2F3B5Uj4OlzhjD0tkgYOha4pCXks9A2ALJrmTH665O2scipUdszttiq5ziZ7hiV2%2F3y2xqnCD3yujW%2FgxMxpkbHDWr2g8TN0FyQatzcMKG0IkkZbBca4MYwORhFD9WeOsA8E1QU0&X-Amz-Signature=ec222c77a91badd8427d712f229315f74b75df96295b380ab370236e90caed42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLZCDGBX%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T201826Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQCc5xqVAhXo09L7JE4ZGzDZuSurNIxdfs1p4cMYOIkncgIhAOnazJPg5LYxQFPryzPsbR%2BsCVe6w4RTTjzRQusy1XnDKv8DCDMQABoMNjM3NDIzMTgzODA1Igz5I%2BBEffdTyRaRE%2FYq3APZGphCTdd140DaYrxWJJJ%2FHp3p28a7RBYSup3Gm92Al57XgeADSkTRaz12%2Fck%2FfVS2vJ0etpjCuHzyBppQb1I8huFTqdtAjpKUO3yFVl7kaUDj8yWsQGcp%2FjyDgwM5SN9GjBc339R5WVR0GUf96X5sPjTx29M4QN96DvykdBVaWqMFbwMoYIzpJe%2BEDCs93r1Osc3lYNqulpx7vRGRfts2OhL1f6jYu%2FQRERrON5UZAzGRGQOkgdED3%2FWf1t%2BA7aPPcrm10Ms7pZZFzzNC17DRplAQRBNuV7lynP34zGnXlv2qBUBAm2G%2Fa%2Fh7%2BdsYGpL0evy8S%2FeXVuiGt%2By5Z3RnV7jtfyQIYeRqQdAT2A%2BfWpszYxJ0FztJ8oWM9tJIG47930ynlDJjmFt2gYi7DeQuwsE4AJ2GMsqeOXf%2BlgUyTjyrhtOCEb9DPmtKionGZe1He%2FOvpyBKigMBtch3RWzdT7rjX5%2BUNEF4gBD91FfAEGT%2BGDY9PCKb%2FVoNMGuS83hyCOkXsgT%2B26UqGxWKWhe%2FCA7STW3kq6Dqc18Q4cdqeTnvfI%2BnljcFhsdDnTJmodLTKBwB48zubzPsMJ%2BPNTp3ApZwQ46iHgDIAGDPhqymGpIjNOsP1ZD7TBWVszDomrzNBjqkAa1bnrbgktlqbcTrA4LkWnUcM1ZkdL6hAveOkOIWjsDeqbp8YougaBPFHamLjFDaFBgawhVKWSHHJoydZKzqh%2F3B5Uj4OlzhjD0tkgYOha4pCXks9A2ALJrmTH665O2scipUdszttiq5ziZ7hiV2%2F3y2xqnCD3yujW%2FgxMxpkbHDWr2g8TN0FyQatzcMKG0IkkZbBca4MYwORhFD9WeOsA8E1QU0&X-Amz-Signature=2d15c88de37adbb0063373ee69df801b602db9ca226e006d7ea5d4908e79cd8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UGSIQMJ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T201827Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIGS0H71Kmp0a6HrrvMi7edFZWaNsDOap34vwXnrnIcRLAiEA25uudKlVNX3TSl3CAqM%2Bo4iqkZTtX8CMKW6st2%2B7MrIq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDEtpzFMhXposUUL7CSrcAygjaDkDyGjd0FBWKRXO1vm%2FCMJc%2BGrnXH3HB8RB8CQQMsYqUFru7UbY9Fc3ZVzknki4kv%2Bl9%2FLkxaFF11Q3qNqQTmSEKuGGvN02KKTvLVekITvrIcZUbdB3dMrf554Jh8NDTbqJmJddYndK4WDckkSrzJtga6n4uOdlvMcRRxQ9DjImfR3xztdLpo24ai1C%2FnydfKDvji2wW27MjXmdM05bjdsIYhoj1rJ0XcNDYSB7WHQ49XWOW2uOf%2FoklVCLBze9o31h91dOnd1uhjvGrVy8%2BPmP%2BWFVklkVHwk7CPtMX1I%2FcEh8ziCAot3PMVp7Qd0WaotUMpox9uDSHjIzAt2fc6GSWqrX%2BHMuHQQlgVWVKaEU%2B4CJ%2FY5XBN5RIb7FfkO9Ewn10PuUvtvvlYAwtiIjREXy5%2B9SOcqzkN0V6kyIz%2FKtiDQgW0dgD162VwoToXpxfidUR0vbnOiA3Y%2F3hjPSZVrS0P38%2BjpTmbRT2%2Bv5JAPhCiiE8aXBxfN1T3vOzvKCl5j4FkjRNQFYzJcuqi%2BvRfePSfPSuU3iY7B4E1ToJKv4cq8cusxSRlMGvKac2RYnLwy5iYwad3shzQw1698EvrOW85FPTaihngfAtnsnpThQhquvAa6Lf0keMK2ZvM0GOqUBMhmopQ12GTlEM0ZAXWlqm6Hyd76vZ7BwrzOAJr5ghiYqlelRT%2BIoDwY87dSVw05ky9eMNWwLbUeYaM1kUQhAgrUdildESsK2LNKdE011ShKM3OXN7vVtjLODFv3Y1IwJj78NbX4h0sbKxRee3NPsDf10zC%2FFrNoPTPHQCwsoVDrYmHC6GAP7tLS3gynqoIxdMdo2J1fvVFgDkkhYbKT57Hbdee3i&X-Amz-Signature=93c2ab311c9f8b0a144d3f2cbe79417b56e1febec5f45c38c046020d158c0320&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRBIUEXW%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T201827Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDElL6eiaKHHno2r7%2BynvBYhkOlSmVQxdCzXJaue9wZUAIgQEYIrDE3lCrPrYbB1PXyXfJUiSTEdSoHMKMKQxM3Nrgq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDAo8oTq2C734CFSgkCrcA13CTKZxWaI4Tx4PobFvc%2Fqfn00exya26Tx%2BmOX7td0LOWUYVz8dAV0mPzecTgS2YSql5aBgp0cxyrexgat7W5TWceFh%2F0k8onWKiCzm0yzVPV8krB2015%2BmQ5FpFNZDBabcTjsVeTf9bIG1Jxl6cSuF4cKy4SZdO9JNtawA2r623GcbkO3qVXRJ8qQTaLaAqAGll8ZxEnLPVAUZrIVVF8omk9ZI3SEn63qvD7aLDVwZlWu7oSWK0RH%2FRuOF7mGSIPeG36PPip8UGC2VPruDniOMpDzpJHTguE%2FN5GU9rwZYN0lSATIsyRob2kP%2FZm0lk1dmA6GhqKX0d55vHP2Psg6%2B%2BbOuou9X5F5M8amXU28c5JFLN6eotJlxdD12GzDp4j4E7u6eAfZW%2B57zQf3BDYaOunEIaWzDUNVqhlrtrHPq5S%2BG5p3szQ8pF0wmDOCStx%2BrJm2i5kZsNgmgbD5znULIuD1y6HXG2E5uBnzMtGOeomsYDSVi4ZVW3dJ7thGkG72F%2BNLzYyzpgqHcUz7ukb4T37H918IKWu06WM6Xr8j%2FN4CZTUb7Imo7uxUKXsB7OGgfniIaJ0bLqcnrcM7asI3Fv6OfflD%2Faws6tSTKW%2BT3pXd02Nty%2FQLLDGOKMOaYvM0GOqUBzyBfV6VI2TUgE7%2B7I58H7XqM3mCFeJplyXZyXQFrrihG2XoxFQgPVdPCwl0I8sBt7SuEat72h3QcdNJyAq5rGUr9QFsCOw0UCe05h3879SfMzADg6qkgkrrNDAioYcv0uztjsBkD37gsnAr9OD5i%2BBvAeWIr%2BMhrmLp%2BpfB2XXlb5VygUODsJA5uURZ3JpzQQuhb0vdrcluipbZu1lr%2F%2BY66xTd2&X-Amz-Signature=882d7accca1b3e1dfcce10d009929171b5b533253dc28413b449827e2052faef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7FLZYOR%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T201828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQDyUE04XUpY9M7ECAkQkoIxAKOHUWrn3g4sNtLYBYhn9wIhAJW0SA4gpt39UDVZP%2BJTRv2yXJikvtICgY%2BSQILrPajuKv8DCDMQABoMNjM3NDIzMTgzODA1IgyMSRxjBJ%2BTzQP68IYq3ANIajjIpk9uceFW1HwrLTGQdU%2BkxQs45%2BNxeA7I%2BWJ5ZBecC%2FHPMK2riQGztrBITBZzoDEWh0X7oPIwp1NMefTpYumToMHt1vCC8yDUNN2Jo0m3HtQ3R4%2Fy%2FdV2uTO8FMxmqZmrjTSmmIDTBAYBwi9skA4tfFU9rD4tltXdN93yJ90MF%2FUEdqYM0VGX3%2BKfTK0eLyhzJH2aaTrNOSkGtcWoVRheySElJpaNRQHa%2BNoBMrQdnmLPvjOy1pDPHegKuIxQWBsNpu%2FPrDNfOxgHg8GJ8Pbw21WFzy4LRvo3fXnST8o5vWV1lVvofVSdSL6fwjfRHUfvfrW0%2BxIYFj7J5QbCoNA5QsQYOEBuJwa7ElFs6w2b%2Bqs8huax6jYKlY6apc5pNoGrhtSlgx1YTHtcqfpPxMzAXlKD0ieWldQHbd5eDf1SeAQxtIng2GInubAsKrGqsO4DutbgREEzxazln2TL9MfYmraviYu2slcxwLFmtNEIVcwuo7qLr6cH7eXc5h%2BRv67lWc1cdTruwYyY9sTsljdxonlYUlGW5%2FJwWQb9PE0FE6BqEzme9yEGI0a83buy6FVjbNrj%2FG4ZU7YxL2JNcjmPs9wStlzNoZA1QBP11NaFVU5DiTYfsO2%2FvDChmrzNBjqkAZ4zp5Y9gF5oMuAUyinjO%2FDu8sqmDS6UkIqNO0K4TihnwVGfKnML%2BnEU%2BmzuovSkChtnxqQwPN79A3zNhC56p6YBGQcWLh4Au%2BRIbbebAbjjrKo12ceMufv50or7ivitwM%2FnFlsIlQa7wCMEEloPm0I7AIi2lh0ey5UaiYAukIPWF6GhoI8llke6FW%2FfPWHx7eNRDdku1KMIxD8%2Bpcmf7BssfYXD&X-Amz-Signature=b8a5b51c8464949f11b82cb082488a2028269a06d0bc743b832d126806815739&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664AB7RDZX%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T201829Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIEggEfPrVXy7uyzs7kNQ%2FgzIntpdwbjieP%2BP%2Fj6%2BzT0hAiEAw7wXYY4uai03mb4Yme1UYzfWlb4KPdS4lgKrTAApLu8q%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDAweFL%2BNEUiBvU6%2FzyrcA%2BXoqhqpeJYM7yS24JWjBQujh%2FZ7XLgYF48cvW4psRcbFITH%2F2%2F7w37OIXEBjWd7LWnMpEFieXl%2BJGoVO0JIQW2Y%2BcyIzuX8YPC94eexKGYu9wiegNNKKdBvkut7BGS%2FGxjp9iZwa5qTkffIdxXh9krcqKuWVHvwoyt61%2B9J%2B4OhWLFixKm1yJCZ%2BGIjb9HSlbl9fuA2%2F8ngO4RhIRzeAJW2HJwpe4SXkojIkXilGNCO%2F1PIUMh7S0HGqBmi3USJyDXcsEb1%2B4DThrE0kPZ12PGS96iFUndfmaxgQ2Ay%2BzTNJjqqXvQjzkv%2FoZj9VJ5kZqTPV7upepBJ2uiHPSC3p25OkClPpLk6RY7FFlWwZfLpcC7u5%2FnNxIYGLoQxETojqS7NtJ1TIZDWQtHoodf9Lt2GPvmpPi4wje7OaTtPXtoKXZybnhHobKgWVRHYV3oqXBSkw19dwYFOan%2BsD095Hz519woacWBpKfzdveVuxzdWrHpDXBXc1GlRKDHv1Oq%2FulUvAX1P1f4b0covtSCUMsFI%2FcWvktPkX9Aw%2FXzUcAzRE3vOMa43MK%2BW3LRc7FnAaHQApM8MU8HNIz2XmoqnM%2BtngFuIkeaVGd7eGIuwvITzsrXo4x0DtHjl1MLoMM2ZvM0GOqUBEBOaqyNw1jsvRyG6S8ujriLlIBkLpkRHMya44vNwWQ5YkoMBPql8%2BWwZv82aADlnELuAfIVUFqgcvhtAA8sRf6HLU4IPDwW4g9nbB5NBmR4qANFEAqbOplNsjENzx9vIxzqrETbzq64PHEzLsO1D%2B2jj%2F81CsrRZDvTcWVNHCDa1MUjBGifRnhq7sW7jD84FPiiujFPxm2N8oJ6fD7A8DFN8XIVw&X-Amz-Signature=d4b3158dd36942d7a21ebb6690dd7a0798968b48b5112b11c3bbbe99f26c87d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664AB7RDZX%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T201829Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIEggEfPrVXy7uyzs7kNQ%2FgzIntpdwbjieP%2BP%2Fj6%2BzT0hAiEAw7wXYY4uai03mb4Yme1UYzfWlb4KPdS4lgKrTAApLu8q%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDAweFL%2BNEUiBvU6%2FzyrcA%2BXoqhqpeJYM7yS24JWjBQujh%2FZ7XLgYF48cvW4psRcbFITH%2F2%2F7w37OIXEBjWd7LWnMpEFieXl%2BJGoVO0JIQW2Y%2BcyIzuX8YPC94eexKGYu9wiegNNKKdBvkut7BGS%2FGxjp9iZwa5qTkffIdxXh9krcqKuWVHvwoyt61%2B9J%2B4OhWLFixKm1yJCZ%2BGIjb9HSlbl9fuA2%2F8ngO4RhIRzeAJW2HJwpe4SXkojIkXilGNCO%2F1PIUMh7S0HGqBmi3USJyDXcsEb1%2B4DThrE0kPZ12PGS96iFUndfmaxgQ2Ay%2BzTNJjqqXvQjzkv%2FoZj9VJ5kZqTPV7upepBJ2uiHPSC3p25OkClPpLk6RY7FFlWwZfLpcC7u5%2FnNxIYGLoQxETojqS7NtJ1TIZDWQtHoodf9Lt2GPvmpPi4wje7OaTtPXtoKXZybnhHobKgWVRHYV3oqXBSkw19dwYFOan%2BsD095Hz519woacWBpKfzdveVuxzdWrHpDXBXc1GlRKDHv1Oq%2FulUvAX1P1f4b0covtSCUMsFI%2FcWvktPkX9Aw%2FXzUcAzRE3vOMa43MK%2BW3LRc7FnAaHQApM8MU8HNIz2XmoqnM%2BtngFuIkeaVGd7eGIuwvITzsrXo4x0DtHjl1MLoMM2ZvM0GOqUBEBOaqyNw1jsvRyG6S8ujriLlIBkLpkRHMya44vNwWQ5YkoMBPql8%2BWwZv82aADlnELuAfIVUFqgcvhtAA8sRf6HLU4IPDwW4g9nbB5NBmR4qANFEAqbOplNsjENzx9vIxzqrETbzq64PHEzLsO1D%2B2jj%2F81CsrRZDvTcWVNHCDa1MUjBGifRnhq7sW7jD84FPiiujFPxm2N8oJ6fD7A8DFN8XIVw&X-Amz-Signature=737f3de4067f0038bccc3b15556db3081e316f098497c3e81885b5b290c20402&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCMXD7ZB%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T201808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQDF9Rf%2B0C%2BSysRkKcVvIQXN1YK2T0iherF94%2BzSu0OCyQIhAL8UfMwZCv1bALp%2BTCZd9Ck23uhZHm2WdXUUOKgf9aT3Kv8DCDMQABoMNjM3NDIzMTgzODA1Igy0yRTI2NtEn%2F%2Fds%2F0q3AMQRuvlze%2FCwRT%2Be7IzNzNG59xebOZXcyF0d8f3WZ0qSfvo5srTEXL%2Bm%2Fvcq6KHUK7HmeFWmdB1ML3v2hMthMMp4NB8UJtEnAkig5iabKUzODxCjAUgKKCKSnisOyEW%2FIM2ldv%2F7mPb7j7k%2F6uOMGgY9P9FOvw%2FAS4jWYV0IChGaWDM%2FzV5aRolg%2BfcK67fZ5U7i%2FrLgZdZusTmgFqLtUV%2Fp5oh7WyTbNX7DmK5%2FU4KaXuYfBPlAoc0YzONTo4M2WOlXBPEHxtnEsnYWKDlDxv4lnDtysaJEn%2FXpQJH0dROi2gZha9wH7jMHFVliTAXk26HhLAMzIwIGHwkCy9X3OotHw3JvQ8kdZlqmM5kP%2FPJ52X6JItku%2FwKuhKk1NgITg6HTQE5pKvdagbU6HuvnZhyp6jxe4uWwkZl2zNUR%2F6KyneFI2RxS3C377zE7eDfTDbXMVxnNVTzW%2BXWLr25Mv%2BooGpPKptWu6NkXQr7b%2FDMauaj08gREWGl9bn7vVLf%2BxJ9Y8z7200KBfq5UJnMMeubL2h2NmSm%2FkSDrMQphaOmDEErg%2F1gAXVa74ZSrqer%2FgJ%2Bx9Sf%2BclfhmvOwvDt6dACZl62yG1ssfSAQeAxSTMuaM7%2Fyw4n0z5yj63JszCOm7zNBjqkAawB%2BJFs7PFlFGkDQVvRksMrohBJ4YHqa4VWoWzV%2FISpf11w1CSGGvqfvC63QPK04y7mDGbg41%2B86Iu2Piz51RQvXjC6xzBRbtirxUQdr78s6VeCPKY9CUWu09BNpCg2Jm4AR3t4X0FRAh0VEzGLGzmhaq1NAynLWuLNkJVXAMV3PqIosEHjfUb2BfkLpKb01GIkdmyAClQCdSwTchbIyYc0Ev1z&X-Amz-Signature=114b849534fb30c2d52813b4a15f38d869a557aa716fffcde72ed20594f345ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666AZ5FD6C%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T201832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDONEOrgud21jZoHA0RhzIe4VnASDr8ffvfLKIgOemj0gIgF059h%2BixB1p3k7Ongt000OALOsZu%2BaiIng1PTMjE7J0q%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDJBItUEcV8iihaKgeyrcA4NrMJyNU%2FKs62JGuA1FRIyxo7c%2BECH%2B58%2FGr8V1YZwiI%2FGtPIn1QtWycKFXnlQeYTOZH%2B%2B66fJTpJ7DDqB%2FBA%2FI%2BrLccMkWxrNwCXCcvGjC5FtbPfOqnY06OtwHlkAlBc6MVLOaO0p6fiPD1bAexhpi%2BXh0I5W7WQAaA09wbBPynN9ZOjlvVamenH9xZ9eSxt0N3K5cJph91jjWjbJtA3ewXnAgS8Iqpu5HodFxmX2RtemQeGYnZDpgW%2BKkEkUnliOvbiTJ1IhA4JW0uTh%2FwVz8VOui9sxJ6oXCm%2BEzkXOSD6ExKoBACqPxdaortavdTFYyoFjKo%2FhpnIYLlgAscaOUIQovVI2MlUBAW2f8eYAPiaLEz5JgkST%2FtMnHEfpNBXgboTqrl54qqRRSO3JPvOoFaFXzVxUrhW7fVPNtJFjgg1Ai%2FgyjJFFzwAjbvzYNYhV99et3%2Fo2icAyTa6De25O9oNUwr5KQWZI3Xe1JX71TvaKHhLYpgsZ6PzONtxjXQCiGw6JNrnzCePuVn%2BhbWrnJeWmOmsQn511fXlytXpSiQGqIblofTg7zcaqAeLruBYD60U%2FqyG8V5wtdqAKLQKq9f9KCxUHgWTnj2GRmHTV4tR1mgtJiqeimGSNwMJOZvM0GOqUBiPwj%2Bta10fkgJ28oZftAkR6vF8UuOx65mxjj6r9WY92f76DkyEy0NmEYek0mpKv1LfcM8R8rGGmXXRqmk3p%2BToiTUg%2Fx2yI42xO3O2Wif2fF0yxoXX1%2FoeWlkCNXZg2Lyy1t8W3d6DOFR45UuO1JQR1oI4TEQ9gMFobEV%2B6OjsZbXnOj74iygc%2B9nTZgfQGsSF0JRNyOb3UzFRGAPkMkNWfFwsyl&X-Amz-Signature=4f45e2bc31be1d0f06eebcb42b59cc3859dd83e12b9fbfeb5fd70b2d9dbbf79d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666AZ5FD6C%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T201832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDONEOrgud21jZoHA0RhzIe4VnASDr8ffvfLKIgOemj0gIgF059h%2BixB1p3k7Ongt000OALOsZu%2BaiIng1PTMjE7J0q%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDJBItUEcV8iihaKgeyrcA4NrMJyNU%2FKs62JGuA1FRIyxo7c%2BECH%2B58%2FGr8V1YZwiI%2FGtPIn1QtWycKFXnlQeYTOZH%2B%2B66fJTpJ7DDqB%2FBA%2FI%2BrLccMkWxrNwCXCcvGjC5FtbPfOqnY06OtwHlkAlBc6MVLOaO0p6fiPD1bAexhpi%2BXh0I5W7WQAaA09wbBPynN9ZOjlvVamenH9xZ9eSxt0N3K5cJph91jjWjbJtA3ewXnAgS8Iqpu5HodFxmX2RtemQeGYnZDpgW%2BKkEkUnliOvbiTJ1IhA4JW0uTh%2FwVz8VOui9sxJ6oXCm%2BEzkXOSD6ExKoBACqPxdaortavdTFYyoFjKo%2FhpnIYLlgAscaOUIQovVI2MlUBAW2f8eYAPiaLEz5JgkST%2FtMnHEfpNBXgboTqrl54qqRRSO3JPvOoFaFXzVxUrhW7fVPNtJFjgg1Ai%2FgyjJFFzwAjbvzYNYhV99et3%2Fo2icAyTa6De25O9oNUwr5KQWZI3Xe1JX71TvaKHhLYpgsZ6PzONtxjXQCiGw6JNrnzCePuVn%2BhbWrnJeWmOmsQn511fXlytXpSiQGqIblofTg7zcaqAeLruBYD60U%2FqyG8V5wtdqAKLQKq9f9KCxUHgWTnj2GRmHTV4tR1mgtJiqeimGSNwMJOZvM0GOqUBiPwj%2Bta10fkgJ28oZftAkR6vF8UuOx65mxjj6r9WY92f76DkyEy0NmEYek0mpKv1LfcM8R8rGGmXXRqmk3p%2BToiTUg%2Fx2yI42xO3O2Wif2fF0yxoXX1%2FoeWlkCNXZg2Lyy1t8W3d6DOFR45UuO1JQR1oI4TEQ9gMFobEV%2B6OjsZbXnOj74iygc%2B9nTZgfQGsSF0JRNyOb3UzFRGAPkMkNWfFwsyl&X-Amz-Signature=4f45e2bc31be1d0f06eebcb42b59cc3859dd83e12b9fbfeb5fd70b2d9dbbf79d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667H5SERA2%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T201834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIBReT9hTBCxN2zmJ11lWMddmo1GEHN1jcM3EJKLVImMqAiBPU20bJZsqR6OTr4uEMVeB7ClhCcbXtmWPJfVz%2BKtpYCr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMw2srheGR5Fcnd674KtwDYwp5r0BkNwxdcNxjA8ISib8UOAIKMIpjfEIyjOArVv%2BMJpS%2F%2F%2F2FsAoTTbi4DxT1%2BCJfMjkmTD%2BTfsro9Uffe6qa69O4lArEd7ndmmZQ4LrqBtzaNR1LhDQdRL7PVt31JIBi71lBGyPfzjACiws9aVbOuVLVFsamzunwAULGdlPogKjyAYg68sYoCBmG8iK%2BqUx%2BFe2hurtfJ8v5BCejiWbvw%2FTrXhJGowv5H0hSoHSMnnlaTuG6P04RbpoWhWd2CDkoGJtRVbA3zmFCHeTIOIqkvlKPB3%2FKstL4GuzezuJzL53ZjUB0wVzQbg9ohDRZH5shiPPW2EpnBMDgoyRlZbq1lk%2Fc2jzCM67V61dL4igXlMwrWxATFfTwkVEvcpVaphYaIsnbiLtu0jTdvPxULLJxM0gSasKTvRWBQhINZlJ0Pd9R0P4GCZ2QnJQWK2CuP8HXSeb4SLB8dSiNlzo0YFVdyGuK0ebGZHjwRE4ocG7IdoDx%2Bg6aHQiylGWcpZtKKGEwFgPcpW12MeUU3HwypDJ8DuAauRe8148ukeG9N%2FtAzzIEAJydr%2FWsY57gaLW%2FxfeC5nMAdtmVpdae1CWITGoCwDXL%2BZfEeLT1LW3yc0VKaPJw8wpZ%2FIsiQacwqpm8zQY6pgEZAzuVrqha65oX1A%2F0f54jWUY7Eg44Ta9XTlhwedxeLKNlgzDVvMQBZoKGMjhd2h7G1GHg24aFCTnpA%2Bq9VTK0yESEod%2FGVd9bRJWre0pjxiSFiAcZvV4HYRYN%2BpAK488wIa2ZdfLI7RQTMWxO%2F4EZYWeGZLkMwk4YbOpov3jfW8whkjymqXjZgS%2BbgPZVbeLmJtgA6qa9shtO6lVOUFYw%2FRCAp%2FFw&X-Amz-Signature=0b5e128284cf0af4fe7236c66b500926429cecb874feb7a25a39011f358c5585&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

