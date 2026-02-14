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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664U7H3WQ3%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T151306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJIMEYCIQCkfo5FQ9OabZO0JiiRdGJB27EPuR4rNNbcGo5aQmxIEQIhAMeGFge3sw2T6dK%2F4%2BQK%2BmbRwoTZGsnnD%2BBMOYwQZkOWKv8DCAgQABoMNjM3NDIzMTgzODA1IgwAGypRGyVS7iJNWCgq3APheLD%2By1Z0oD5qCh47fFemdnmFvv2rr0FFJMyOMYTW%2BNg3vqIlPLQwjCQ1Z4aZahcbVM%2FjDnxw04b10C8j0v5EWRAi0M5JjMbrf2B3GD%2FoJc6rOUs5WflgoupawH23S8UrJRJngjvG3JhEI7sjlHDKLpKZ%2FQ%2F%2FlCBlxS3G7M4KpCLMBoWYTUhhF9uXUzukIZ%2Bv%2BTyCgBnLvBdde3G8lUnhH5%2FTbv%2B%2BIsakcHHMT89AByK95sII8lVeX657IJ7s0DiH%2Bp%2BDoGrAxshpmgr4TJlbbKewknKy%2B93t23LXEnAvA4v%2F%2Bov6JdbLjuv1ceBaBON2lMgY%2Bs3mfeeqPi8jgCB6%2FAy1uNTLQKn69Les1wKHKiKX8Z1q2orGWzSTT6ukg5Kg%2B%2Borylv%2FznnDBNbq8jbJX2cjuNWkdrcrgDOggNiMCRsN0m7wCHuWWhRbayu8qkxDpvrsQv4vIsGBOBbRyuQhAqEfil8TKOLSts0iql1TW74rtUuF1eulLHuDst%2FFUu7wfHYkiYwNfXWX3%2BnoUvmlJRfbDbGIs1MbxpOPj40sLcwz6jN9oxRJNZgQGBNqlUbjzN5l5a%2BX%2BiAA15kY%2F0ESlwPOTwgFBYDUwIi46MBLrHl0Pkwh2%2Bb24hCOyzD9ksLMBjqkAbP3xM3uR0Fj%2Bhqch8kUxLz9ngkedQfmcez1KJ%2BvqgDlS79f%2FeMki%2FUV8hP3rJxngIyoDHHTORrfMZ%2BCe%2FTr72sFuJgUV%2FQbjcVQbu8XVOpgmpswUuiZiBQAJOD%2BkxoXdZzT4MwmedITh9dJnSThrxgvJzw43WBr%2Fno8prrre2%2BNM7CHrE12xrb2oESPCY0MtbMQvO2LwGNJJt10LJEv8E2rfnhb&X-Amz-Signature=2e28c642e4eaea9f7f95db23b26266432316794ad8bbf5481767524c09a2ea02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664U7H3WQ3%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T151306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJIMEYCIQCkfo5FQ9OabZO0JiiRdGJB27EPuR4rNNbcGo5aQmxIEQIhAMeGFge3sw2T6dK%2F4%2BQK%2BmbRwoTZGsnnD%2BBMOYwQZkOWKv8DCAgQABoMNjM3NDIzMTgzODA1IgwAGypRGyVS7iJNWCgq3APheLD%2By1Z0oD5qCh47fFemdnmFvv2rr0FFJMyOMYTW%2BNg3vqIlPLQwjCQ1Z4aZahcbVM%2FjDnxw04b10C8j0v5EWRAi0M5JjMbrf2B3GD%2FoJc6rOUs5WflgoupawH23S8UrJRJngjvG3JhEI7sjlHDKLpKZ%2FQ%2F%2FlCBlxS3G7M4KpCLMBoWYTUhhF9uXUzukIZ%2Bv%2BTyCgBnLvBdde3G8lUnhH5%2FTbv%2B%2BIsakcHHMT89AByK95sII8lVeX657IJ7s0DiH%2Bp%2BDoGrAxshpmgr4TJlbbKewknKy%2B93t23LXEnAvA4v%2F%2Bov6JdbLjuv1ceBaBON2lMgY%2Bs3mfeeqPi8jgCB6%2FAy1uNTLQKn69Les1wKHKiKX8Z1q2orGWzSTT6ukg5Kg%2B%2Borylv%2FznnDBNbq8jbJX2cjuNWkdrcrgDOggNiMCRsN0m7wCHuWWhRbayu8qkxDpvrsQv4vIsGBOBbRyuQhAqEfil8TKOLSts0iql1TW74rtUuF1eulLHuDst%2FFUu7wfHYkiYwNfXWX3%2BnoUvmlJRfbDbGIs1MbxpOPj40sLcwz6jN9oxRJNZgQGBNqlUbjzN5l5a%2BX%2BiAA15kY%2F0ESlwPOTwgFBYDUwIi46MBLrHl0Pkwh2%2Bb24hCOyzD9ksLMBjqkAbP3xM3uR0Fj%2Bhqch8kUxLz9ngkedQfmcez1KJ%2BvqgDlS79f%2FeMki%2FUV8hP3rJxngIyoDHHTORrfMZ%2BCe%2FTr72sFuJgUV%2FQbjcVQbu8XVOpgmpswUuiZiBQAJOD%2BkxoXdZzT4MwmedITh9dJnSThrxgvJzw43WBr%2Fno8prrre2%2BNM7CHrE12xrb2oESPCY0MtbMQvO2LwGNJJt10LJEv8E2rfnhb&X-Amz-Signature=2e28c642e4eaea9f7f95db23b26266432316794ad8bbf5481767524c09a2ea02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZDZ46S7%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T151306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJGMEQCIDWFJ%2FKzJdp2PPZ1oeTnvERcP6LdhZKgk5Itkm2p5gqEAiBujmtfQjjx54oZ9o1EaKTKozMysbKiQRNwVDPF%2FeRF7ir%2FAwgIEAAaDDYzNzQyMzE4MzgwNSIMBmb%2BV2saSFLzH9mZKtwDqBmt4%2BxH7Sa%2B9IQvBDBOeesfJrRYezMZpPyEUpu%2FuYGK5PYfZXu%2F%2BBj4P%2BuMeWJg9GF4MQvttlMl0gFrTHFPLY%2BwdzJVZ%2Fe2N1Q6CWZMZ%2Ftp30Gz4FL8tJe2nMZaPzZbi7LGFd%2BJB2dJYG4Nnxs4J8B9VY42KbVicq149UBtxb3noINPjB7bxNX6acEombd7hWWxCxRMJNX6NT4YbUNuuerOuVZXk2E3YT%2BVMeK8%2FqmkTGXO98qrPsMwK%2FvC0EPZl%2BmUuHGu2R4AhSiCohIN0RfhNFsXXWcOEv%2B2NX%2FeQJsa4ChSqVKqZb4bFy2MXDSbL3qL%2FfkWS23d%2FixJ8QSBQEYtS0%2FP2ZFX1Chr1lq9kRYZfrLuyAL%2FfUDb7xs2q0984cuwsrKXIsqyRVorULwdm4BV%2BGqVWyS7exP45hJp18ZufK%2BfIFTZCAsHdJaCgNyjn2OkhlkQ1VeYOxlb3nJpyC1eLGCBeQmqtelTT6AhYrsOUGKrENgC%2BAAWVy8g5RI%2F5EKWBOPf5%2FNub9YnyRHvd7qpHeqfprZKZ5bxdnRdZfn7fBaV2yRHm7CURrciF0FYMcckSVZTyLJdB2SlE6MBU7MrkY3L52rpfPJ599alG0Zv4io7X2Wb3Yu20Uow65LCzAY6pgE25KjmJoOXjaiJLAgOByXka5k5aa3SD6jjS0ZSDJPgqcTJKbq49yyrmrTtGTlbMpazzDGCJubU%2BB2NaKO1QSp1bdOrZtUDcclcitTsP8EvRk1PDMjc3ySQE1VflVGjasx5mh2fJYBGlV4ct4lQ1x8dgynJGtnjiRNnW3ED9UlZni%2FnsRH5ZGE3sRTzm1qS19FZrSOKOPpl5J%2FbRr2cK7xO0%2B5FRbXt&X-Amz-Signature=dca712523b6a68d09c79b3aa5f5089ebe32471f13a738ce7c32046bf5f8d38cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZWZJZ3H%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T151308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIC4tVHJmTpSwRULiIE94rc79hA%2Bm30FLYA7EyCa%2BX4gwAiEArsYIzc3O3r0HNpfhNYI4LD3NImig0GRs%2FYXOiBCQMsYq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDAzR9rJ%2BTDxdYv4NxCrcAxUeordmPL4GqAet9Yy%2BLz7TaEAhv9BukxXfCUq1XiBk4TWk3VlFIHZUSRilgpLSLbkQGyrHCOnpBSR2bfkW%2FL3jvx0uhOKMjAKFLTsf%2BDUdqfQHZUlBaA3HR3wyRMmx1ATMxD6scuHBEUJGpvZ4%2FSfdbp1yMpxOOPuKUeKUlVYhbGp9Kc0VLhV880ics0mJ%2B%2F4992ITx1sZ7X4RqikdK4wzbfASGWgqmAS8X27C7oTv5laeYKZZ1I1imyrP9HsDfl719SMQMFYWN3tN17RDpQMxqk99lUYArxzgYAji4JC8z3ZXoJE0l3idEUYyajc8vUSaPqzzmfAf%2Fd2hqgNAWYII8Et195bD79Hn0vesafqCt0Ev3334S4UiGPj19qv76HetcEQ%2FlhVyGgG7LpjW1h9MpHLeHeWp92xCmRc%2BsACo45adiZSUWISokAIv7Ygin4Wh8aJcuvjxSdSs4hNZDIRIepyEbr35B8Co1lvwbwXdr0mazOu1PZoCWvlDxqF6EuxIXm195qAUKrcaEaQ266na1cDLj%2FnfzqmjI907xNl6%2BofcofsOolSYvApAsZVlxNlArX7qPNdqC4oKfpc71O5aa9%2BomRcbhqaMmDgEClb9nf0xzcvROsfyytMFMJ6SwswGOqUBElmDo2AvgoFPWHKLwTUnUpAwI6jYIgiC4itQcMPMukOSY136heZU54aTxPnmNEh511gdxpQexJWh7AVuHZKIZ6nN138uJ%2B%2FeRatPW5opAWfA%2FJL9wDhKY1A56HXQqdAoWAZEOwirD18VunNmd1AGVqyiE1FUnVCXNLan%2By%2Bzfkmw0BFedMPa2WJXaUV%2FvPHgGw7HuSIzg9WKh6S9SFZ3sILpLZlF&X-Amz-Signature=20275567281acac49a5bfbe1bd84d196869f49b0766afa74495f7e663beebdfe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZWZJZ3H%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T151308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIC4tVHJmTpSwRULiIE94rc79hA%2Bm30FLYA7EyCa%2BX4gwAiEArsYIzc3O3r0HNpfhNYI4LD3NImig0GRs%2FYXOiBCQMsYq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDAzR9rJ%2BTDxdYv4NxCrcAxUeordmPL4GqAet9Yy%2BLz7TaEAhv9BukxXfCUq1XiBk4TWk3VlFIHZUSRilgpLSLbkQGyrHCOnpBSR2bfkW%2FL3jvx0uhOKMjAKFLTsf%2BDUdqfQHZUlBaA3HR3wyRMmx1ATMxD6scuHBEUJGpvZ4%2FSfdbp1yMpxOOPuKUeKUlVYhbGp9Kc0VLhV880ics0mJ%2B%2F4992ITx1sZ7X4RqikdK4wzbfASGWgqmAS8X27C7oTv5laeYKZZ1I1imyrP9HsDfl719SMQMFYWN3tN17RDpQMxqk99lUYArxzgYAji4JC8z3ZXoJE0l3idEUYyajc8vUSaPqzzmfAf%2Fd2hqgNAWYII8Et195bD79Hn0vesafqCt0Ev3334S4UiGPj19qv76HetcEQ%2FlhVyGgG7LpjW1h9MpHLeHeWp92xCmRc%2BsACo45adiZSUWISokAIv7Ygin4Wh8aJcuvjxSdSs4hNZDIRIepyEbr35B8Co1lvwbwXdr0mazOu1PZoCWvlDxqF6EuxIXm195qAUKrcaEaQ266na1cDLj%2FnfzqmjI907xNl6%2BofcofsOolSYvApAsZVlxNlArX7qPNdqC4oKfpc71O5aa9%2BomRcbhqaMmDgEClb9nf0xzcvROsfyytMFMJ6SwswGOqUBElmDo2AvgoFPWHKLwTUnUpAwI6jYIgiC4itQcMPMukOSY136heZU54aTxPnmNEh511gdxpQexJWh7AVuHZKIZ6nN138uJ%2B%2FeRatPW5opAWfA%2FJL9wDhKY1A56HXQqdAoWAZEOwirD18VunNmd1AGVqyiE1FUnVCXNLan%2By%2Bzfkmw0BFedMPa2WJXaUV%2FvPHgGw7HuSIzg9WKh6S9SFZ3sILpLZlF&X-Amz-Signature=5aca460d27a89e8b6bec1499579c201592eb3ba11fa1474bf7f37542f6eeaa59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFOQ3YBW%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T151309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIDfXWJWIYWgJtnhPeuGmgtfiepGDxiteH%2BhhojN07PFWAiEA3nP%2B8ojrNQSEK7xF5gXpPxWkIh1jyY%2BqM8ovGY%2BCy18q%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDFJo89saphfxyGijEyrcA8EgNPEBXi%2BGm4Do6nQT0JDovi9azD7JCY0U%2B%2BmZzShDAO7qd1fN7sgrM5dxAmUIpBcftQiMFadDfBoOMs6lz3JWyqPDf49FkOEIqRmXGckeFtOW2UOprQXyBK5sOKd6oqD2gIY2qb%2Fo1ktc74iiP8BVHIQIrVW9yx4YROnMcwdy70B9PYaJBDuTp%2FHaQumai1Mr%2BbxQ%2FeRJq0rKAid2MLR1rHKG5Es16zcgW7eyJGSXbxazCc9to0IqC%2BUNi6a1ZeBxRme6X29v9xQAY0mh0Qp8Mji1dlKnILaDecjauJNPz71Z5LR%2FjdMTS5%2FkHbv74MiDKglJQAfjKeiDTW0OT55jpYxwi8fvcQoCQxugVKxTntmc3sjMgSKoZQHuciiTWIN5%2Bag2dkSCrzCjJbajSjhjkjjRzI0WdfroBAdjfu2poKcxmQZ3inhw8bgdxhuSxcUd%2FIM7FCZA2HV8VU1Y8KGS5jdRZeLxfF4U0kj0I80Vdt6Lzf43E92RejjRzJg7gNgcDtreEJUjGBxN%2Fv%2BNhmBV96nmQW51v6iSB64z4vk7u7qM3oPQN5i9N%2FjxPnDvMWzeT2SGoE59YwRjk6ybE0vnopRiOCRAlJQtL5kjO45kJLFIQhgO94oZx2QRMJWSwswGOqUBuGaKv0rL9yh73vblT2x4kJvkyclALPj%2FNMS8dQkVyGMDryoi6zp%2BBvzkI40lcXu0LfBvgJcrm4nRkT4QEPF9coeR8GZ%2FwNcW9NrcZ8cNT0LcVYREuY3gSR5LyJ7O93TmpDDmkwl5JU03QH59fPo9uyQeHwZPBxt4QpD3VEppOV1jMzfdpriTEro6VOG4oq5Jhr0tgQuHiW8FDWUM8TGQCGzqcqx4&X-Amz-Signature=6d81456f8532911a390d24365639c9ded3bd6554a9659df3e5030b077d6e4caa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VK7WZN2%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T151309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQDMKP3pJULwzwqf4pJQZnOnlnUPDHn%2FZ7qu4njlC0O6pAIgREVZ5%2Fq%2BT1yX7Y%2FMtrtdD0lIcS0AN%2FbUmofSzVtoG1oq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDHK%2FrwFP0LFaIRIi4CrcA82MtncEygV1yeA1WI8y%2BbWvcA%2FLx%2FAmN25uFPwDyw8TT6fx6KlHd1fRIAw6u8ZUMSvyqHMsa86A2MSYkY8j29MXW7f29sfSogQlHy9jou2MfdsnUeVPty2exJEye9tjgsU1i9xs8bj051ld5kEraeyn90Sh84pf8xBka0c1N9KtkFvPNoOUOqEthLKuR8O97IlSJ3hM01FDaQFEExLVyQlZ%2BqlwXGGHUL2Ib9rmJ87H1Aw2LLeIIgYqZMNbZQMasWzASllZeN%2F2QvA9tohzoRG3udFJDqSrUl3BkQJkr1VbcR3pR%2FTgnoPyT1XBeY4X9Qct7OI8YLo%2Bmg7WBY2sa1UuHQkBiePMxWytK6eln19qz9l5AGQPUM9lRYvPPVvFnGTtKON%2BVyfOh%2FdjA6rfE0TR18UesxtAx%2BykweC%2FL7UlVte2L%2B%2BFPiFJu7INas6F9djVYPjx0VaY%2B2pMK%2FsjL%2FgTv%2BNsNIlQPlpoglhFUVhbzH64KE8P1h0Nrg3vTID1XffG745c1P2s%2B4vqVoEeDSi1zC6fh8NQ4ApKIUQo%2FrWbf4hu08%2FqhYwx4diMwSKnUfVTnqIx0wtc9ft0AxkLP4cQfYa8m7Cnq6FBruOAs6iTQ%2FYcki11aSgoiLqSMPeRwswGOqUB%2By8gfBeurwZxfJM0r4060Wyp1Z6ajsWXoj%2B%2BgmLO5SdLyUTa45DHa2jgM0I6sRSrZMlp3vSckoa0XsYb2t5woFlfIRh1Rt58%2Bo1KJIGFgOsTJ8pjyYyWKjjKwjOAhhbk8eD5ea%2BQta7jePqegS9Q0vbQhcmSh6HuHqnwKvRzQpfh0aNsUgQ32BBRtOoKKD21j%2Bl%2BUAM3UowfSVwFDqxelfO%2F%2FSuN&X-Amz-Signature=c3cd9272ff419257a11c62d79ee30383aaa5b6267de0b705c79a33dd02e251f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWEGOTXD%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T151311Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQCF55jj6dKH01Lwk%2BIUYs1fPc9ZFB6%2Feu8uWrHbJXNvtQIgTIHs7i3nOTs3EfBnhuOwNW0O4TDJTsE5kdlUZ8aVRFYq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDFdP9d955qV7lnknVCrcA8N%2B%2BrhIompbp7CWUFKXbTxQxPAMgQD0g7uAKdeJhULv1pnY9NwjCzqvRITPypc4I5f%2BvQF1xsZWs93AwOsTFghF8axSdhKThbM4TYJ9SId9YcZl6dovUnD%2Ft8H7OWW8Ik2pgv5lW4pzqH3lxLm9W9pueJFWMo9V7rYdc3TXtLoduZkkfin8VoKcrEqQVXzsghFJK7lE8ITb1OxeGSoV9ZvMOWwIdbP8xfb%2FPksxDylVlw2cs8cz7Rnq6Jf%2F5FdPWpwntTJayNctFtKIos%2BDmHosAttLqrdj5xnRFRYeA4vFDI8X9VBg9CqQnJVq2jkrrB9Ku0%2FMfN7KbNTNL5YlJ1zuaiCP8yFbgo8pxSdyMC0pvSDo9ECCEwbTGaedU3YXtXsHkoLuQOMSXV6%2BtDgobuBQ%2FNVxswx8WMAmKotMy5KaGzrv3JI7dI1hG6jB3Vkbhrl9VQu3PhQz23ld0iP8xE1n9aGrVaQ4y2c4xah5IwSzh%2F%2BhrOswMdByIu7qoOoEJ5FTDdB7lXUlH9GIc%2FiM1WXO89PHkWUtcR1OxakJMrFaMA965JK5N4d1rrWIxGy1LNFWpL3hBqW0%2BcZcJJHU%2BUW63FwLhzB%2FkfXOek6IUe01uPuFqkp2K0l6fyfBMP6SwswGOqUBxc5WWddqNoFPgmOZynayyW2VfRW%2BQNczVbh9E0sp93kSC%2FeY6DxmpzsGYOXzzpG7irgJHrIBFEyZUPfdBYaVJVaBZSn%2FIrdFBRmxlJFiEvKPrVhoQOrsaZ8yCtlA3KInx6c%2FeSH4hUrU8gn08Oe3tHb5fXLDWk9WJSmMitg1g%2F11KW1otvCKjzo87DvCCsQk3amo%2BFsx4dRxjFUHzh%2FgqUHSPUqu&X-Amz-Signature=263bebd2af5ad1cf3d64944f5e42f15c629c963dabcc192886a29c1fb0736cf7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466325EQJHL%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T151313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIDIQBjDr4CAQDeu1nbYir9oYuzJxrDPLOz5iE0ise7uxAiEA2GCvInJmmjRRHMWpN6nK7t3l9lfPgtIEwnCIpF2R%2BVcq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDAt9brNzOE9KPBFFvSrcA1OJL9uO1Fv3hM2IlVL%2BrMjxNfE2v0LeF9V2CDP0LDDRKvBI960kfy9CCUHQlWeRs9oFXo45Mt6D4OO1S%2BXsoiFkpgMyQnDEhmVjjxYKXKV3Sr2CzjLdo0Ge74RwUwyfPHybIQr9GEoiGJEtYnUBO7SXr2A8SFmF81yOZcjbHoG9cO5XKqFefhwqErPhyi%2B%2FQQlHQApI65dyBLAJaomkyne3%2BJ188x%2FR%2BhJxuQSsFtkZvSvE%2Bk8c6rVNA1piJxEhoO%2B49yGAc0dAM51PZZax2THsxd0abIIV44BeazeIVyFfBn2Eug7vJidI0Lsa8T4MKww1Qu0STy%2B3EUHR4DAAFp%2FE13lgtcqIAiy99SGhZdoWLLhGf9vYECCAer1OdDnpwLuq%2FS%2B0MTY01ofkJGjtlgVZ%2BaEhOCgn80rfAB2FI70xy4UQChMtOVvKdNeQuYOz5wmsdCORwe3dcUkLS1Pntsx8NLMsgEwVeVjcj1Ykk0VlYbnlP2vlSHfaIg5aM7z0HWvVGfkf9OPEcYvLDbN%2F02ryzhX8lEOHSKX%2FsfDcXfpZM6HFYUsP3dCm45F5EUYF%2FD5arVPicYHaitHlCxUAPaOfYXMleqhoGiorl%2FIH%2F%2BKK176%2B8l4bQ9yiCgV6MPmRwswGOqUBbMjgs3E166o0zRyiJrsFGpyteWH%2BH0Gke4cxxKGU4WtWE5swEO7308hrm4qHebD%2BR5%2BSiemrAsD8vqosf%2BTs2dbfXOwZqn47smgTzs9ia1LvT%2FQZ0N23vUC2TcEz9njBSM2kKQeedg7LnduIq%2Fq2AJ%2FQykOb%2BOgPMv7jIX5AlMVhXDBoYaalaZJkcc7Cy593ee8ZqVK9m9fUjeh3jLM0%2F9gOYs9k&X-Amz-Signature=ce698de161a378392b6da7ac25c64fa6a42d1ff9bd924d4c683b58c5844e4ef0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466325EQJHL%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T151313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIDIQBjDr4CAQDeu1nbYir9oYuzJxrDPLOz5iE0ise7uxAiEA2GCvInJmmjRRHMWpN6nK7t3l9lfPgtIEwnCIpF2R%2BVcq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDAt9brNzOE9KPBFFvSrcA1OJL9uO1Fv3hM2IlVL%2BrMjxNfE2v0LeF9V2CDP0LDDRKvBI960kfy9CCUHQlWeRs9oFXo45Mt6D4OO1S%2BXsoiFkpgMyQnDEhmVjjxYKXKV3Sr2CzjLdo0Ge74RwUwyfPHybIQr9GEoiGJEtYnUBO7SXr2A8SFmF81yOZcjbHoG9cO5XKqFefhwqErPhyi%2B%2FQQlHQApI65dyBLAJaomkyne3%2BJ188x%2FR%2BhJxuQSsFtkZvSvE%2Bk8c6rVNA1piJxEhoO%2B49yGAc0dAM51PZZax2THsxd0abIIV44BeazeIVyFfBn2Eug7vJidI0Lsa8T4MKww1Qu0STy%2B3EUHR4DAAFp%2FE13lgtcqIAiy99SGhZdoWLLhGf9vYECCAer1OdDnpwLuq%2FS%2B0MTY01ofkJGjtlgVZ%2BaEhOCgn80rfAB2FI70xy4UQChMtOVvKdNeQuYOz5wmsdCORwe3dcUkLS1Pntsx8NLMsgEwVeVjcj1Ykk0VlYbnlP2vlSHfaIg5aM7z0HWvVGfkf9OPEcYvLDbN%2F02ryzhX8lEOHSKX%2FsfDcXfpZM6HFYUsP3dCm45F5EUYF%2FD5arVPicYHaitHlCxUAPaOfYXMleqhoGiorl%2FIH%2F%2BKK176%2B8l4bQ9yiCgV6MPmRwswGOqUBbMjgs3E166o0zRyiJrsFGpyteWH%2BH0Gke4cxxKGU4WtWE5swEO7308hrm4qHebD%2BR5%2BSiemrAsD8vqosf%2BTs2dbfXOwZqn47smgTzs9ia1LvT%2FQZ0N23vUC2TcEz9njBSM2kKQeedg7LnduIq%2Fq2AJ%2FQykOb%2BOgPMv7jIX5AlMVhXDBoYaalaZJkcc7Cy593ee8ZqVK9m9fUjeh3jLM0%2F9gOYs9k&X-Amz-Signature=68ec3ef6d735e44bba83abac69d24d9e950032651f5cef24158c762aeb11e3d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQ64EXWJ%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T151302Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQChF2L1FQ4fo0%2Balsqx0DyRgz63h7olwehlNBPuvwGBNgIgRx2MIytkrXq4oNqhWVUBnxRfjVWVmtl6PC5Or%2F8mKPMq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDBFqN70zNMHZPQ8rRCrcA28VqGDPEe4CNaabSf%2Bjw%2Fnlohxp0Zx3ick9YEdTSekx%2FzQ%2BulKo8Vqo9EAXedoD2Ejpp0JuQ4%2FyYTpJpLEVfCJ5mnbqxLGgh6nd84y%2FOh7ga1AuvpXnoq4oMzMBqreOnv5zvEVX6jH3vpxBdlPvWze8Ex1HilYz%2BTyjbLZ%2F9t527HB19fCzhEzArHGYRzKEwgHy57w0HPZC%2FXxpYZVnZCYu9pWhKIM7N38wBN7hjk5d5U4mmqo7iOPzX9L%2BYhGC%2BpsrVkYbzjZnL4XsGtctl4Z4e3Kd8K4QXsoBCVZVA2luFQjbmLFxYz%2BeHpX7wdiU1GNYsXGIAdz%2BM8Ne85%2FFolGIrH6kTWr4S86BpL5HFJpetrRErynJ4Q7N3ORz2PTGCgeIH84qrq8zJIFLfiwqQHVqyYehNKxJ9%2BDnDj6o08CN22TV4ZJBzlpioK8yAc79e62AMNa6Ll4%2FRcHPrY91txYGYy5v3aC2m3Hs57hE%2F4HkuphOPS5GOiEmrPzHOun3QTPDurv6a%2FMW1I%2BNQSEd4Dj6fCb4Gllz%2BYOTR2zNt1L0HHjO%2BpQniIai46QRrr4bo3IXdoYI7oODNDI5C0TIAkTWvQrExSQmkX%2BhvnsS4IZHIZwYUBOlF7rdwgutMOKRwswGOqUB8QaRfFneNWgIwJpYC%2F%2FEg6FnUYF7TrE5QcxJc0AJAe2iggeuS287kUGiovy7RnwaGAlF2ADE4xMGW53HIwowAJPfvJqI47o5D5HzzYG70FHfWHow%2B9kPItZpOvzuh%2Fgow%2FgiAyB18kkOiQ8z2CA1rgcvCLQxaeN2C%2F4xG4UjMMbQvGNOwPqAfi0A%2FhjcPHQJBeOPoE%2F5gjkcX9VXC9Aq6%2BHW95pg&X-Amz-Signature=f8e4910bcd6e4aa0f7bb367e8828bf776a5bd6c84304762d1bd6ecf367d5b7fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZKPVQRX%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T151315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIDEOrpHrb0pm9F3OzUkwBJjbcMuFDIfGERV3v%2Bip0hl2AiEA6Lq6GXbnm7wVs%2BED3llmBDobi0u%2Femz%2BevUB0nblut4q%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDI1%2BC178UbHLzDW4RCrcA3tlYU4bqN2mARpZCta0LMW%2Bd5j9IfkrRKLBArb18hTX2diCn%2BChtTAJm53XW7KsHi%2FKW%2BsyQ675ySdT6Wom6IEEmzlN41Zxt%2BDT8YsORmcQkxs8djaKVKhqJcaPt2Y8wQtigAjdRu%2FSy19VWs%2FJIMgn%2B%2FTUxgUnB7Tpnt7J7ANcXlwMxLtT%2FHDJidaYgQtsczIehc5v6ruTsNO8L1Iv0warHSDojZUGVbzCJVDV2JE1t2FegEuhkGXbnA7lscyw3a0BE73wOizpRnPh98FpduhbLujd2yw2Qf1rrJEl%2Fi8b5A4nfGe4CqpXRpIFYtiYdbY31hrLE1YeTf%2BceO26UX3tYFbCCU%2B34uCN5Ovnm6WG3jfnsx2LnJHr%2Fpjq4bgyzvho97OWFlo0MxGx%2FmP9baZJwaPr4XvubXyNi8UpozBOPPzzwD7MNDVoHswXgfKC%2B6YHxYYGdjeG9VUSesQTyDA27DjOAeK9%2B7GOGHaZlXYca%2Brkv3dj9BS7TXrg%2F2%2Bf45hcEBTV7sU3HFsbA76HnGSF%2FSEcYSPLiaASIJz5oaX3xyRhaFCITXbHmmXOzBBYv6c1PBQPzf1eKPnAGSiTaiNdRv5%2F86Ebxy82gLSVVbR680B3DZ3wee6R6sPwMPOSwswGOqUB5HGzJ0Mm5rLPV8myIjb3zbQ47djm8SRoH%2FKfsWcGcz6y%2F4uu4SQsbbocBXa8zGui%2Bs5yXBOt2vAN0X8SWLM2iKkhW6%2FOGL5HnWchrUgb1P9MR7GzAB8MmW6rbtqrvV%2BAywerI6gF0g9vwg6t986v5FMuEL4MqVCK0L8LKfP%2BwxkTldrkZMaB4cglILPwKWdz1GiWRZat4K7Pwb27MmXYANSZNW6N&X-Amz-Signature=5fcf153d058fba559b53355ab62448e57e340aa5308cdbd164a83ebaf4735b24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZKPVQRX%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T151315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIDEOrpHrb0pm9F3OzUkwBJjbcMuFDIfGERV3v%2Bip0hl2AiEA6Lq6GXbnm7wVs%2BED3llmBDobi0u%2Femz%2BevUB0nblut4q%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDI1%2BC178UbHLzDW4RCrcA3tlYU4bqN2mARpZCta0LMW%2Bd5j9IfkrRKLBArb18hTX2diCn%2BChtTAJm53XW7KsHi%2FKW%2BsyQ675ySdT6Wom6IEEmzlN41Zxt%2BDT8YsORmcQkxs8djaKVKhqJcaPt2Y8wQtigAjdRu%2FSy19VWs%2FJIMgn%2B%2FTUxgUnB7Tpnt7J7ANcXlwMxLtT%2FHDJidaYgQtsczIehc5v6ruTsNO8L1Iv0warHSDojZUGVbzCJVDV2JE1t2FegEuhkGXbnA7lscyw3a0BE73wOizpRnPh98FpduhbLujd2yw2Qf1rrJEl%2Fi8b5A4nfGe4CqpXRpIFYtiYdbY31hrLE1YeTf%2BceO26UX3tYFbCCU%2B34uCN5Ovnm6WG3jfnsx2LnJHr%2Fpjq4bgyzvho97OWFlo0MxGx%2FmP9baZJwaPr4XvubXyNi8UpozBOPPzzwD7MNDVoHswXgfKC%2B6YHxYYGdjeG9VUSesQTyDA27DjOAeK9%2B7GOGHaZlXYca%2Brkv3dj9BS7TXrg%2F2%2Bf45hcEBTV7sU3HFsbA76HnGSF%2FSEcYSPLiaASIJz5oaX3xyRhaFCITXbHmmXOzBBYv6c1PBQPzf1eKPnAGSiTaiNdRv5%2F86Ebxy82gLSVVbR680B3DZ3wee6R6sPwMPOSwswGOqUB5HGzJ0Mm5rLPV8myIjb3zbQ47djm8SRoH%2FKfsWcGcz6y%2F4uu4SQsbbocBXa8zGui%2Bs5yXBOt2vAN0X8SWLM2iKkhW6%2FOGL5HnWchrUgb1P9MR7GzAB8MmW6rbtqrvV%2BAywerI6gF0g9vwg6t986v5FMuEL4MqVCK0L8LKfP%2BwxkTldrkZMaB4cglILPwKWdz1GiWRZat4K7Pwb27MmXYANSZNW6N&X-Amz-Signature=5fcf153d058fba559b53355ab62448e57e340aa5308cdbd164a83ebaf4735b24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3JVYWZS%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T151315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJIMEYCIQDXUgRZ7zmriufVhl3JfRFyhYsQFLeODR854LazBphb6AIhAOl6UH7NA6T7IEF6asMKi%2FsumtJg10uZOnm5F6vGvMtDKv8DCAgQABoMNjM3NDIzMTgzODA1IgzfIkigY%2B8ICaAxIyAq3AN9DhErPa9tSbRAm3HEQQMAF8KDkRLD1oJXyWgiwxuFVreV5AqVbpJ9dezMP5JcTkfMermdgnoemN7x%2BaNCKB5mS2%2FRiG4MsBmLzKLTWxSVQUCWPLuH%2FNyAOYn0J8VRJGqCs0Kvfsm51GGCP7HyFfmEOrwXgJWABFlthynQb%2BxB%2BiKyQ0KPZvPoOQmhBOMgLrz9KTOTjijS3bJdykyu20QA5nAvUvLDbro9veDxFPtjBkjzUWLurLjI5NW1bC6GdVGCIkJttGWdqP3KeHOQAxIrNs%2Fgqd%2BxpKVMQtMGO32xu%2BVHJQEdaTYgnqtTPHMOV3jlcW4xt4GpkjpFB9D9Hm7PGSg6AHZ88Gp%2FmP0LHXUEZzchNfStNezPiD7c3XO2T8Umu1lRCqNhUcLFyXbn4qqF%2ByC6iQC9qbFotcl79G8CcFt8ECSCbqi0%2FyrluZC0MxdaIczqrSscbciV7k2LEu%2BBKM2ADtyKqVAZO1YItlO%2Frx4mJdJ%2FcZXZsbw3FQ4LuxYqZ9ZdastS%2FUz%2F64WjvXKvObf2E6li%2BopRwnXKhm4ysczdkcFe6pZV0%2Bh0MaWYKucQQNj0cWFr4DAVGbcR%2Bb632rZmPHi57PqdEy4vxFhVE%2F%2F8qpJatnji9zFoxzD%2BkcLMBjqkAUpQJKwpJ367FiPPahJtuSH5lCM6MRLSoCluN2QcwwA34tAG4uIEV9ehC95hiRp1yLPBkT5MnzFlAaPyapPrYVm%2BiuUsl8wKBXucUfD1A2CFy9iMCVEFQfToE62AD5QuGcUfCmORjUgB0lx4TGf%2FxOXh74q%2FAEtY%2FswvTrtYL9i0Hp9EPZUK8iaQvWgBJX6L8kNQGuTwugE7wZF%2BA52oo8jGjSzQ&X-Amz-Signature=8d7d80d056263b27541f6633e18fa673dcd976f5b75ddf86136c31968c103aa5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

