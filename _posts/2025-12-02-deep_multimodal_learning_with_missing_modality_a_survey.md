---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PTOGJFC%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T041922Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQDt60O4Wn28305a6GfXIIJRa5JpjUX7queIh4iFeIzfvgIgEy22tjN0OnRL2gWl%2FCIcJ7y1A3R9CZqku3kStTSUbasq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDErubZfCy0A9ExjSCSrcA8nx0K2PJX5%2Bdy31HQ9N25h%2F1sF5WCLn98dLm6vBHDNEorrDyDey7AW9wzRGuh1nosGMIc8cLNt2CQz9K1LbDT%2FR%2F7C1Q73zGVdIw6cNpOX%2BJmXiLQufZtSQQyhhD24506GV9ATfZXcLNQLNwqocuhmUmGaN0URFohOUzmJ1VYpHvAP%2BzwFYnzkEahWKvBV86xyuvfLxz3fB%2FZJ0yLJBfDpSBumpR4nE6pkR1B6HAjqL2a7PBYTDO%2F4MRpwN2wpQpOBP0n2g11R0pp4i5qV%2FVfZZQUT0pmSUPQ%2FSnjYinY3ZRA7zsI2%2FFvInOBZiaEumksUDlvsF6RNpez1OCvOTv5da8gjycik9KnAtIgu0Gn0%2B61EIvmitt6l%2BAQckjPx%2B7s4jHt3cTd1eluSSYmKiv%2BLfMEeFP1fGQrqgJgD%2BOR%2F76rXmFSFMZQvntq9%2FEQaORTpQFMjXhE0pf4H9vORGbEcsd5aOkRI7OHMXm24yGUbl2X%2BRT6d9zUf3l0EMIP6HcjSDgAveo%2BcxQmBgtJn8XOzISxU2TTx2clrCsAzkV5HF%2B120u9ONSqbBxKy%2FHFgA4p19qRoiB1rY%2BS0Zk6P90zdfqQFjcBJLq2PswUJlxPJ7GHFpPfrQMBVlZo0VMPP%2Bw8kGOqUBQMCkzpSpTGyalqexqkzaj8uTi3YFwBVC22B8btNMDPloqvsLa57q588GXHUAsVJITvaKtX0sQwxhqbTrqBthEXhzSXKb48dur0KBXPBPDbFLQcqaBHrt7R1TvmKZctdV1XKIIgdqqmrmxm9pdXliFUJGECjEu0KiDDvXabgbC9Mg3xTWSzQn4b11cFKhEOX5N%2Fk5U2YbEW5QLKRGpoMJlxWi2bB1&X-Amz-Signature=e058ea80029a562f1a0e7a1d8ea1fa12919b49ec2590f1913d89e8bf980dcec2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PTOGJFC%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T041922Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQDt60O4Wn28305a6GfXIIJRa5JpjUX7queIh4iFeIzfvgIgEy22tjN0OnRL2gWl%2FCIcJ7y1A3R9CZqku3kStTSUbasq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDErubZfCy0A9ExjSCSrcA8nx0K2PJX5%2Bdy31HQ9N25h%2F1sF5WCLn98dLm6vBHDNEorrDyDey7AW9wzRGuh1nosGMIc8cLNt2CQz9K1LbDT%2FR%2F7C1Q73zGVdIw6cNpOX%2BJmXiLQufZtSQQyhhD24506GV9ATfZXcLNQLNwqocuhmUmGaN0URFohOUzmJ1VYpHvAP%2BzwFYnzkEahWKvBV86xyuvfLxz3fB%2FZJ0yLJBfDpSBumpR4nE6pkR1B6HAjqL2a7PBYTDO%2F4MRpwN2wpQpOBP0n2g11R0pp4i5qV%2FVfZZQUT0pmSUPQ%2FSnjYinY3ZRA7zsI2%2FFvInOBZiaEumksUDlvsF6RNpez1OCvOTv5da8gjycik9KnAtIgu0Gn0%2B61EIvmitt6l%2BAQckjPx%2B7s4jHt3cTd1eluSSYmKiv%2BLfMEeFP1fGQrqgJgD%2BOR%2F76rXmFSFMZQvntq9%2FEQaORTpQFMjXhE0pf4H9vORGbEcsd5aOkRI7OHMXm24yGUbl2X%2BRT6d9zUf3l0EMIP6HcjSDgAveo%2BcxQmBgtJn8XOzISxU2TTx2clrCsAzkV5HF%2B120u9ONSqbBxKy%2FHFgA4p19qRoiB1rY%2BS0Zk6P90zdfqQFjcBJLq2PswUJlxPJ7GHFpPfrQMBVlZo0VMPP%2Bw8kGOqUBQMCkzpSpTGyalqexqkzaj8uTi3YFwBVC22B8btNMDPloqvsLa57q588GXHUAsVJITvaKtX0sQwxhqbTrqBthEXhzSXKb48dur0KBXPBPDbFLQcqaBHrt7R1TvmKZctdV1XKIIgdqqmrmxm9pdXliFUJGECjEu0KiDDvXabgbC9Mg3xTWSzQn4b11cFKhEOX5N%2Fk5U2YbEW5QLKRGpoMJlxWi2bB1&X-Amz-Signature=e058ea80029a562f1a0e7a1d8ea1fa12919b49ec2590f1913d89e8bf980dcec2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQ2SNNKU%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T041922Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQDPFv%2BfMs0hFBM1N2%2B1mWifVmSIcNHK58nQQPZvZP4X7QIgEwn%2BJ8PkXFFFJRH8J%2Fm8hjLaO6mqbsSqF2bUmHlD9TUq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDGw19GfASCyoIX5WhyrcAwK0PN%2FoHJl%2BgdwggyuFRrUZg%2BO1G1stk459Bdjl%2B398pqM0RSkgCvpB08GmkFDizAqg8R33V0NSb3Rd7Lnop6Wtn7slY9kzTF8lAtw2wpAF2ecsiNmIbyI2sMgBK8QWBGE0QbqCRrhsh2YhlfyVErG7%2BFG3UPdS57mjI%2BniZFYcsm0BtKBSLsRKQqISFTOqVWC8%2Fos1MzPcdX%2FsgWcwALo2AiXpGuMT0ZkjjrqRaV8Keue%2Bk5eVhSQRxA3IkwDXefMlCow2FZ8lQ1gMUuIn6QoVvfS5skiObgctnWYbtyawOQRE3e96P2F%2FbMQc4po18GHyLJ2B6pkGSWlBQqNCpQ7savo%2FPAQpF14R8wAULpLNuG28%2FDqJtC2bAAg5p2Uw6OsBkt7IZiNJNTLZm2vA2PfKA0Y2%2BjisD1fs3WohPxDvBQajC5Bh7UVzVbg%2FPMSfMXeI0H%2F2%2Bpgb0zCbQaRly4%2BCEAH3QIlG8HG06ZEry0gsBhzER3wby8pHTz6TI%2FmAwBopyrun8QAFs5P7YaIGAcnIUmH0yaJEh66Y5Iz4XGx98Uegvde5C3vGeCb2k8MeRKr%2BqORX7tjPMt0MdAKY4bh0FroS2YIG1iYvqoC3EYA%2FjRDalOSvCY90DBegMPX%2Bw8kGOqUBH21b3S6kuud4%2BKYSzVs%2BzZ%2FGL%2FufBWqUlWPodjZNOtPy5bQlMUpfyuwZvMDZMjZP%2BJsCWBa3gdsKSyfzDaFTo5Mbu5%2FwDt%2FV6qTo7KjBxQs4VuM8sZWnZaQrjbnZwVzGSzOsZUNiJmqdEoYFY0ULK7XsSJkZl1MPG9R9vskYqYxqvurzjW5%2BS4rfZYPX9rhzpGxkUO0nscaRvZ1dkr5cdkiCtf%2BR&X-Amz-Signature=1285db1728813ad35f647fdc47b9bc291f9f8a5e494e18b495efdd8446a472b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQ2SNNKU%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T041922Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQDPFv%2BfMs0hFBM1N2%2B1mWifVmSIcNHK58nQQPZvZP4X7QIgEwn%2BJ8PkXFFFJRH8J%2Fm8hjLaO6mqbsSqF2bUmHlD9TUq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDGw19GfASCyoIX5WhyrcAwK0PN%2FoHJl%2BgdwggyuFRrUZg%2BO1G1stk459Bdjl%2B398pqM0RSkgCvpB08GmkFDizAqg8R33V0NSb3Rd7Lnop6Wtn7slY9kzTF8lAtw2wpAF2ecsiNmIbyI2sMgBK8QWBGE0QbqCRrhsh2YhlfyVErG7%2BFG3UPdS57mjI%2BniZFYcsm0BtKBSLsRKQqISFTOqVWC8%2Fos1MzPcdX%2FsgWcwALo2AiXpGuMT0ZkjjrqRaV8Keue%2Bk5eVhSQRxA3IkwDXefMlCow2FZ8lQ1gMUuIn6QoVvfS5skiObgctnWYbtyawOQRE3e96P2F%2FbMQc4po18GHyLJ2B6pkGSWlBQqNCpQ7savo%2FPAQpF14R8wAULpLNuG28%2FDqJtC2bAAg5p2Uw6OsBkt7IZiNJNTLZm2vA2PfKA0Y2%2BjisD1fs3WohPxDvBQajC5Bh7UVzVbg%2FPMSfMXeI0H%2F2%2Bpgb0zCbQaRly4%2BCEAH3QIlG8HG06ZEry0gsBhzER3wby8pHTz6TI%2FmAwBopyrun8QAFs5P7YaIGAcnIUmH0yaJEh66Y5Iz4XGx98Uegvde5C3vGeCb2k8MeRKr%2BqORX7tjPMt0MdAKY4bh0FroS2YIG1iYvqoC3EYA%2FjRDalOSvCY90DBegMPX%2Bw8kGOqUBH21b3S6kuud4%2BKYSzVs%2BzZ%2FGL%2FufBWqUlWPodjZNOtPy5bQlMUpfyuwZvMDZMjZP%2BJsCWBa3gdsKSyfzDaFTo5Mbu5%2FwDt%2FV6qTo7KjBxQs4VuM8sZWnZaQrjbnZwVzGSzOsZUNiJmqdEoYFY0ULK7XsSJkZl1MPG9R9vskYqYxqvurzjW5%2BS4rfZYPX9rhzpGxkUO0nscaRvZ1dkr5cdkiCtf%2BR&X-Amz-Signature=1285db1728813ad35f647fdc47b9bc291f9f8a5e494e18b495efdd8446a472b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RL2ERLAK%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T041921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIDoGt2fxQW%2Fph73vsoGoDXrwiGAd9Hwos1%2BISTM9wMa%2BAiBDNeOXZyxux8onG2YKyx3LdbuDOp56alGrpkW7umIv3Cr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMZgsA7H1ZlOZMWYOsKtwDCohoxye8oPtKy6XNOtpU0R%2BAK3hjQb2WF%2B2VMFAloYZ9cMRn%2Ba2%2FtNkQ0%2Bt5R1ep%2FnuroRjL2K1TRCXitJnAKmwhAB9JIRcWhg9sl0t1K2rjPraT2TPMNlB34guE5%2FWb%2ByJXDOwGZmF1GiRGITCENcHaNnP8NNdqeFAH8LxaORwdcXymyN6AKhTu79GcyJY0x797jWsK7Nu%2FTnhk7S%2FzdMNwNqwfydX4BC5WjUbw3tCYI8PSx7Km%2FJCWJYsr8qwoEOfoF%2Bd0FqCXXxd%2FABkupqkVklLMbHJpkuOWVcDKp3XQwhyhzhAh24uET4IoHdtlhB1QT8SD0gHMgryEWX%2BB4vMQ8Qo5paZ0IfzL8c29JaF9zxDXxM1lKBc98oAeP5QmmgjY20c1Gp%2FYuuc4oBBC8%2FH4AMkv%2BxBLKqauLtpooPT9%2FeBWzzwZWYIWQ%2FwfR8pM8wAMnkILnVkh4u4aeJhtVVSND%2FBY%2BaG9Zh5HX%2BcKyjhkmtusDTr0ISwcO0LMPnSYvqJJR%2BCsF20mPt8yqL1bSB%2FZohwuIr4q4cXALH4iuZSRbaseGxCyfAdxxiq4v8OVv%2BtUeDRhVYDcAwIGLW9khb7HT3VvgYnRzmRuHLrYd6KX7aLOvRlyddRtONgw%2F%2F%2FDyQY6pgEnfN268NPInQWBv5E3iL%2FHMEqx6ZE61bF9MUpWeCoozeTE8Xb3KZIpKLo0KSNh2dnBYiSovd8RMrCqTFoLRn%2FpKwPIV3RC9RDCRouK4UE7LMpTLKYoDktpXgv6uGelEKjQKqCiOfCNcL0Lf%2FSTNj7tjjQbAHilp8yK%2BPgFWE1xwD1SvZBKM1P0Rh2lErhLVU4gWBlQsm83JPd08yaeQC4O24YIPWck&X-Amz-Signature=463365ca75f095f6162402206ba0b8f40f84579ee4fff89eea338e027c7b151e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRRBZLJS%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T041924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIHExh2CIm7imR6Hh9l1t5BvjV2nImJfYySjCcn3zl94KAiEAoFNfPT0gkQTIw8D1OPpuE8dzdg0qH4f1X8jH3nWVktoq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDGumduX%2FdGzojnNRnCrcA4eSp81mHWB5rvFGZXXN%2FNACAajukP3eJgbViT%2BbOYfHEgFGDP6skwaFZdsVpAZkEsNuwmUnBNH4jVZVgtrLXoRA8hesdEngmS8UNMGYxvwPn7Q%2FVMDY8bSpjMkjCjHZo7%2FzltZABELGLXyUiO0ba8TAT1b4AZLZva5E1t0AlNTeR%2BdZBTiv7SAx4qyEMlv3KQ558p0XlOz%2BjfSt2CeR7aXAQj90wO5iBJPrQNqqJ%2F5dUJwbRS4ToipR3ofrR%2FCm60DFVwV1BopwOBKlfC%2BwDX2S0dUwq65%2BRQOCW4lmN29fTgEtetqvqU5o7G7tCS0JxpMn25mLyZOQxgGAJgDkk9n87gp57xwZ30c3MjauRhmU6MjtCtxcgSC3CP0DxoaIOUVga%2FzAcGp7S7H5Te7ZEj1vzB1WapRU7y17P%2FScXEHgf3fVHZRMs0IOW5L8veRJ%2BUvsjYJKCN4TmPVGcxnxDfa11vUhNzcMMHdqDnQlOvvWr7AGfXF3anlG5jMEhQXbrXo6up9OP5lLwP8d5gO8maYrpCyeYFJR1ElGhdEBxpn14gSLbIFBqeslBFTtiW75nTOJc1e%2BVGtp9tbr8rdFaCDUOWXANIP%2FH%2FH%2FGSoDKEaSOrK%2BbtF0dKtOWYc3MPb%2Bw8kGOqUBWYANnzcpaIUCyrKwV25f6nxF%2BQwEQPbNg2xXgyQIgZlC9mYV3caGspSN9fmnFSgYSm7iLwn2ZKZVSG3%2BLatuQrs%2FPKS2QuaZU58Gv0lAp%2F4lpzKzaT39pw9gdPwaPcbcxkWp72ohc0m8fWlWw2A19zZgP158ZvXkh0EY1B%2BXOvpQOeWYOQOrGoU6c4A3CkvLz4%2Fdgu0rDr9vHlC1ECza1108AaFr&X-Amz-Signature=018dcc43b6d09d4175fe248de1d5b107822bda60e1a2420d4b127c5e02e70bc4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRRBZLJS%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T041924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIHExh2CIm7imR6Hh9l1t5BvjV2nImJfYySjCcn3zl94KAiEAoFNfPT0gkQTIw8D1OPpuE8dzdg0qH4f1X8jH3nWVktoq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDGumduX%2FdGzojnNRnCrcA4eSp81mHWB5rvFGZXXN%2FNACAajukP3eJgbViT%2BbOYfHEgFGDP6skwaFZdsVpAZkEsNuwmUnBNH4jVZVgtrLXoRA8hesdEngmS8UNMGYxvwPn7Q%2FVMDY8bSpjMkjCjHZo7%2FzltZABELGLXyUiO0ba8TAT1b4AZLZva5E1t0AlNTeR%2BdZBTiv7SAx4qyEMlv3KQ558p0XlOz%2BjfSt2CeR7aXAQj90wO5iBJPrQNqqJ%2F5dUJwbRS4ToipR3ofrR%2FCm60DFVwV1BopwOBKlfC%2BwDX2S0dUwq65%2BRQOCW4lmN29fTgEtetqvqU5o7G7tCS0JxpMn25mLyZOQxgGAJgDkk9n87gp57xwZ30c3MjauRhmU6MjtCtxcgSC3CP0DxoaIOUVga%2FzAcGp7S7H5Te7ZEj1vzB1WapRU7y17P%2FScXEHgf3fVHZRMs0IOW5L8veRJ%2BUvsjYJKCN4TmPVGcxnxDfa11vUhNzcMMHdqDnQlOvvWr7AGfXF3anlG5jMEhQXbrXo6up9OP5lLwP8d5gO8maYrpCyeYFJR1ElGhdEBxpn14gSLbIFBqeslBFTtiW75nTOJc1e%2BVGtp9tbr8rdFaCDUOWXANIP%2FH%2FH%2FGSoDKEaSOrK%2BbtF0dKtOWYc3MPb%2Bw8kGOqUBWYANnzcpaIUCyrKwV25f6nxF%2BQwEQPbNg2xXgyQIgZlC9mYV3caGspSN9fmnFSgYSm7iLwn2ZKZVSG3%2BLatuQrs%2FPKS2QuaZU58Gv0lAp%2F4lpzKzaT39pw9gdPwaPcbcxkWp72ohc0m8fWlWw2A19zZgP158ZvXkh0EY1B%2BXOvpQOeWYOQOrGoU6c4A3CkvLz4%2Fdgu0rDr9vHlC1ECza1108AaFr&X-Amz-Signature=018dcc43b6d09d4175fe248de1d5b107822bda60e1a2420d4b127c5e02e70bc4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

