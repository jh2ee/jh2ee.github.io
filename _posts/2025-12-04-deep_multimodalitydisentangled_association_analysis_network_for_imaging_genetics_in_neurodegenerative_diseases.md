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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662Y6RXIWY%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T142032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIDsuuHD%2BjFXkwjgHKd0pyU%2BfKFyroneZLfLduD3jBKZcAiEAphfiYqZVOSivkIZfaWIydpIWjXSK7%2Fjm0EqZyzHwoIgqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGc%2FYg3mKnBFZ%2B6GoircA%2BjE76c%2BNVqHKxPBq17nyNlLd0w9v1ifZJjwgZ5Gh4Njo46qD%2BYl%2F5zKPbqrxZc4iALKygp4kaR%2Fs6yZlKe3%2FEJh%2BsE7y%2Bwm%2FFEf%2BUtrieYX9aEQaiqjJw5AlsGc%2B5Eu4V1DXElNC1to9%2Fw65kRESBcF8H4OOs9brT9yTNMF2nyXNnOPMdBquM%2FtkOqZyXusHxfapctWCyHdyZEZMMu05Rf0lKwpu6wDjfwpSc7KhEzr%2BAsSOHTwD8SKZ3HOMavv7wYeodzf5ZEaV4bvHZmKKVXRT6jGgwtGus5kH9iD%2FBTFHcYFUEriWsfDOf1EBY5uUnui7I7dsPeDokhg64RXYT6C6aSVleBKok5NiPQFoJy0VJK9xSlyDRlPpKvpZFSO6cEHN5%2Box30uR1wxoGAoZhSUjA0kXoJt58cn%2BtjNoGdwvttM0r3BBBryRkHmO4VkTqLP8rPkmlJu6Wfem5GaTQevotUT5rwcieWzBHEuQTXlM9x%2Bxq%2Bxz4WzS7GZsma0Teabh%2FpPjr1ja52BlVEw5wa9XFQs4j46o%2FAhv2m6lFyYhgDpiyP%2FeneopvimupA%2FuFAyMMYTCWgipPR9QlIsymUMMXeONOY8fPvQM2hJ3sauKuUCNUdMnvN6auSfMMW8n84GOqUBWwDBliCchVC1xVCbEB%2F2Axp82OJN%2BzI%2FNVjytNFPZHzfSJtB8%2B%2FwJnGz5g0xDGrDNUhNulAFkReBcvzqdYmpYk5Ixvwtt3YzMWl1fAZDikrZCELjC5BNTbY8wQGID56sjnr3wu19bf2iINPDueGbvWp11ge2ow4Gnpzpk0cyXNvoKwn%2FL6rKgbqyNsvU7xFhu1P2e9YtMcvq76hm%2FTP9jRPnqLYS&X-Amz-Signature=67ae44ee3eae7103f1e2df5ac52a950023eaac30dfbe9798ccc3f2309d18b2e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662Y6RXIWY%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T142032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIDsuuHD%2BjFXkwjgHKd0pyU%2BfKFyroneZLfLduD3jBKZcAiEAphfiYqZVOSivkIZfaWIydpIWjXSK7%2Fjm0EqZyzHwoIgqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGc%2FYg3mKnBFZ%2B6GoircA%2BjE76c%2BNVqHKxPBq17nyNlLd0w9v1ifZJjwgZ5Gh4Njo46qD%2BYl%2F5zKPbqrxZc4iALKygp4kaR%2Fs6yZlKe3%2FEJh%2BsE7y%2Bwm%2FFEf%2BUtrieYX9aEQaiqjJw5AlsGc%2B5Eu4V1DXElNC1to9%2Fw65kRESBcF8H4OOs9brT9yTNMF2nyXNnOPMdBquM%2FtkOqZyXusHxfapctWCyHdyZEZMMu05Rf0lKwpu6wDjfwpSc7KhEzr%2BAsSOHTwD8SKZ3HOMavv7wYeodzf5ZEaV4bvHZmKKVXRT6jGgwtGus5kH9iD%2FBTFHcYFUEriWsfDOf1EBY5uUnui7I7dsPeDokhg64RXYT6C6aSVleBKok5NiPQFoJy0VJK9xSlyDRlPpKvpZFSO6cEHN5%2Box30uR1wxoGAoZhSUjA0kXoJt58cn%2BtjNoGdwvttM0r3BBBryRkHmO4VkTqLP8rPkmlJu6Wfem5GaTQevotUT5rwcieWzBHEuQTXlM9x%2Bxq%2Bxz4WzS7GZsma0Teabh%2FpPjr1ja52BlVEw5wa9XFQs4j46o%2FAhv2m6lFyYhgDpiyP%2FeneopvimupA%2FuFAyMMYTCWgipPR9QlIsymUMMXeONOY8fPvQM2hJ3sauKuUCNUdMnvN6auSfMMW8n84GOqUBWwDBliCchVC1xVCbEB%2F2Axp82OJN%2BzI%2FNVjytNFPZHzfSJtB8%2B%2FwJnGz5g0xDGrDNUhNulAFkReBcvzqdYmpYk5Ixvwtt3YzMWl1fAZDikrZCELjC5BNTbY8wQGID56sjnr3wu19bf2iINPDueGbvWp11ge2ow4Gnpzpk0cyXNvoKwn%2FL6rKgbqyNsvU7xFhu1P2e9YtMcvq76hm%2FTP9jRPnqLYS&X-Amz-Signature=67ae44ee3eae7103f1e2df5ac52a950023eaac30dfbe9798ccc3f2309d18b2e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666TS76QOF%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T142032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQCJRxdKbTlmIYKEJAPGKlHPOk1E2xlILfv2JtyHARVLVAIgLdKwY5LxQNQMBDbOLXO5BJwl29nHUpfPC%2B12S%2FGbe5wqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCJan8VStosQzx9Y4CrcA5BvsVuPYm7xDn9ZQQ2Ezgj5Mj0OLfXUrhf3ZHlWnOJfzvdjVPvzkCxcnIJ9V0Q%2BZ1YWmmVGgkgJu9%2FAHBGjWq%2Fnsfzor%2Fe0LoCql1u%2BFO4SomqOQ3kooScLfeiOP4QjdMHuYjlkgOkziAzbS0OBGWAOAbijG42XD6SIHhoYQSQB5hFrPxhwHznKhCHoWVgOWaUUrT5NzEtpNVGdlqWg7kWMuaBeihJ5IF6Wz3kUJS%2BtmzbS8vANnKrEsOVcU%2FI9Wsy2PAq3kNJkunzxYEVryRcFmnOApMXD7SWl4EXTPFM6DdMvKnshUgZrA%2BfnmS0Ibd8jlkuSB4WW2ltgVzvKP8V2BX0xj3j3og7gjrh%2BK%2FqhuD5O2ASJRP%2BeZCeYGTFXWpN3wG%2FTpeHPiafneHcvb3jG3AUD90bYH7KnQqKH1bO5Dfd6Wn6nRtAFMlMC4CPXqyWdUV9BZ6kQXEC69TDz0O36WOwk4RYPYVt2hATG2MMZjkgP9GG5c5YXAPtE73YeD56JICLUhDYcd6emniZ6JeMbn9GeossrtjhPei7wy%2FjjoVlY9tOrc3DOrdrXhp4cg78wT53MEb2oHfKeqPREsVud1Lxf%2B53quyJUq%2BsfHGMh4wwUmib5cbzEChHJMOi8n84GOqUBq94lQoH4RJS%2F3fuxmpFExT%2FwGTpMIUBhdyferfY4ggTDyRWcXTiXoMoEhnNPulv02dW3uWvk55WixzKhqWwAeSBqHnUwc%2Bhd2qxlffStXNP90Z7FJRqKxTz9yAibbj%2FzmIbMj91NBjwlYCmEO%2BesSwwkKl0AYn%2BVPYwB%2FoZ78B0MBOjOSNVdo82Dm3sdIGYMX3mdPtq9jIPevwyy9TlruMT92%2Bv0&X-Amz-Signature=7f45e1f2ffc62abf06ff2c9b82ae4e3d20f20f4a81b36fdd7be23eb37c08b170&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKZYLFP2%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T142037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIH%2FnT6PzlOyHCkVoEm%2BjTB8O704l57lqisGSAiZuRMp6AiEAtSUIjGVwQ33F1YnvvF%2BuYlCUnFWIkH84Y07Yim7F07YqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDON4%2BV2yKRVYjiYAHyrcA2pLPFumw6CXJHNckfpOKlAqECZzykwWQbMxMxgX5b7q2%2BbeH6MdDmRnFX9dvIXnOFA8jqvG36OA6%2FK7loMpgNrDiZXyQhrVZBCwbjlV4biraFqcqGOVOGc9IjVzCx6ek43%2BgUyc72xkqNVf%2F%2FyTt63ESL%2Fd1OrxeWqrUrz1bP5pMhkBJL8Sw0R6fKksKaIRwUIOdc1stAJx8%2FLZSQK42LYBnOQQxGddT%2FJ1%2BdhzVjUFKMAbRJcrf7dGAQteeuNT8mX8hD5eO35z1%2FZMOkcSSyxUI%2FYWvzLqYFV5W9%2FlkB%2BHrUdsbwS%2F%2FNzR6gg%2FJxcdCe8U53GClcwGN5By7ejRDOiO3PSl3yNWBFKzg8BBQNswQoVQwq9yN0sVvmkLUNDhCbwBOr8gkHkVb3%2FJ646Tl4LiwRq8VIFHN1eUGtYNyOnY4J9VYSFkFT4QykqzC2AjzR%2BfFyVc70%2FlB1ANxhCJgl%2F30ujCX9oPDLk%2Ba4bRJKbsM3NGHC85FMwg6jY2RWilTJ%2FCk1oyJ5RiUlq8NC3mM3dePQCHiG33zXC62cRvgOILSjg%2FtL7NG7SLIbfzY0NZbjUW9FSpDXvlFoVije2xzZfUe0WU%2FkPjCqzETrG%2BEYcneddfvECiwWV5wsDtMLK9n84GOqUB7NORle0SDP7zuu7BC%2Filxn61wj9pGKDQaSnfAb0OIssDei9Akdx2f1Q54p%2Fu%2F8I59xJ2C%2BDIQ4ziHRMCSfN8cxaBadI76Mnhj8SOSeHw7TYxwgeXpQmxCtoZ4047quoHGS6oc7dtQpEpAzVoKHQf8W11QumFukdRx7%2BOmC5WNuug89b8MFFSnB5x%2FtIwursN4rYePaEHkNJJUV1v1uZnr3gQZ8mm&X-Amz-Signature=4c0b01556f8dbdbd42adb095c072c1d93bcb41128cbb9999608e6178a4df08cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKZYLFP2%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T142037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIH%2FnT6PzlOyHCkVoEm%2BjTB8O704l57lqisGSAiZuRMp6AiEAtSUIjGVwQ33F1YnvvF%2BuYlCUnFWIkH84Y07Yim7F07YqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDON4%2BV2yKRVYjiYAHyrcA2pLPFumw6CXJHNckfpOKlAqECZzykwWQbMxMxgX5b7q2%2BbeH6MdDmRnFX9dvIXnOFA8jqvG36OA6%2FK7loMpgNrDiZXyQhrVZBCwbjlV4biraFqcqGOVOGc9IjVzCx6ek43%2BgUyc72xkqNVf%2F%2FyTt63ESL%2Fd1OrxeWqrUrz1bP5pMhkBJL8Sw0R6fKksKaIRwUIOdc1stAJx8%2FLZSQK42LYBnOQQxGddT%2FJ1%2BdhzVjUFKMAbRJcrf7dGAQteeuNT8mX8hD5eO35z1%2FZMOkcSSyxUI%2FYWvzLqYFV5W9%2FlkB%2BHrUdsbwS%2F%2FNzR6gg%2FJxcdCe8U53GClcwGN5By7ejRDOiO3PSl3yNWBFKzg8BBQNswQoVQwq9yN0sVvmkLUNDhCbwBOr8gkHkVb3%2FJ646Tl4LiwRq8VIFHN1eUGtYNyOnY4J9VYSFkFT4QykqzC2AjzR%2BfFyVc70%2FlB1ANxhCJgl%2F30ujCX9oPDLk%2Ba4bRJKbsM3NGHC85FMwg6jY2RWilTJ%2FCk1oyJ5RiUlq8NC3mM3dePQCHiG33zXC62cRvgOILSjg%2FtL7NG7SLIbfzY0NZbjUW9FSpDXvlFoVije2xzZfUe0WU%2FkPjCqzETrG%2BEYcneddfvECiwWV5wsDtMLK9n84GOqUB7NORle0SDP7zuu7BC%2Filxn61wj9pGKDQaSnfAb0OIssDei9Akdx2f1Q54p%2Fu%2F8I59xJ2C%2BDIQ4ziHRMCSfN8cxaBadI76Mnhj8SOSeHw7TYxwgeXpQmxCtoZ4047quoHGS6oc7dtQpEpAzVoKHQf8W11QumFukdRx7%2BOmC5WNuug89b8MFFSnB5x%2FtIwursN4rYePaEHkNJJUV1v1uZnr3gQZ8mm&X-Amz-Signature=c94fc027feb8e39a63e75e2e8721a39e92927ed8dc21156ca56634d1a9465da6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XDZX54F%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T142038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIEDejiVrZNyS2VVcF1Xruq5BIC%2FkFANoHptjYS2aL6reAiEAw%2FOjumwo3YkySAdavgBhUsKTqdRcjoGjFrUUo8mIZGoqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCvvkVdsLTYmm%2BBAPyrcA1Mat%2F5ClIXsX2H7uraHw6UDWbtOG1MDVAbx4JTLS61NDsOhzZQ0tJCEAf%2F%2B15rpE68a7OtwK8%2BX3UiELFDSC3t%2BQCzc5qsV%2FT4vrmAEfdWk%2FnWg6jbBz2kV29niHJ4NOLCghq0ejZt%2F15KgLAR9Y8Z8oQ508o7W%2F8ck2Nk7MLuFCpefR9gyQ2DQXXg8mhk8AwAbIdFzDGBNVooiVxN3snSE3bKY3yGypFzj5hsWJBufTv9oZmirLoMqpzKzzk3lb%2BJ5zRzUMiE2eN7lIm1UGu0mpF0qCrXeWmRmnN1t5OO8DDSV5P6OIWP%2F0yIqaBoQoZ22T2KAenOYtJSypjs3%2B33MjnMx5bCG4G3IAB409%2FEpSAxRqWWJE58rjpr6ck%2BmEfxfDXcb8LIJPEiVoE0Bv9p3qfGaWdT%2FEozLvV3sGXsRH4iv3S8PMqxVKr1h2V010m26aCjMku%2FT%2FSSYAHhou3e5lVj4PDzU82NMvKUslwgnZ4ddS%2F34luORQIN8mpFt9ILtvLvVsjjZcYspoGoftUFkp18NHGbh4OKkl5E3YT6iZDi4xFm5ZD86WLsDcUK%2B1R9JKx8nNggH%2BX%2FUuTCmmiomoMj0L0eXv%2Be4AmuZv%2B8M4mX37baH0uA5MOtIMMa9n84GOqUBErYi1pVlRIwbnjg%2FmpISIohhdcmg8RLM6iTOf06VaB83Bs0eeWX7lYXI3dBBDSVd1V8rHKH7OS8pgQzCVq%2FiKqGKYpdz16iwLS4Ka2ryt9hDcdC3OAhlYPxlomJD8nImM8KdXZdvVRKN6nUWvwYpUShroXyPDDJx9kiKEs3ia37UU0Uz9BXP7zKBnabrhXYDu0pIdkjvk9AcdPSTJX1ClHh06dkM&X-Amz-Signature=492965f7693169514b2d59a93a5814dffab081f61e96dafc8abd339aee6a4e57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666AIA6IAF%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T142040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIBqC6IlB0nH3eiUC7TQEnlI1SiRq5CMypq4xNZhFeJFWAiEAznVsyJdhGguU8pl%2Fnnf9fMV2xkpQc16g64UGXTsiGnYqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHR70oHnDD6VjopSBCrcAwnq1GiVWmfuthCm9bpWGlJo20YYfbg7jcuX2DrljsRvEXkMCjtDVHYDxakwg4GpprQyAiZUn%2BIpBOhn8yrrujKuoG8LcfdnM5U8di7HvEmUA6Lj4Je6PpqS0lT4lgrjGav7GhlDUrt%2Bhy662WcVOeA0FuO6UVeNc2qbe8U0%2FSiaNbElqAcUXpzjrCuxkNSaLccXJctes8TJOkS5rnY0mlfJ6uZv9SG3sgmvb1Fp9Q6xrkY56PTM1lnHOa0A1y78h3Qmz4t2zs0R35GNhXNGGDWwBjxmu5UO6LLHU4eHf0kcl8Tcvs3o3sc78VfJ8YRfNPc1hN9lYBqMK75SmelpnFNAIcmjcNFrDKs8GGBKg%2FPTpsCdUjFbaftTz7O5X3ZKKXHAMAXOH0daN%2FaImUcd14Ib9mW7DrYSqIIPCgarPjCtlFpIIqDPHNVVbFT8X%2BIxAlfwZUZ%2B7OJpt%2Fod7f%2Fp%2BvH2AJlBF%2F69AfLr4%2ByXZegvJpX1xuVIdsoMaiv2s69H8lp97dXE4Kdm4AoyhYW31fTUSh%2FjM4XUQK71itDeU3a1Kf%2BGXJJ06HgMy6mDdzd%2BnUOxMiYEfaKXFRKzpWLFVd12RL4QzAkhSw4WPShYwhheLqJQEwb%2FKOwqM4i2MMa9n84GOqUBtgrapP7%2Bv4fqcFVpFhsocZqV8ViEnAJekbSEtY0AGyJDqi8UJ2gnt2jTI6eLuaUuGOAnOnkRygCGpwD02cNss9UNU%2BigTHuhZO6W%2FnLmy3EE6t%2BDAFCFAFbZT3A5ZIjNDWVmG%2FICl14PHv4o6D%2BnEvDaWpQfxVvgBQ73pQBmHcfUbsZpgNwPVwUhkOm7Ou%2F1%2F70dxeblVsrINHgqs4LMtnnpsCp8&X-Amz-Signature=e8c69a6bbcb00df86e531584c31ad58643708b7cf89d4c89695e3022f6fcf0e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YUJDTD7T%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T142041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQDlfgkMEBIYODV%2F8QHsTi0ODYagGs0en1ruhQ2Ew7r1AAIgWRSwrUhx6sYr38XbaoeyFeoazRc4gi%2BqHJmB3587nRAqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPOqd%2FpZHqVxFZmHdCrcA3NmICbjj8zSgaWq%2Blp2PKyzLuyqivV5i6OphWCPxqYbOIhgMVDuGBusKRIQGRrtukMaIpuY8xp9eE3jT8cx1XUEzI82BiSsYgURpciVYXqyRwUO7ZVh5ELN6T6bfT1LD%2F48%2FyNxb1vg5jUQgSJqgAaK2xeCfOmnv8t%2FyaTLCKtET%2Fn4AyeDxNnuFv5qMxIYEs1sbKZII8%2BuKXJ3LSX6ql8Qg%2BfHNjxNFjQunQ0ercmAgkiLYt5z1erOLM7xMGcmtuKDjWCkhNKQ67YXRavIph%2FI0im3ppgFCO8BPhhThtTY5B1ovId2Q8nvsDTVmtCLY%2BpHJDogQOt616mVeWHs%2FQLNU07kXMH3ebZif3A3Y4UApN9oHf6YGr7EWeO%2FhWQit2uDG%2BhAxBbSD4fewKBnuALdyaIcJZZYDXpcs3nTfAETNOU2%2BgPnd8yUa2VFL%2BLRCVNfZDq5oB6mPUnuqgpHOoWWHj3DyIbRZj1SzG%2FAXitjGrI1LWgG7Y2PCWAg1pCW5yniJwksAJJ%2FvbiZ2dfm3iuuffcnkkLB25H%2Fgx4RmsXXLplWSZbeQy7BrxNTIgeQG%2FGj1Pvg50Q%2B0o8dNZsKfPhnGLW1KaXt5w0OqEfYSt9VcyWcNx7cVsSf0gGSML68n84GOqUBcOjRKMAm3rUaWjAZ4iasIRnMvfemvBXta%2BdLLaTT65b2YH87GO%2FWTdDY%2F%2Fyy5IOwPPVmbkNj3ESLn3THjrRPZoEX4x36UC2a0IzMAEfQaODs7sM8IdSQalJ0zrOuBdjqad6hA7EDUUosQ0iEbuqNbZkV2TsTVEIGeGKt3JNKpZiJmDhWyRU1g3l3tIf9Ltllu9uU7NSml2tSOh%2FqpGGiImr5Em1E&X-Amz-Signature=073d7e152e63ba43cde5e2440693ac9cc591464a325e2e746f8c21f4fda8cc19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRQJJGAQ%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T142045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQDBpv%2FUUH632COFehRxRqfLdfjyazRgRxQLL%2FnaPkLFhAIgRpow6r6A6PX7V54ehafJsWPUR309iL10PXy7v2f37bAqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOkVzbuybNeNadsdJyrcA2iD9zhCg2NoT%2BavCQPTiJCPxvFkKTPMBvNZ16GtBfUe7MjiSTfcS4nFl5DgIH%2B%2F6JtLnxNaDTEvqflSGlVPkw2OcGF2i6WTgsW6eEBLD47EB3VwJHKJZGhPNWMJjZ%2BmJFPRim%2BngFUXh6vanP%2FUBZj1vFqPznDBaWDmZr%2BFSbhLm%2Bdj82JDQwcSp92KAa3pYqQsTunUp%2BCC7i19XONzCVaCRf2CLbGfPM0cktZBSaT56zTJcJX0iFr4vzaReJBNq%2BfJua%2Bzq9%2F6AL2XCAGyFV9njDUIPz7zGj7yLOcTA1iliR7I9U0NonReD8J5%2BUG9hS3zmQTU%2B8p04%2BmyCpIXwNlRjLZaGZ%2BrqObsmLWGHgz56YYyvOlzyw8Vj1CkIDRTyq075HwRIRZo9v3fGwTYhhHOXf4TdPJzUlM7tFJwwHO%2BCTb%2BRAGkaPoKVeMVld0zlijzrlt%2FcNkvGDETR0Xf6%2BjPtLHU5ew6X34HE3Yqp6dcAPnEQHDCn39dBbLd2MuZV%2B5Dh3ZHBxucRlIVlsInxI2z45YT5rJGzR%2FTVhAqmUSQgyZNqyV7d%2FgDNTh0UMe9oLs9C77VU%2B3SOHgEDtRDCwH%2FpUd9MSOK8k2%2F0Gs4QkBf1lG%2BZgSD5k87c9WeMNm8n84GOqUBUZyAMmdWzxrcw8pvhpEP%2BTwFMguKIlLJwTUKPiOd4JmuDZDHRVMyz1U2CZW2TZMx3uXQsS95s79A0lw6s8mz9rVoAFrQFpSvQtNOL4hfGPejIWE50mHzI2wn%2FHQqZcS25ECB58%2BllVi58lrjTD9oikbzaUgrFwbOEOgQ9BerttBto%2BadK4zcwQOTpi9wcQb0V1UoJVORSkkINdwzB7FPi17dSXPd&X-Amz-Signature=9c7b1f9ac12effe00c99228b08f89b898df3da336bd7c362e8449192d8aef9d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRQJJGAQ%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T142045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQDBpv%2FUUH632COFehRxRqfLdfjyazRgRxQLL%2FnaPkLFhAIgRpow6r6A6PX7V54ehafJsWPUR309iL10PXy7v2f37bAqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOkVzbuybNeNadsdJyrcA2iD9zhCg2NoT%2BavCQPTiJCPxvFkKTPMBvNZ16GtBfUe7MjiSTfcS4nFl5DgIH%2B%2F6JtLnxNaDTEvqflSGlVPkw2OcGF2i6WTgsW6eEBLD47EB3VwJHKJZGhPNWMJjZ%2BmJFPRim%2BngFUXh6vanP%2FUBZj1vFqPznDBaWDmZr%2BFSbhLm%2Bdj82JDQwcSp92KAa3pYqQsTunUp%2BCC7i19XONzCVaCRf2CLbGfPM0cktZBSaT56zTJcJX0iFr4vzaReJBNq%2BfJua%2Bzq9%2F6AL2XCAGyFV9njDUIPz7zGj7yLOcTA1iliR7I9U0NonReD8J5%2BUG9hS3zmQTU%2B8p04%2BmyCpIXwNlRjLZaGZ%2BrqObsmLWGHgz56YYyvOlzyw8Vj1CkIDRTyq075HwRIRZo9v3fGwTYhhHOXf4TdPJzUlM7tFJwwHO%2BCTb%2BRAGkaPoKVeMVld0zlijzrlt%2FcNkvGDETR0Xf6%2BjPtLHU5ew6X34HE3Yqp6dcAPnEQHDCn39dBbLd2MuZV%2B5Dh3ZHBxucRlIVlsInxI2z45YT5rJGzR%2FTVhAqmUSQgyZNqyV7d%2FgDNTh0UMe9oLs9C77VU%2B3SOHgEDtRDCwH%2FpUd9MSOK8k2%2F0Gs4QkBf1lG%2BZgSD5k87c9WeMNm8n84GOqUBUZyAMmdWzxrcw8pvhpEP%2BTwFMguKIlLJwTUKPiOd4JmuDZDHRVMyz1U2CZW2TZMx3uXQsS95s79A0lw6s8mz9rVoAFrQFpSvQtNOL4hfGPejIWE50mHzI2wn%2FHQqZcS25ECB58%2BllVi58lrjTD9oikbzaUgrFwbOEOgQ9BerttBto%2BadK4zcwQOTpi9wcQb0V1UoJVORSkkINdwzB7FPi17dSXPd&X-Amz-Signature=b6142cab4cffc97a779fd462c32532cf0d457c50adbd0e7cc5eae82babc8df4f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYZO5ILP%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T142027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQD%2BL6NBhCZDpFt9c88HnEOSZql8JQwonpQlaM%2F2VP6%2BogIgbMLe5HFvaQoKSOddxb9CufPutNnjtr1DliBocFHLSRsqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNjxPancCOxlNEeChircA9vaTAkyjCEAZuABqadNADhgtFW8r7aZ4cJpeYb5Nyou8s%2F2D6fw1%2BVzImVZywzaVPSeZ7%2F6AqywlkqijJ1eIiTRzWLU1%2FMZ4GnXdw6KcOLndRCYjtnHFItbF20lxR7dv3sx2IEWCKwiHXYDkUuDIJ6QP8TcHJpfy9Fhb3oMElh3WKdHXjHbueMzudz6RB3aEa2UiaVHufP1wiahxwrZt5%2BbTSriIKEUYoCSnxT1KPL23V7XjoO21d%2BB2AiGdC%2FbCCZxQwhZNChWs0iY1h%2BbNsnWVDDn0YE9cj5a5m0k%2BLOXd2LSbwoDzKjvT97RmN1l1DBBeEg1MnlEI6eVftBmHJ3tDpiUXwYkEK7ASv9sOxbQ%2BksrjOBWfc%2BGHX6nlttm5rxqqs8pJ6mWhFk%2BNEdmyxSHGujsM4%2FAF%2Fydx98GPX9iVeQwTMNW512yt1YSvOPbfxx89eYLw7AXpusw6bAxhmGlhICaZq%2BLRkoi5waS9vAdwa0q0VqMHecxwZGylFR%2FwlY%2FqSsZTdleit5yjSvV2J6vBwFoouEtQ8CnNWKztSKIYyZDy4cUQWV3%2FMR%2BdxmhF7k%2FR5qEdJ5VFWr%2BFO7tEr0YSzV3uH9CleUfv0GEblfazRDiRruye1W599aHMPG9n84GOqUBqFUL7%2B0tsppUfWeQ24fUZg2Ex%2FZoF3HRab5ZaAhuuN%2Bv1MCb86TJZ%2ByHfx8L2Zc1BEgNuUTVst35zIS9tvVCtFTTQyD%2FZizXp4r63t%2BvstspWIDw%2BQXDDY6Dkw%2BKgKul2lc5OZSBdx1WZlJzo%2FpT56yMbtjAM51iXQ5WJdrmBWBWdT00bnYjOsCXIoT3QCWOIvCJ%2FFum9mEXtIEqOBFtHBs2ooiW&X-Amz-Signature=65cb72ff9dc9a292c34e7b9c955c8cbac331ddf2426167e4bd99da33778fefdf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TRCVCKV%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T142048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIFEA%2B85r9BNVbdsDxvz0%2BWUgZVFBW1abSucroaUEm7vHAiEAsH2hhr%2F7eRpVGq7nmTs%2FifKrgVclf7jKczbTg0H56%2B8qiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP5GSsP6fDsuuaysOSrcA3SpURRUH97qg89pbZwJZgzJHrgHUHXHWAlvcr%2BvLppheMfRgPMGjpgY%2FcbN5u2QJKNEdrGv8rLMoTjoJE0p6KluMaivtrrk%2B59%2FQFVZ2%2Fb5ECzryU8V9CNPobIF2HNNDJ9iyzSIYFmoVWYaN7Gg0AJlr%2FZQScBWSyrjE12Cs8NR8jkwGcwbCb2GmHAyascPwTB%2Bfc8AUVWi4DFYTJfIBLsNZpqZ3OkuHsB%2F4Zrj07Qbyc1YZxWpgyZmdT58BW7VOatOMbYAgqcpw5govnVAvzjH6bKNr%2FMTowqfkxDvjs1cDKd2guTImaP%2Fdkzr8vqAOeWdf8xGM1Db6emSSZMKMK8iOiU7n8m2uhoRc7BjPnjuARFH50UZ5lgjh3VMs%2Fako%2BpvrFuN22pOzPlaETiFetD4LQOniugag2hlLRCr7VrTyyV1ilkj2VoWTardWf0QM%2FDaSTrtJuL8%2BdP5niyDVr%2BgZk7f75%2BZ0WVDsqIv%2BaVvPCUfY3I7%2FCap%2FT4HWU2Fr1Q%2B5tgAScdnJMgj1zMHPj1lwNrZTmu8XN7meGSc6fPjDDAyVpE688zgmO3sHmDhJFpTHVPkcgUZQYy0%2BahxgG%2BZZBcT5xVzbTQJ%2F1uoWO15ZwP%2Bxzlw7H9O3qUWMOK9n84GOqUBmhxgT8XWAiXM%2BG4L%2BV%2BX0p0wpEa1WuQR6CowUAtXu4rBsARamL8AJDT%2FGZenalvPZEU%2BySdBgHACrt0pN7bbmuxGvvvRC2Tou2z%2F7vppoFmqJ%2BcOcBl42TSep5z46gxhfi5qqCb3ej6ZM5XXCWcOL5epZTQAYmyZvD7Bz0cPt9fR4GYqN6DAa%2FwzlFzl3MQ4QieZgK%2F609JPbcNoXl5ChxqNOWq5&X-Amz-Signature=074f52d68cb195ac231c9d84cc91b0986ad5b066e7931aeaac2aefeab40d3b00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TRCVCKV%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T142048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIFEA%2B85r9BNVbdsDxvz0%2BWUgZVFBW1abSucroaUEm7vHAiEAsH2hhr%2F7eRpVGq7nmTs%2FifKrgVclf7jKczbTg0H56%2B8qiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP5GSsP6fDsuuaysOSrcA3SpURRUH97qg89pbZwJZgzJHrgHUHXHWAlvcr%2BvLppheMfRgPMGjpgY%2FcbN5u2QJKNEdrGv8rLMoTjoJE0p6KluMaivtrrk%2B59%2FQFVZ2%2Fb5ECzryU8V9CNPobIF2HNNDJ9iyzSIYFmoVWYaN7Gg0AJlr%2FZQScBWSyrjE12Cs8NR8jkwGcwbCb2GmHAyascPwTB%2Bfc8AUVWi4DFYTJfIBLsNZpqZ3OkuHsB%2F4Zrj07Qbyc1YZxWpgyZmdT58BW7VOatOMbYAgqcpw5govnVAvzjH6bKNr%2FMTowqfkxDvjs1cDKd2guTImaP%2Fdkzr8vqAOeWdf8xGM1Db6emSSZMKMK8iOiU7n8m2uhoRc7BjPnjuARFH50UZ5lgjh3VMs%2Fako%2BpvrFuN22pOzPlaETiFetD4LQOniugag2hlLRCr7VrTyyV1ilkj2VoWTardWf0QM%2FDaSTrtJuL8%2BdP5niyDVr%2BgZk7f75%2BZ0WVDsqIv%2BaVvPCUfY3I7%2FCap%2FT4HWU2Fr1Q%2B5tgAScdnJMgj1zMHPj1lwNrZTmu8XN7meGSc6fPjDDAyVpE688zgmO3sHmDhJFpTHVPkcgUZQYy0%2BahxgG%2BZZBcT5xVzbTQJ%2F1uoWO15ZwP%2Bxzlw7H9O3qUWMOK9n84GOqUBmhxgT8XWAiXM%2BG4L%2BV%2BX0p0wpEa1WuQR6CowUAtXu4rBsARamL8AJDT%2FGZenalvPZEU%2BySdBgHACrt0pN7bbmuxGvvvRC2Tou2z%2F7vppoFmqJ%2BcOcBl42TSep5z46gxhfi5qqCb3ej6ZM5XXCWcOL5epZTQAYmyZvD7Bz0cPt9fR4GYqN6DAa%2FwzlFzl3MQ4QieZgK%2F609JPbcNoXl5ChxqNOWq5&X-Amz-Signature=074f52d68cb195ac231c9d84cc91b0986ad5b066e7931aeaac2aefeab40d3b00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKG6WL7G%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T142048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQCniSgK%2FGDGvZTt7ZSCrw%2BtVkVa7PVe0A5quzHjpPhItwIga8XaJGuqdP3%2BzNaZeuS4%2BMP8cvxeDiTRXwqHfiV53yMqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM0DfVxpqp0EGKER0yrcA0%2B5TWiND1raHbk%2FybJQrP%2F4vtOL%2BrESrAq9Rbr%2FTiEuMlWDl3BLPlT9tRBqMk8YMRbcxuKKIkbGGNgpAt1tjx1MLOPUQA5xQ7R7k%2B78GztGp0JQlP%2BsOFkGfs2bAJ8ffi%2FFgUbNYbJTjXc%2BtHy%2FBKU80%2FH2P2SiQ30x7noU9XbC32WiFollHnJgDoiqQPU72EhbcRq%2FLkVRUo6N8qYlmjgdN0sOxWjNeOITBSb7riwFngOb3v2MVmdzEfmLxvQ8xYUBZPvVWAs8pLHQ3GUN1820ieAyqU5bN%2Bm1Dw0kVKe5O0Nd4TKBHnk216QQjJIX2eIIFp67Ie%2Bk0CAzZ6bRQC2w9%2ByeAuzBlxS8j0PcfkNORxeI4HU2QK9nDMYPorVlIfbQBELgwASIItJKbA%2FfzLXzv8WdHZG55M2uEbeoCKzv36%2BMqwf%2BDzMtKXz3RIOjzKAFm8FABRQSRp2vhMTlfx8qNeIjCy%2FY2EotrkevDLedmUY5U%2FR7m%2B0Ow7NODq6%2BQW4iEm0H0uGvD5NfsZ09VvsNp0hnuZ7MsKUtZNKW6E3byw2MRik6%2FQJca1zFzMzrnY%2B3EMk1VOf6ExCtyskWeq7HairdYf5IXMBvMYXtJX20aGfYQk13UdXGSGx7MLO9n84GOqUBzkhAba9PCone7%2BLkGXDpHM4hy0T5DdyBapzLuvHZP31cboe%2FsmYCHdPIhfqxKQ3wy%2FJ%2FAehGfEPTyM7rPekLU2j6ADxI4Ef4voCH2QeTiHk8WK39G68kRA6gFyQhmTM0yPapNfpWD38sFgDUSsGrC7sN5jQyzsrwGAspw8h3%2FvPotV8cWVTD42gK3stnwmdWzURv8O32QZQZL8h8QyR4QqoEKTum&X-Amz-Signature=84f9cdd4c7f3396b8360d1ab8105233025d5863362e7fa05af235445fdef9ec2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

