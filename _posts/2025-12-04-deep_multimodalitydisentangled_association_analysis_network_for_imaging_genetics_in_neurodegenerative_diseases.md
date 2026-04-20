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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VP4W3IUK%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T044544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIB9H%2FesU7ZB1umH4GyIxHWaCR55w2IL1WINC7gUiVPSDAiAcDIYAIWtlmebyWkogHiX3l5vW2rpcDQghvzvihHi4pyr%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIM7BLV7pLz6XHAMnMGKtwDuTA7KPK%2FYJxGt5BTB%2Fgv8SpULBzR8Ht9VE7DtOX0g4WPBeY7ozoLTINH9E8EbJIs4eF8cAWGwvnfaatZ4egP4NoxBNwe1JdbFasNlI1lc%2B%2FP8%2BiPWqvyUB6bON%2FwxbbfMDM74%2BijAjxlJgEo5gyoXd1jqG6gjwNnGWXdLV0Am4oXqacPgwue6H4ouxGCD6GE1WGMbyl3%2BHfQanTWs%2FN2FGLbrxsCkTMm75FUNPMla8%2BXJ4UcKP7qktqKaMQl4CoJr%2BItpYRxYeR6fQju%2BzPPO62kks4BdaH3d4oghzfGekE5It17WH1SuySJvIGevSIwZUfKoUXeQ7Fyuae83hEFGLkQwQlW51rboMShtJYXx0qJ4iSmZ2J5njoLK22%2BsreUSklVgBQqVkAlvW773%2FfK3P%2Fi1W13Z3JdbnQiQhVN72kWQZgwKeetM2RJnoKcz6ENvGfCrmteDgswjpxY2NKjGKJ%2FT6DGIHiWEIzY1sA0BOr8NRgjOz82Bswzxuqy1nlV2Ml72YDdTQnJ3L6ybsnrRZi313lQqmOBtwu0quD17dB0LarRzPssHKZY8cG4xWQNtosNx%2FKtXUBppSeoPjnSMudJR7rW%2Fs%2BN7gWjmGAL040A2ougVwskhw70N6cwx8aWzwY6pgGm8QwCPBxR4Zpe0Sjbe8eZ6gQHHbnzzFhdSxcfDh%2Bxo1ZEe8kIW8UU9MrqwG8f0EI%2B2AL94dDxoxJ5O1mDfnqrBKxyKeEwI%2BoRlkZkSq2Li5eclVFr1SAO4GMDOCDKwbBk%2FGMwKenIix8Yh596bPkWsltHoFgM5PZ14LqxvtFlfQLuby29XRXaSLdN1kNGmL%2BO6rngmrpWTicZFICYAlseiFYJ0W4S&X-Amz-Signature=394044a17661c57e56f856a13c7ad456aa695fd2d59cd451949d31f100a89292&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VP4W3IUK%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T044544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIB9H%2FesU7ZB1umH4GyIxHWaCR55w2IL1WINC7gUiVPSDAiAcDIYAIWtlmebyWkogHiX3l5vW2rpcDQghvzvihHi4pyr%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIM7BLV7pLz6XHAMnMGKtwDuTA7KPK%2FYJxGt5BTB%2Fgv8SpULBzR8Ht9VE7DtOX0g4WPBeY7ozoLTINH9E8EbJIs4eF8cAWGwvnfaatZ4egP4NoxBNwe1JdbFasNlI1lc%2B%2FP8%2BiPWqvyUB6bON%2FwxbbfMDM74%2BijAjxlJgEo5gyoXd1jqG6gjwNnGWXdLV0Am4oXqacPgwue6H4ouxGCD6GE1WGMbyl3%2BHfQanTWs%2FN2FGLbrxsCkTMm75FUNPMla8%2BXJ4UcKP7qktqKaMQl4CoJr%2BItpYRxYeR6fQju%2BzPPO62kks4BdaH3d4oghzfGekE5It17WH1SuySJvIGevSIwZUfKoUXeQ7Fyuae83hEFGLkQwQlW51rboMShtJYXx0qJ4iSmZ2J5njoLK22%2BsreUSklVgBQqVkAlvW773%2FfK3P%2Fi1W13Z3JdbnQiQhVN72kWQZgwKeetM2RJnoKcz6ENvGfCrmteDgswjpxY2NKjGKJ%2FT6DGIHiWEIzY1sA0BOr8NRgjOz82Bswzxuqy1nlV2Ml72YDdTQnJ3L6ybsnrRZi313lQqmOBtwu0quD17dB0LarRzPssHKZY8cG4xWQNtosNx%2FKtXUBppSeoPjnSMudJR7rW%2Fs%2BN7gWjmGAL040A2ougVwskhw70N6cwx8aWzwY6pgGm8QwCPBxR4Zpe0Sjbe8eZ6gQHHbnzzFhdSxcfDh%2Bxo1ZEe8kIW8UU9MrqwG8f0EI%2B2AL94dDxoxJ5O1mDfnqrBKxyKeEwI%2BoRlkZkSq2Li5eclVFr1SAO4GMDOCDKwbBk%2FGMwKenIix8Yh596bPkWsltHoFgM5PZ14LqxvtFlfQLuby29XRXaSLdN1kNGmL%2BO6rngmrpWTicZFICYAlseiFYJ0W4S&X-Amz-Signature=394044a17661c57e56f856a13c7ad456aa695fd2d59cd451949d31f100a89292&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGH65A73%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T044545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQD2vw7gpP9%2F9jf23uCP0euMxKeQ%2B93KRaoUmcfjcmeusAIhAKoYiPzLlOj4aLH0qWcSSIdmewzwznZ%2FMAvohn5EgIzZKv8DCBUQABoMNjM3NDIzMTgzODA1IgzOamqRtaKqpasYf7cq3AOxiDFptiVhP1TkHSridZizZ2DnsF5YmPjIQ%2Fz2Ovf9SkZJ0xuxSK0aCyZVPXReY5GVun2%2F2oO2FZXQoL8iwX7FgMAIADP4eNIQhAOR8OLxHJSYUBtea5ExDTk8GvKfjTamUmYBnx0WXkt6IeoX02nzi4bKKTjl6rEHefMZohJZQA05yM0pBL1E09agZyCfDUvWQ26pETejis8WKc9qv%2BFJxsfcz2D74muXPcKI8K2nZEkQBtb0wDrFiGQE90YrDfTZ8K4lKYRs%2FHFDwHkMTZHzdeqgNVi0KsdHpIPyhweQLwFDwcRZPp59yAUWe8uBGQF4fIfcxyRYZcdUhjy6bMZ7XeA8wfy3xx4%2Bs642Z%2B8e5ioq3N%2F6phiERbVwdLSgRr3x1rmjDHFRMwEBDGmM1LgOecPChZwrkhFW3HKIyrSVwQzQ%2BRtJer1gZKQsBmKVUzwELdwJB5vl0Iocuw1fc%2F6F808FQGK2Y1AfEVuCIwidUOaXKQYZCPeM%2BH7shWlUk4P7JvUVN9vu0%2FYmjCGcaHu9GmFtqjmGoQpgQm5osVTq4qhYK%2BntgkWdVV471Wx357A6UJsHSqpMTxgaTz4W%2FVe7ncP%2FVzRwOjOf4dal9yia%2B6rbPnbPAGs9OXJmFzC5x5bPBjqkAe3HzqDUxjyHRvCJAc2pCDAYRipu1AuiIxuOjd4V%2FroKTz7wGdInNz3o4dY95jTRkmddV7q6DDZ96JEfPoa9KetfBuLW3DfT2xMuqpRWOhVRVIXxJRVefrTS5x%2B8mc3Rp7fOT56hnRfgnpZxFM1tKHZ%2FN9LzDErch0vg2LlyylFz9nurf5sw9l5XrgFJQYJaVgrQi1nIgtj7tQeoi7W8unnCa18c&X-Amz-Signature=dceb0fd98b72ce46e8a5a2aad6ca1d0222e78ce9ff0dc332d106c6663d951ed4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QUA4CIRW%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T044548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQCpasKx01qLyVRBcrQHlHHgv28oGnSfCOpD39Hz8%2B9Y4AIgQCgZxYQlWM68C0DJ8aJxYoXjgHAX3Rd3gH%2Fj7m%2BsqgIq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDHTuvr%2F%2FunEYes%2FH7SrcA0WzH1HhsjeBIyQyunr682WdCxFBlM4DC8S5yQM2BzWZ4j%2By4HWbzuzronr265K%2Fzpwbb1y5LUgs5wfFOU3y7IuKaukn3%2FLPX5TG8Bw6SDqeCyWOjPuuGbD%2F5mAofDU5ZMcXAn3oiEcfJ7%2FcUss6qodA5p7P3SXg0C8YbB9pGYQKhkZrhwD5EzJfAhNII7G2BQAn%2F344aLIuqdpQc1dprLZMeb3hxJR%2BKbt2XJX5vZvs6JDGV6hbcIx5myxf2%2FgEaimTr8TTZKCk94QnlCkb%2FCvHEMmrbq93L0fC3%2FfwJ64m5m%2FZSsH29hwx5isCX9qdPJp1WzTjSB6k918QiGK1e5LpF9pLomC85WwRFe1gDLhV5EVRX%2BD2w0z%2BOGnZG5hSM%2B3wLC4lAF2a4JMg91h45HL8b0MeTlhh8ZYs%2FWaqJiEQmf5wJENEJesrfcfwgmPL8E1pymr%2BEW5088To7dbseI7jDslA40lZS68uf2sId2CiiOfVdPfftPje4Yf25AcJCMGePxXdRufZIYKEtrpAv4lfyyBotHj2mA7Fpn4BOZDCtS1%2BnjM2yJcY69lRxwLMXbWAHzB9wD2OpXOSJsJY07sgs974qCAcQar%2F1pwSYFZ%2BhmY3KUp291GJyz6SMMXGls8GOqUBo7RjNoaaELinECtvmD1lyAyw12wBkqaR6XFVkX%2F3RMib1kbcnaou1kPCpMP3T24ZxZe3EIg8v4E4dKjyM6dQEKQtRqAC%2B19pnZ6ATtvlMcxY6Nzlz8k2DGbHac4aoxwxKSC490olohzz5ArIgykdi3NJUJTVam6baQsxUqFyA0Xp0pXGtOerLVYnHn6w9WZsNleCYwHVvCCfn4Vt64ZV4VXGB6xO&X-Amz-Signature=06c244dc3dc05c151e5cd74c897aed79a6b96ab6c71b1ede8ce2a96972b3dec8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QUA4CIRW%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T044548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQCpasKx01qLyVRBcrQHlHHgv28oGnSfCOpD39Hz8%2B9Y4AIgQCgZxYQlWM68C0DJ8aJxYoXjgHAX3Rd3gH%2Fj7m%2BsqgIq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDHTuvr%2F%2FunEYes%2FH7SrcA0WzH1HhsjeBIyQyunr682WdCxFBlM4DC8S5yQM2BzWZ4j%2By4HWbzuzronr265K%2Fzpwbb1y5LUgs5wfFOU3y7IuKaukn3%2FLPX5TG8Bw6SDqeCyWOjPuuGbD%2F5mAofDU5ZMcXAn3oiEcfJ7%2FcUss6qodA5p7P3SXg0C8YbB9pGYQKhkZrhwD5EzJfAhNII7G2BQAn%2F344aLIuqdpQc1dprLZMeb3hxJR%2BKbt2XJX5vZvs6JDGV6hbcIx5myxf2%2FgEaimTr8TTZKCk94QnlCkb%2FCvHEMmrbq93L0fC3%2FfwJ64m5m%2FZSsH29hwx5isCX9qdPJp1WzTjSB6k918QiGK1e5LpF9pLomC85WwRFe1gDLhV5EVRX%2BD2w0z%2BOGnZG5hSM%2B3wLC4lAF2a4JMg91h45HL8b0MeTlhh8ZYs%2FWaqJiEQmf5wJENEJesrfcfwgmPL8E1pymr%2BEW5088To7dbseI7jDslA40lZS68uf2sId2CiiOfVdPfftPje4Yf25AcJCMGePxXdRufZIYKEtrpAv4lfyyBotHj2mA7Fpn4BOZDCtS1%2BnjM2yJcY69lRxwLMXbWAHzB9wD2OpXOSJsJY07sgs974qCAcQar%2F1pwSYFZ%2BhmY3KUp291GJyz6SMMXGls8GOqUBo7RjNoaaELinECtvmD1lyAyw12wBkqaR6XFVkX%2F3RMib1kbcnaou1kPCpMP3T24ZxZe3EIg8v4E4dKjyM6dQEKQtRqAC%2B19pnZ6ATtvlMcxY6Nzlz8k2DGbHac4aoxwxKSC490olohzz5ArIgykdi3NJUJTVam6baQsxUqFyA0Xp0pXGtOerLVYnHn6w9WZsNleCYwHVvCCfn4Vt64ZV4VXGB6xO&X-Amz-Signature=f48f8b7137b6f85c7f765cb8495f982181dae2cd3b57e0d018c1b40c5fe90018&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FAJETTP%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T044549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQDhIBDl%2B%2ByazWJC%2F5oQFsirPfqKYk8tBi2HIGljdhyemgIhAOGirwGWzgLQTb0N1lLKd6dvuBDNgxBuTeJ%2F38cwbdMfKv8DCBUQABoMNjM3NDIzMTgzODA1IgyFjvsj7TPrizEU5%2Bcq3ANmYP3rqkUz1MN3%2Ba5TzWV3R6xbwWqIEnl%2Fy1RHdOVCeor48FUWDE9aCrTYMcGdfmT1RBI5IgN49BVP2CO5kNb1vKGQUEwPRszpZxt9KSP6LUpKXWEw1ApA0JcE6ePSSYcgStQ01QwPQGlZmNsM4%2BXOVFE6V5Gkk5wMVvVjzzfSfY65diFPABuaYS5x7UnqpaPTvBXbd6cuQDlC8C8aa8%2BFaTz%2BpscCpDVVqJi7OquvuLAxrJi9OPFSXV5lUymBJl6XGNvAtaehIdC146JMxa5bmoBqhBSdUclhn9CYvsn4KqxtfBcVV9rVYZFtOt4jd2PoBPiQVpiWR3icbMr73xkLgjdcHw9Zi2HyV8gy3cXPOrHyJ9t8Tq0GYhVeQCpR3FXAPCaovxgTM82aGinT0hh49f1biCPwhGBhB6alOR6WOASh9zwUXcbKBgVx5VpmEvwkX7flgGjsJPguj2LQ6Ew45B5FGSw2eOaytsV0XIPZykxzdTkxaiUfyNHgVRuIxs2kn1E3QdUCLiHqOl54OHcwxVu0HkJj8rdANHn9Em9mrDFsEmiZLULGBHl1bxx%2FfaiiW%2BKcTv3JnS6oFKLjTB8%2BF%2BNOgdn1ez0eo0Dc0s1TluJ8Atc%2BXGl23Xgd6jCex5bPBjqkAcqUAOMQ3tTULLvRvILc0qAiFyLCffj3mGRxxHylwm0%2FRIo4oGAyVGtQ20ewDdoXPbEVYWXh2n9X631INsx%2FUsC%2BjE%2BuEUnCWPzk3FCEPKMGmkr%2BKVMQvB85%2BCrp6luQ8eO4tBGXS2scHvRl%2FKmARRm2GOFDO0j3nOCuIeCvEIxSZBbpIPvdZwZxGwDiWrM4v2zSc1OD9fIB%2BV2NWcl9lYm5an%2BI&X-Amz-Signature=a09664e3574ddc06423a9da1de54a581cf1b0ecd04ca689841de6c4a7fc3acf1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLWPKPCX%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T044549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQCLjZc7OdQq3TKYJcXmzHtgdMB6NpYHI%2BLRrcHHtXiq9QIhANcNU3BFFwvPQ4xvdaYdsHbsKls9%2FiDDHDJvbT4%2FN5UvKv8DCBUQABoMNjM3NDIzMTgzODA1IgxmcQhHDL4X%2By72gCIq3AOg1x9wXB9CZaz%2FpUyEHZCpBIQKofJx3Xb3kPIRzkqMVC%2BjGo%2FLIDl%2BKFka0ZsnUKUC35ncenvK%2FH70qLWv5PO8we6XoS6T%2Fdz4su16awBfUW2WDRp6ei%2FW4tR%2B%2F7lYMfFNSmE%2BlqTHUDw0iADsW8s3Bm%2BRN50RqJa5DyhLiMDlz8o%2Fs73hzmVPStRfXk5bSvys%2BrfdgqAJ5oGvpj78%2BKn6MqnzUV%2FdoJo%2Bpn%2FTW5bEZjSH0l%2B73Iu%2B0WPE46vMtMyp%2FMuu8rNmOMDw6LB6r9HXjta4%2BTCHDcqkMQuTrngtVOgytYTORlMij5me8AZGZGCyGI%2BHwOrfWaX58RAJWTuAC1HVvi%2FpZHPXhluzG4G%2BtTR%2BzRx%2B76B1zupjjsu7woYBb9lVprkvo7M%2FaEl5LbVs83Jj0qY7ogKuq0r1yiSK7YAUerSpjTFDPD%2Br5AGfjpDbtlU0viJG8YQXd8IjJajaSHuUFEbA9%2FXWa5IGJQSA7Z0CZQL4fhyFo%2FmMM53sYWTF0VTvSn%2Baj7eHQ1aGiH%2FakLt6gILmrN6V49JxhosK8AYCZCN%2BLSf70F%2BcjHBDbQ19ExsNIBrqTTgm3avDcJD7AoTZ%2BSgH325l71sqLHTw43zncppX9W2tYTN%2BRzDSx5bPBjqkAd1qFsJSKcBZlUdU4GlXeogqp8JKQURaKKdM2p0xryoV51%2BlRKWELqfv7WlpHUFopOXbxL91kwhBrOrTllZ9sh%2F0kBcc%2Ft6CIg9gXdtHbmAbWWmdhbWsY7s9bYqjgb20v2BaWELCzsppC36xkDSowJdSNR3jQo6tK4TvIV6c1k2H2TGIPB0IpVd3pRezyhAjbpUEm3%2BESOrBGi3L9M4DE%2FHySX9I&X-Amz-Signature=3190f68d453e42a46260d4ec9e11ca91fb21987bc620fef2f79f9f72a88cc301&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IYT6SMD%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T044550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQD1hbfaR7Bz9usddn65Zj1kQBWcdB0bCpNYzsHtXmpVzgIgaeNmNMh13K8ma%2Fdsis%2FPKMN94%2BEBy8zU5w4rMXUEmrwq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDNVC%2BTL47rvlJAKdSCrcA0eRBVOTSAbrnq9Ugn4volEhU26i9EzgsNYIv8Dn%2F7tmrNr1zhWSpNNsUbDsk68dTWG1fyHB3xoRTngxV48mJVexH8E0JzisjDVcUhVq75LUy2bPW6n7a8NUpYL8IdqQ2rywtpaEAiX9bci3wKSh9P%2BQUxpKTyPKwo0yOrIQEeITGVg%2F4OiApqhou7Lv0IXK7dOXo2nBrOjedqg1yCj7fn7FMEDciS%2BV7hFmoG0jFLNzzQDHIy2rSQ6v11NkoTTOGhV7sLBd%2BqI0N3lZ5NfYR0A81PvE7%2Fbeds0C2tQ3b4R4i4mE5VjiRghOgE%2F530htBMjENFswhbzppkEvD4s%2FAhfUGFyuTR%2BR9wL8HjnYZWgrqlCv18m%2FJ3EjzAl6cK0crwhyEY2gaRsix%2F5iQpzWwwhNgNhwRrQsauk1MNIJ4lE3Aj5bm8NNUsaTsuL0FMeU8ARS3VV5Yd%2BZIX%2Bon81pGndb4fcOoMOqLpx0J17ugrZGSwzB18GeJeQGFLv1D3CXuzQqh7d3qYqqhR1ddMku%2F7l%2BnIP5oLZCybkN6TvbokkFh%2FQN8RMUHpZqvfOqdifwV6T3MLw34VGLZGpJTPe1744AxSCHWQoAwwg9dFMCezJgwnsNBHZh4Hyc7MhsMN3Els8GOqUB%2FC7oOSDiOzsVFY8gf5fdkw4a7wEWQXbka%2FzssA3Y4OZTIEegwXCW4UsxA3EDVpmOtshqWYAkZHkUy9I2rRkmPj%2BcoY%2FMjDzp%2Bqridk2TzFcRSP2e4fG1qPZhRGyCp91OnG68%2F2GMcYnPCdOFpte3iRJWgTu8JZhfo7dK8eeBF0aF43Byv%2FE63IkpqCHSTYjnyvu8%2Fx1RaMRKBDDtRRjiQ7GoSGrO&X-Amz-Signature=ef77ca2268bf999de51502ccc53aabc46910f06737691f18cd8ae410377e491f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466436WQWTA%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T044551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQDujh5OW%2Ftxrkr5qST%2FFOnurjHScDqji0C03R2yhyA%2BbwIhALUGr8BQ01Su1zV0tFGNE5dEutk8lZXIpVtWRlehmmX6Kv8DCBUQABoMNjM3NDIzMTgzODA1Igyt4HTR%2Fp%2FPDjXD%2BzYq3ANWykDQYKmJsBXyKIqa0C3WJF2hl5eZWMtklY2ky5GkCqg%2B2k78A0p5PLMbpZtqdaqeI3qrabGyWUALxn4j2TuLyTVveLxO%2BOXTSb9cbFCjatqHrII6E7oFaIZEwj7uYv92apXjSZvp%2FhOtG3DDHdlxTIdB8pYJ1P6NitlWZ2E3yOIqCWaf5%2BKRUj9lijSUmrBYmSK0UyjLkbbX42TzF7QwQ7YOlWqNvB1gPz7mqu8Z6QVWe9dfU7iUoGDI8%2FqFcT5aonJiC6M%2FLkppWwr18KcKnSp6r5rZrrEbox%2BvI4xVZx8IfTJDMTCvOPZdRQ272s0N8iZAY7680l9rwpTWngOXCZyuzYjxlUOE%2FGMS1wjjrwoN5AvCn07bZRXOUXYQKh0QnaUeRyXG9fvehladRG6ysli4JgmOwhy2Euds2Mw2YjsBxENqR7rKv%2F%2BJlJ0VT2xMk2FSr8FruyGbTmPqnuzeI4LEUdBQIiImPBF74LVIRDwortxj4Q4XRPVU5byJF3dBLKiQDhsju8tfrqKfD%2FrSrwtSqmC13fdlm%2BYPlSq3Q0h8fgHS%2Fb6GHXz3Yxo8mPWJ1TaF6CGK24nha69ub7sIsCVHTvb2rKwoCDYYo8fAFal33MpBsbddVAvGbDDzxZbPBjqkAcy2UQcwBvFE0I9CmZTLD5rIRpwPLVvNfvss%2FfJA9neSH4qKMBQvRISNjYXDALWXubkbglELGndzWotqaU6R06111FoUX3BX1z7J8Ow5W0dQp9SKKMuxXalRU8CD%2BJ%2FnTBFnQ94wFuNzD%2BCcnJWiRTvjVxSwUwxlPKJ6lJquomkZJLvOlV0BYY5DFn6yvaz3q5d90nnMuqWon%2FD2T1rhhtJtU10j&X-Amz-Signature=881055953231eaad3a6682af40d0de82e42e0625820c9a1c2ef011ee5695297e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466436WQWTA%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T044551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQDujh5OW%2Ftxrkr5qST%2FFOnurjHScDqji0C03R2yhyA%2BbwIhALUGr8BQ01Su1zV0tFGNE5dEutk8lZXIpVtWRlehmmX6Kv8DCBUQABoMNjM3NDIzMTgzODA1Igyt4HTR%2Fp%2FPDjXD%2BzYq3ANWykDQYKmJsBXyKIqa0C3WJF2hl5eZWMtklY2ky5GkCqg%2B2k78A0p5PLMbpZtqdaqeI3qrabGyWUALxn4j2TuLyTVveLxO%2BOXTSb9cbFCjatqHrII6E7oFaIZEwj7uYv92apXjSZvp%2FhOtG3DDHdlxTIdB8pYJ1P6NitlWZ2E3yOIqCWaf5%2BKRUj9lijSUmrBYmSK0UyjLkbbX42TzF7QwQ7YOlWqNvB1gPz7mqu8Z6QVWe9dfU7iUoGDI8%2FqFcT5aonJiC6M%2FLkppWwr18KcKnSp6r5rZrrEbox%2BvI4xVZx8IfTJDMTCvOPZdRQ272s0N8iZAY7680l9rwpTWngOXCZyuzYjxlUOE%2FGMS1wjjrwoN5AvCn07bZRXOUXYQKh0QnaUeRyXG9fvehladRG6ysli4JgmOwhy2Euds2Mw2YjsBxENqR7rKv%2F%2BJlJ0VT2xMk2FSr8FruyGbTmPqnuzeI4LEUdBQIiImPBF74LVIRDwortxj4Q4XRPVU5byJF3dBLKiQDhsju8tfrqKfD%2FrSrwtSqmC13fdlm%2BYPlSq3Q0h8fgHS%2Fb6GHXz3Yxo8mPWJ1TaF6CGK24nha69ub7sIsCVHTvb2rKwoCDYYo8fAFal33MpBsbddVAvGbDDzxZbPBjqkAcy2UQcwBvFE0I9CmZTLD5rIRpwPLVvNfvss%2FfJA9neSH4qKMBQvRISNjYXDALWXubkbglELGndzWotqaU6R06111FoUX3BX1z7J8Ow5W0dQp9SKKMuxXalRU8CD%2BJ%2FnTBFnQ94wFuNzD%2BCcnJWiRTvjVxSwUwxlPKJ6lJquomkZJLvOlV0BYY5DFn6yvaz3q5d90nnMuqWon%2FD2T1rhhtJtU10j&X-Amz-Signature=ce48adfc011a6da90b96680268260fd072ce08b2d105536b5d938dbd742c87c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZY37EO6%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T044543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIBKqpcUL3vFBgKpe1K0HnGgHiMKf%2F2kHIbb6xRW14GJSAiEAuAT15dPTgZOSwqdQY4OU2Tp6v0bO3TWmzSgNQfRsS0gq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDM0ud9LukgPZxaudCyrcA3fEQmcH0XUJatM68IUQhBRdLxcU%2FhZUFaAiQnYCqDQxFHHxjj5PRHAiLYdinnT9w5gx9cMTH9p6Kq4DKCBLRZGMqdqy%2FIoCbeocAnSfKnfVo9XSQDVV0drixstE28Elvyj0qD%2FvwHk%2B7fz7GvTo2tuOW6nWJKckC9ki2TfdXx5HsOH4tYoWzk%2BiKSGHE%2F0o4p%2BCL1wU83%2BDscePKMKiMJzwIQnFflt2y9YzYbhNWzy1z2K175iHsi8VdtbKDPCevpKmsfOuMiVsIqmQpGZ74UY8Mx%2Fq1lDXmi2G%2F%2BfZO3opxzcPu9WJuD4Yp3nHFBTUdl2DF7bKvAXhM1btjh0Lh9gSxc0npVS%2BskqRvQJicslfBdTuPwQZS8ONqrpP436jf5PvLiCaq2NC6iqM1jnYkHuFLjJ5umkZy1BQIY%2FF4xPYjRRdBOCRZc8qZHxvOJQPdEvU%2BOOykTN4yAM35lL%2FtJs1e8MRF5Id5mep5PJxf8vCqAcf9eZoTN02qDJ2vn0mo9nz6vhKZU0dc1kXjE0lfPwyewWcLY42YAORohn9xC%2FtpVbRFF91f26Rl2f5qPrOWu%2ByXdqNPKaHN2cGrvEdoHOxwT56P9rWj0GMWsHoBJ8kGmBitOFSErbuhEKhMJLGls8GOqUBGLUzTp%2B9%2Bn%2F8gKGAsAOJFkekvWBaxBDv0mF%2Boy6zlarL7v48EJdW2ATBOfm5J8OtkyPtpHjXXveqW7ogDkWIgwosm8hcX74kl7qbYTbROwCxIGQRSQKZbXGU5jEF7knCGptXKrzc9JQjYEN5iTZD0RW1Oj5z6CSDinkR9BO71hWNCCAW3un%2FFX7vorawGsvgymF99Rom6%2FPC9h%2BsTW9V7IE8Z24T&X-Amz-Signature=465d84ddff390ad3a2b5a2ff66b36836850650c52b02bbc6ec2ef22a7aa8af9d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VN64BSEX%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T044555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIGhikfRdHj3ogdS%2FC22H9uLWrMaOCV8%2Fu1OTvDSTbnd3AiBupZJkDfv%2BcFbvjJOiUhy%2B7S1XR6dgA1n8n1PKEa%2B04Sr%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMuLiR5jHGQ5tGzpHHKtwDLjSxRoYUgEUWwLyhFttEwvt8RELklHi5zEYWWUKjws6T0yeIQVzrvy%2BbjBh%2BJcZeDygyYcg5%2FwcRtWDi9QMVaBvnVmf24%2F6zT0ntYrHA0nwNIEbV%2BGB37BV0mtquug%2FuvGYPEY3rJoqsLfx60Zf58W%2FhIfB5vdhO39PKYCUU3zZXo7%2Fd9RW%2FxkRVzMsajhEwvSqaBdUt1BSUi8xC79PngWaltSrmbZyR%2BHs5Xsmfaq7sksND7DcTtDtAqIGt95Y4ls%2B6HXmxqtWMKW0o0kneqjgaP7pVi3OzK9q32%2FdzCS8rSwo6KeyrEXIEHrc1zlRQ4YAxqrEcYsrrFyk4QQTNu9CVxV0rauRj24Nt5O6WoLE9DE9H%2Bb5SIDJqelAqK5NiPg%2F2FfChSke7p7rh2%2FzHUykYDEHyX%2FcRHSlM0MIcwkBfYrA3kjBdaJl9TTXouELtMILseYUr%2B7rVkedXElNHsBy6jWs3q7T9XLKlNRuSnUIlVjoW0o%2FO9Y%2FB04HysPUjnWgxFk2Jlcv7h9n8QnBezNbmNmlWP1YGRuyqxaxGxRs9efkGi1%2FlFlce011bLo2keCaGGrK7K%2B2q8r2QJ8QXcxvwrEWxPIQfVOHed0PP5fy81JDERl0XikRBnIkw08WWzwY6pgFoXiL9XaWND0nTLGrBFN3K1G%2FaeghyI4vRiF0r6p0m4g5mrQXrsMhZ%2FMiNMQH7ro1Ba1ct6vJyRwqCarBrkE10SwvN0sKxzIAqN%2Fw2MkeEWuAUqHrtNzmUADS%2BNaXSYnvy2LGOlMfMRMdeH7N4lMqevrExWSdBQm%2BTXdXbkS4l88dDglgLcGhu4a3z1ZbkW8Kk96wx5l8CSU6KwC2eKkwmRiKVK9co&X-Amz-Signature=3ba824203a989ba59b571e7a94de036a85305cef3841f194c08484d64e6a5778&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VN64BSEX%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T044555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIGhikfRdHj3ogdS%2FC22H9uLWrMaOCV8%2Fu1OTvDSTbnd3AiBupZJkDfv%2BcFbvjJOiUhy%2B7S1XR6dgA1n8n1PKEa%2B04Sr%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMuLiR5jHGQ5tGzpHHKtwDLjSxRoYUgEUWwLyhFttEwvt8RELklHi5zEYWWUKjws6T0yeIQVzrvy%2BbjBh%2BJcZeDygyYcg5%2FwcRtWDi9QMVaBvnVmf24%2F6zT0ntYrHA0nwNIEbV%2BGB37BV0mtquug%2FuvGYPEY3rJoqsLfx60Zf58W%2FhIfB5vdhO39PKYCUU3zZXo7%2Fd9RW%2FxkRVzMsajhEwvSqaBdUt1BSUi8xC79PngWaltSrmbZyR%2BHs5Xsmfaq7sksND7DcTtDtAqIGt95Y4ls%2B6HXmxqtWMKW0o0kneqjgaP7pVi3OzK9q32%2FdzCS8rSwo6KeyrEXIEHrc1zlRQ4YAxqrEcYsrrFyk4QQTNu9CVxV0rauRj24Nt5O6WoLE9DE9H%2Bb5SIDJqelAqK5NiPg%2F2FfChSke7p7rh2%2FzHUykYDEHyX%2FcRHSlM0MIcwkBfYrA3kjBdaJl9TTXouELtMILseYUr%2B7rVkedXElNHsBy6jWs3q7T9XLKlNRuSnUIlVjoW0o%2FO9Y%2FB04HysPUjnWgxFk2Jlcv7h9n8QnBezNbmNmlWP1YGRuyqxaxGxRs9efkGi1%2FlFlce011bLo2keCaGGrK7K%2B2q8r2QJ8QXcxvwrEWxPIQfVOHed0PP5fy81JDERl0XikRBnIkw08WWzwY6pgFoXiL9XaWND0nTLGrBFN3K1G%2FaeghyI4vRiF0r6p0m4g5mrQXrsMhZ%2FMiNMQH7ro1Ba1ct6vJyRwqCarBrkE10SwvN0sKxzIAqN%2Fw2MkeEWuAUqHrtNzmUADS%2BNaXSYnvy2LGOlMfMRMdeH7N4lMqevrExWSdBQm%2BTXdXbkS4l88dDglgLcGhu4a3z1ZbkW8Kk96wx5l8CSU6KwC2eKkwmRiKVK9co&X-Amz-Signature=3ba824203a989ba59b571e7a94de036a85305cef3841f194c08484d64e6a5778&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXWBPSEN%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T044555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIG65vR%2FXB2%2Fs6PcomQgrQ7tS8vPXpd5ZqdnINQg3FgTwAiB6g4HUrchTqM5vUNK6YhD9Qat4bAGdE28MxnVISDJycSr%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMOfNI439xTXpNatiyKtwDcfLDckdb5ubJN8Ph7KsKv8TvjjdA%2FbsHNNsd%2FN0R2NweMVq0Z%2B2dUOZ0%2FMzTShiMl8IDa%2Bo2XhLmX2HSERpWgNp8jIzInqcedzAp1HeCPCbDKwaUaxXCO%2F%2BrhL7a51SL8AeThNELwg8TVIaWn6VAv%2FJb990JX%2F81OJXksTshC0L76fO2DSNFVUdruLbtHIH4Kbt1sFMJvngAE7tMn009QXTFwCa1RS%2BHj7SM14ziO9mDtRxJjrAaQa4lj517krUnENoGXvxtUEDOpYYuL8I7nVd3VmcdH0ZvuZW8GzMWF%2FCesRQKfUM7y%2F7LNLGe8aR4ZEwtwwTl5SDjr1jbqkU0HhRtZW7NfztZURHc%2FA6yZhk330L999llFE4qgRC782PvRit5Mvdngtr0X5qeD0Bg%2B49vlYFpNWJhF8zLZqNG4%2BgftlzBlVFYF4kRZTwpbJD6dDRiXV%2F8bvWUBrw5vW5fBLz3etQOdL35X0SiQybLh5LqUkvHPHMdQ5cg3dsxkTbfl%2F8tOf6b8Qji0P5iU6mJdjriNxwpxQZ7fm4Nv5lhd37vJgAEaJ242Pf1%2BzYX7n%2BgiM9GSjkp574rIHAM3RAr3vGtJhI6LHQjy%2B4ncCbvyx5N3ZCy0jvibwqfi14w28WWzwY6pgEWYoUUmSHPhINUAAEr5U2rSrwtzwwqY8qm8B%2BTAD2Rm%2FQeTTb7UzKbeRWvXnNUeFPb24kpmBQ%2BAnaDAHX%2BOS3yRpuiuEdgvS70r3O35zxpekLWvKVwrMaX7O%2F7FH8IpuQ6cCwlqk3g7v7QDociIGZjrzSrEIhaRKZCwAAdNeVfrP3%2FwkM69BF69kNftTiHwnnmxYut7Lvgwh8UQ0%2FsXmyRGqYk8bMx&X-Amz-Signature=6b9afd15a927cbc83a9afe2477f664774853faa4738e8d5beef3ace3699fea5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

